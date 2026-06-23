const SLIDE_SECONDS = 4;

export function NewsCardImageSlider({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  if (images.length === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-500 to-brand-700" />
    );
  }

  const cycleSeconds = images.length * SLIDE_SECONDS;
  const multi = images.length > 1;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          aria-hidden={multi && i !== 0}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            multi ? "news-card-image-slide" : "opacity-100"
          }`}
          style={
            multi
              ? {
                  animationDuration: `${cycleSeconds}s`,
                  animationDelay: `${i * SLIDE_SECONDS}s`,
                }
              : undefined
          }
        />
      ))}
      {multi && (
        <div
          className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5"
          aria-hidden
        >
          {images.map((_, i) => (
            <span
              key={i}
              className="news-card-image-dot h-1.5 w-1.5 rounded-full bg-white/50"
              style={{
                animationDuration: `${cycleSeconds}s`,
                animationDelay: `${i * SLIDE_SECONDS}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
