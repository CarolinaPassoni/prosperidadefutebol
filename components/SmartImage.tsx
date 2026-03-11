import React, { useMemo, useState } from 'react';

interface SmartImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  basePath: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  basePath,
  alt,
  className,
  ...props
}) => {
  const candidates = useMemo(
    () => [
      `${basePath}.jpeg`,
      `${basePath}.jpg`,
      `${basePath}.png`,
      `${basePath}.webp`,
    ],
    [basePath]
  );

  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center text-center text-sm text-gray-400 bg-gray-50 ${className || ''}`}
      >
        Imagem não encontrada
      </div>
    );
  }

  return (
    <img
      {...props}
      src={candidates[index]}
      alt={alt}
      className={className}
      onError={() => {
        if (index < candidates.length - 1) {
          setIndex((prev) => prev + 1);
        } else {
          setFailed(true);
        }
      }}
    />
  );
};