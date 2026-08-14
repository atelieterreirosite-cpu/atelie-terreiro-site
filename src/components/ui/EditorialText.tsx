interface EditorialTextProps {
  text: string | null | undefined;
  className?: string;
  as?: "p" | "div";
}

export function EditorialText({
  text,
  className = "",
  as: Tag = "p",
}: EditorialTextProps) {
  if (!text) return null;

  return (
    <Tag className={`whitespace-pre-line ${className}`.trim()}>
      {text}
    </Tag>
  );
}
