import Image from 'next/image';
import ImagePlaceholder from './ImagePlaceholder';

interface GalleryImage {
  src?: string;
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}

export default function Gallery({ images, columns = 3 }: GalleryProps) {
  const gridClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns];

  return (
    <div className={`grid ${gridClass} gap-4`}>
      {images.map((image, i) =>
        image.src ? (
          <div key={i} className="relative aspect-video rounded-xl overflow-hidden">
            <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
        ) : (
          <ImagePlaceholder key={i} alt={image.alt} />
        )
      )}
    </div>
  );
}
