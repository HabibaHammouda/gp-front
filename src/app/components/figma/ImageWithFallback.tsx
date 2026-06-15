import React, { useState } from 'react';

// Customized base64 SVG asset featuring your exact brand navy tone (#0B1B3D) at a soft opacity
const BRAND_ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMEIxQjNEIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMzUiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMy43Ij48cmVjdCB4PSIxNiIgeT0iMTYiIHdpZHRoPSI1NiIgaGVpZ2h0PSI1NiIgcng9IjEyIi8+PHBhdGggZD0ibTE2IDU4IDE2LTE4IDMyIDMyIi8+PGNpcmNsZSBjeD0iNTMiIGN5PSIzNSIgcj0iNyIvPjwvc3ZnPg==';

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  const { src, alt, style, className, ...rest } = props;

  return didError ? (
    <div
      className={`inline-block bg-[#FAFAFA] border border-slate-200/60 text-center align-middle rounded-xl transition-all ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full p-2 opacity-80 group-hover:opacity-100 transition-opacity">
        <img 
          src={BRAND_ERROR_IMG_SRC} 
          alt="Error loading profile view" 
          {...rest} 
          className="max-w-[70%] max-h-[70%] object-contain"
          data-original-url={src} 
        />
      </div>
    </div>
  ) : (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      style={style} 
      {...rest} 
      onError={handleError} 
    />
  );
}