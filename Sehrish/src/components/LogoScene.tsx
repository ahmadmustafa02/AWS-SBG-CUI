"use client";

import { useEffect, useRef } from "react";
import { LOGO_CELLS } from "./LogoMark";

type Props = {
  /** Fired once, when every block has locked into place. */
  onAssembled: () => void;
  /** Fired if WebGL can't start, so the parent can show the static logo. */
  onFail: () => void;
};

/** Seconds from first frame until the last block lands. */
const ASSEMBLE_SECONDS = 2.1;
const BLOCK_TRAVEL = 1.45;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/**
 * The hero's WebGL scene. The club mark is 40 blocks; they start scattered in
 * space, fly in and join at the centre, then the finished logo floats and
 * leans toward the pointer.
 *
 * three.js is imported inside the effect, so it is downloaded after first
 * paint and never blocks the page. Rendering pauses when the hero is off
 * screen or the tab is hidden.
 */
export default function LogoScene({ onAssembled, onFail }: Props) {
  const mount = useRef<HTMLDivElement>(null);
  const callbacks = useRef({ onAssembled, onFail });
  callbacks.current = { onAssembled, onFail };

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const el = mount.current;
      if (disposed || !el) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        callbacks.current.onFail();
        return;
      }

      // Colours come from the design tokens, so the scene follows the palette.
      const css = getComputedStyle(document.documentElement);
      const token = (name: string) => new THREE.Color(css.getPropertyValue(name).trim());

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 200);
      camera.position.set(0, 0, 27);

      scene.add(new THREE.AmbientLight(0xffffff, 1.1));
      const key = new THREE.DirectionalLight(0xffffff, 2.4);
      key.position.set(6, 9, 12);
      scene.add(key);
      const rim = new THREE.PointLight(token("--color-cyan"), 260, 80);
      rim.position.set(-11, -5, 7);
      scene.add(rim);
      const warm = new THREE.PointLight(token("--color-orange"), 90, 60);
      warm.position.set(10, -8, 5);
      scene.add(warm);

      // ----- The logo: one instanced block per cell of the 9×9 mark -----
      const count = LOGO_CELLS.length;
      const geometry = new THREE.BoxGeometry(0.94, 0.94, 1.5);
      const material = new THREE.MeshStandardMaterial({
        color: token("--color-logo"),
        emissive: token("--color-brand-700"),
        emissiveIntensity: 0.25,
        roughness: 0.38,
        metalness: 0.12,
      });
      const blocks = new THREE.InstancedMesh(geometry, material, count);
      const logo = new THREE.Group();
      logo.add(blocks);
      scene.add(logo);

      const targets: import("three").Vector3[] = [];
      const starts: import("three").Vector3[] = [];
      const startQuats: import("three").Quaternion[] = [];
      const delays: number[] = [];
      const identity = new THREE.Quaternion();

      LOGO_CELLS.forEach(([x, y]) => {
        targets.push(new THREE.Vector3(x - 4, 4 - y, 0));
        const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.2).normalize();
        starts.push(dir.multiplyScalar(13 + Math.random() * 11));
        startQuats.push(
          new THREE.Quaternion().setFromEuler(
            new THREE.Euler(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2),
          ),
        );
        delays.push(Math.random() * (ASSEMBLE_SECONDS - BLOCK_TRAVEL));
      });

      // ----- Drifting points: a quiet "network" behind the logo -----
      const pointCount = 160;
      const positions = new Float32Array(pointCount * 3);
      for (let i = 0; i < pointCount; i++) {
        const r = 9 + Math.random() * 13;
        const a = Math.random() * Math.PI * 2;
        const b = (Math.random() - 0.5) * Math.PI;
        positions[i * 3] = Math.cos(a) * Math.cos(b) * r * 1.5;
        positions[i * 3 + 1] = Math.sin(b) * r * 0.8;
        positions[i * 3 + 2] = Math.sin(a) * Math.cos(b) * r - 6;
      }
      const pointsGeometry = new THREE.BufferGeometry();
      pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const pointsMaterial = new THREE.PointsMaterial({
        color: token("--color-cyan"),
        size: 0.13,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      });
      const points = new THREE.Points(pointsGeometry, pointsMaterial);
      scene.add(points);

      // ----- Sizing -----
      const resize = () => {
        const { clientWidth: w, clientHeight: h } = el;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // Pull the camera back on narrow canvases so the logo always fits.
        camera.position.z = camera.aspect < 1.1 ? 25 / camera.aspect : 22;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(el);
      resize();

      // ----- Pointer lean -----
      const pointer = { x: 0, y: 0 };
      const lean = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      // ----- Loop -----
      const dummy = new THREE.Object3D();
      const clock = new THREE.Clock();
      let elapsed = 0;
      let assembled = false;
      let visible = true;
      let frame = 0;

      const tick = () => {
        frame = requestAnimationFrame(tick);
        // Cap only long stalls (tab switched away). A low cap would make the
        // assembly run in slow motion on devices with a low frame rate.
        const dt = Math.min(clock.getDelta(), 0.4);
        if (!visible || document.hidden) return;
        elapsed += dt;

        for (let i = 0; i < count; i++) {
          const p = easeOutCubic(clamp01((elapsed - delays[i]) / BLOCK_TRAVEL));
          dummy.position.lerpVectors(starts[i], targets[i], p);
          dummy.quaternion.slerpQuaternions(startQuats[i], identity, p);
          dummy.scale.setScalar(0.35 + 0.65 * p);
          dummy.updateMatrix();
          blocks.setMatrixAt(i, dummy.matrix);
        }
        blocks.instanceMatrix.needsUpdate = true;

        const whole = easeOutCubic(clamp01(elapsed / ASSEMBLE_SECONDS));
        if (!assembled && elapsed >= ASSEMBLE_SECONDS) {
          assembled = true;
          callbacks.current.onAssembled();
        }

        // A flash as the blocks lock, settling to a soft glow.
        const sinceJoin = elapsed - ASSEMBLE_SECONDS;
        material.emissiveIntensity = sinceJoin > 0 ? 0.25 + 0.9 * Math.exp(-sinceJoin * 3) : 0.25;

        lean.x += (pointer.x - lean.x) * 0.05;
        lean.y += (pointer.y - lean.y) * 0.05;
        const idle = Math.max(0, sinceJoin);
        logo.rotation.y = (1 - whole) * -1.6 + Math.sin(idle * 0.55) * 0.3 + lean.x * 0.4;
        logo.rotation.x = (1 - whole) * 0.5 + Math.sin(idle * 0.4) * 0.07 + lean.y * 0.22;
        logo.position.y = Math.sin(idle * 0.9) * 0.25;

        points.rotation.y += dt * 0.03;
        points.rotation.x = lean.y * 0.05;

        renderer.render(scene, camera);
      };
      tick();

      const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
      io.observe(el);

      cleanup = () => {
        cancelAnimationFrame(frame);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onPointer);
        geometry.dispose();
        material.dispose();
        pointsGeometry.dispose();
        pointsMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })().catch(() => callbacks.current.onFail());

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={mount} style={{ position: "absolute", inset: 0 }} aria-hidden="true" />;
}
