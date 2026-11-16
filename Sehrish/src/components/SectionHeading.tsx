type Props = {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  as?: "h1" | "h2";
  id?: string;
};

export function SectionHeading({ eyebrow, title, children, as: Tag = "h2", id }: Props) {
  return (
    <div className="section-heading">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag id={id}>{title}</Tag>
      {children && <p>{children}</p>}
    </div>
  );
}
