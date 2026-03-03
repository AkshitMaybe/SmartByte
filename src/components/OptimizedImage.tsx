import type { ImgHTMLAttributes } from 'react';

export interface OptimizedImageSource {
  src: string;
  alt?: string;
  avifSrc?: string;
  webpSrc?: string;
}

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  photo: OptimizedImageSource;
  alt?: string;
}

export const OptimizedImage = ({ photo, alt, ...imageProps }: OptimizedImageProps) => {
  return (
    <picture>
      {photo.avifSrc && <source srcSet={photo.avifSrc} type="image/avif" />}
      {photo.webpSrc && <source srcSet={photo.webpSrc} type="image/webp" />}
      <img src={photo.src} alt={alt ?? photo.alt} {...imageProps} />
    </picture>
  );
};
