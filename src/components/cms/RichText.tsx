interface EditorialTextProps {
  text: string | null | undefined;
}

export function EditorialText({ text }: EditorialTextProps) {
  if (!text) return null;

  return <p className="whitespace-pre-line">{text}</p>;
}
