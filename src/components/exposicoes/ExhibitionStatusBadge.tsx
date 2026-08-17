interface ExhibitionStatusBadgeProps {
  onDisplay: boolean;
}

/** Badge só quando `em_cartaz` é true — visual alinhado a EventStatusBadge “em andamento”. */
export function ExhibitionStatusBadge({ onDisplay }: ExhibitionStatusBadgeProps) {
  if (!onDisplay) return null;

  return (
    <span className="inline-block bg-accent/10 px-2.5 py-1 text-[0.65rem] tracking-[0.14em] text-accent uppercase">
      Em cartaz
    </span>
  );
}
