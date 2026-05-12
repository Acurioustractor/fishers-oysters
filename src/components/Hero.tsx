interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  video?: {
    desktop: string;
    mobile: string;
    poster: string;
  };
  cta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  variant?: 'home' | 'page';
}

export default function Hero({
  title,
  subtitle,
  description,
  backgroundImage,
  video,
  cta,
  secondaryCta,
  variant = 'page',
}: HeroProps) {
  const isHome = variant === 'home';

  return (
    <section
      className={`relative flex w-full max-w-full items-center overflow-hidden ${isHome ? 'min-h-[calc(100svh-5.75rem)] md:min-h-[760px]' : 'min-h-[40vh]'}`}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {/* Video background */}
      {video && (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={video.poster}
            className="absolute inset-0 w-full h-full object-cover hidden md:block"
          >
            <source src={video.desktop} type="video/mp4" />
          </video>
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={video.poster}
            className="absolute inset-0 w-full h-full object-cover md:hidden"
          >
            <source src={video.mobile} type="video/mp4" />
          </video>
        </>
      )}

      {/* Overlay */}
      <div
        className={`absolute inset-0 ${
          video
            ? 'bg-foreground/60'
            : backgroundImage
              ? isHome
                ? 'bg-gradient-to-br from-black/60 via-[#5A432C]/35 to-black/50'
                : 'bg-gradient-to-r from-black/65 via-[#5A432C]/45 to-black/55'
              : 'bg-gradient-to-br from-primary to-secondary'
        }`}
      />

      {/* Content */}
      <div className="container relative z-10">
        <div className={`${isHome ? 'max-w-5xl mx-auto text-center' : 'max-w-3xl'} text-white`}>
          {subtitle && (
            <p className={`opacity-80 mb-3 ${isHome ? 'text-xl md:text-2xl' : 'text-lg'}`}>
              {subtitle}
            </p>
          )}
          <h1 className={`font-display font-bold leading-[1.05] mb-6 ${isHome ? 'text-[clamp(2.4rem,6vw,5.25rem)] text-balance' : 'text-4xl md:text-5xl'}`}>
            {title}
          </h1>
          {description && (
            <p className={`opacity-90 leading-relaxed ${isHome ? 'text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto' : 'text-xl mb-8'}`}>
              {description}
            </p>
          )}
          {(cta || secondaryCta) && (
            <div className={`flex flex-col sm:flex-row gap-3 ${isHome ? 'justify-center' : ''}`}>
              {cta && (
                <a
                  href={cta.href}
                  className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
                >
                  {cta.label}
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="btn border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background via-background/70 to-transparent" />
    </section>
  );
}
