interface MediaPlaceholderProps {
  label?: string;
  className?: string;
}

export function MediaPlaceholder({
  label = "Mídia não disponível",
  className = "",
}: MediaPlaceholderProps) {
  return (
    <div
      className={`flex aspect-[16/10] items-center justify-center bg-accent/5 text-xs tracking-[0.12em] text-muted-light uppercase ${className}`}
      role="img"
      aria-label={label}
    >
      {label}
    </div>
  );
}
