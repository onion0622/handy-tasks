import React, { useId } from 'react';
import '../App.css';




export function LavaAnimation(){
const id = useId();
  const filterId = `goo-${id}`;

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Contenedor con el filtro goo (usa el id único) */}
      <div
        className="absolute inset-0 flex items-center justify-center"  hola
        style={{ filter: `url(#${filterId})` }}
      >
        <div className="blob purple" />
        <div className="blob pink" />
        <div className="blob blue" />
      </div>

      {/* Definición del filtro SVG — width/height 0 para que no ocupe espacio */} 
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 20 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}