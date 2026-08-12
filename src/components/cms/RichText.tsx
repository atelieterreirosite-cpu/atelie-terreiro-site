interface RichTextProps {
  html: string | null;
}

export function RichText({ html }: RichTextProps) {
  if (!html) return null;

  // O HTML vem do WYSIWYG de um WordPress administrado por usuários confiáveis.
  return <div className="rich-text" dangerouslySetInnerHTML={{ __html: html }} />;
}
