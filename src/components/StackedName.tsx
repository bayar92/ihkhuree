function splitNameParts(name: string): string[] {
  if (name.includes('・')) {
    return name.split('・').map((part) => part.trim()).filter(Boolean);
  }
  return name.split(/\s+/).filter(Boolean);
}

export function StackedName({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const parts = splitNameParts(name);

  if (parts.length <= 1) {
    return <span className={className}>{name}</span>;
  }

  return (
    <>
      <span className={`${className ?? ''} md:hidden`.trim()}>
        {parts.map((part, i) => (
          <span key={i} className="block">
            {part}
          </span>
        ))}
      </span>
      <span className={`${className ?? ''} hidden md:inline`.trim()}>{name}</span>
    </>
  );
}
