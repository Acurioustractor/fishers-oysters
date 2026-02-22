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
  variant?: 'home' | 'page';
}

export default function Hero({
  title,
  subtitle,
  description,
  backgroundImage,
  video,
  cta,
  variant = 'page',
}: HeroProps) {
  const isHome = variant === 'home';

  return (
    <section
      className={`relative flex items-center overflow-hidden ${isHome ? 'min-h-[80vh]' : 'min-h-[40vh]'}`}
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
              ? 'bg-gradient-to-r from-primary/90 to-primary/70'
              : 'bg-gradient-to-br from-primary to-secondary'
        }`}
      />

      {/* Content */}
      <div className="container relative z-10">
        <div className={`${isHome ? 'max-w-4xl mx-auto text-center' : 'max-w-3xl'} text-white`}>
          {subtitle && (
            <p className={`opacity-80 mb-3 ${isHome ? 'text-xl md:text-2xl' : 'text-lg'}`}>
              {subtitle}
            </p>
          )}
          <h1 className={`font-display font-bold mb-6 ${isHome ? 'text-4xl md:text-5xl lg:text-6xl text-balance' : 'text-4xl md:text-5xl'}`}>
            {title}
          </h1>
          {description && (
            <p className={`opacity-90 leading-relaxed ${isHome ? 'text-xl md:text-2xl mb-10 max-w-2xl mx-auto' : 'text-xl mb-8'}`}>
              {description}
            </p>
          )}
          {cta && (
            <a
              href={cta.href}
              className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
            >
              {cta.label}
            </a>
          )}
        </div>
      </div>

      {/* Wave decoration for home variant */}
      {isHome ? (
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path
              d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
              fill="#F5F3EF"
            />
          </svg>
        </div>
      ) : (
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      )}
    </section>
  );
}
