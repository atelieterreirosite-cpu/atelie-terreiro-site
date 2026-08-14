interface PageEnterProps {
  children: React.ReactNode;
  className?: string;
}

export function PageEnter({ children, className = "" }: PageEnterProps) {
  return <div className={`page-enter ${className}`.trim()}>{children}</div>;
}
