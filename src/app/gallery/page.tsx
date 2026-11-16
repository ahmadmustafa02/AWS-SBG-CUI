import type { Metadata } from "next";
import { CameraBackdrop } from "@/components/CameraBackdrop";
import { GalleryView } from "@/components/GalleryView";
import { GALLERY } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from previous years of AWS Student Builder Group CUI.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="band band--brand pixel-grid page-head">
        <CameraBackdrop />
        <div className="wrap">
          <span className="eyebrow">Gallery</span>
          <h1>Previously on: things we built together.</h1>
          <p className="lede">Sessions, build days and the moments in between, from every year of the group.</p>
        </div>
      </section>

      <section className="band band--tight">
        <CameraBackdrop dense />
        <div className="wrap">
          <GalleryView seed={GALLERY} />
        </div>
      </section>
    </>
  );
}
