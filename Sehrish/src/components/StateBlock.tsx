type Props = {
  kind: "empty" | "loading" | "error" | "coming-soon";
  title: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
};

const KICKER: Record<Props["kind"], string> = {
  empty: "Nothing here yet",
  loading: "Loading",
  error: "Something broke",
  "coming-soon": "Coming soon",
};

/** Shared empty / loading / error / coming-soon block. */
export function StateBlock({ kind, title, children, action }: Props) {
  return (
    <div className="state" role={kind === "error" ? "alert" : undefined} aria-busy={kind === "loading" || undefined}>
      <span className="state__kicker">{KICKER[kind]}</span>
      {kind === "loading" && (
        <span className="state__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      )}
      <h3>{title}</h3>
      {children && <p>{children}</p>}
      {action}
    </div>
  );
}
