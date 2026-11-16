import { Icon } from "./Icon";

type Base = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
};

type Props =
  | (Base & { as?: "input" } & React.InputHTMLAttributes<HTMLInputElement>)
  | (Base & { as: "textarea" } & React.TextareaHTMLAttributes<HTMLTextAreaElement>)
  | (Base & { as: "select"; options: string[]; placeholder?: string } & React.SelectHTMLAttributes<HTMLSelectElement>);

/**
 * Labelled form control with hint and error wiring (aria-describedby,
 * aria-invalid). Errors carry an icon and text, not just a colour.
 */
export function Field(props: Props) {
  const { id, label, hint, error, optional, ...rest } = props;
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  const common = {
    id,
    name: id,
    "aria-describedby": describedBy,
    "aria-invalid": error ? true : undefined,
    "aria-required": optional ? undefined : true,
  } as const;

  let control: React.ReactNode;
  if (rest.as === "textarea") {
    const { as: _as, ...attrs } = rest;
    control = <textarea {...attrs} {...common} />;
  } else if (rest.as === "select") {
    const { as: _as, options, placeholder, ...attrs } = rest;
    control = (
      <select {...attrs} {...common}>
        <option value="">{placeholder ?? "Choose one"}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  } else {
    const { as: _as, ...attrs } = rest;
    control = <input {...attrs} {...common} />;
  }

  return (
    <div className="field">
      <label htmlFor={id}>
        {label} {optional && <span className="optional">(optional)</span>}
      </label>
      {control}
      {hint && (
        <span id={`${id}-hint`} className="hint">
          {hint}
        </span>
      )}
      {error && (
        <span id={`${id}-error`} className="error">
          <Icon name="alert" size={16} />
          {error}
        </span>
      )}
    </div>
  );
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export function isHttpUrl(v: string): boolean {
  try {
    const u = new URL(v.trim());
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

/** Focus the first invalid control after a failed submit. */
export function focusFirstError(form: HTMLFormElement | null, errors: Record<string, string | undefined>) {
  const first = Object.keys(errors).find((k) => errors[k]);
  if (first) form?.querySelector<HTMLElement>(`#${CSS.escape(first)}`)?.focus();
}
