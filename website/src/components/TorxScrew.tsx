import React from 'react';

interface TorxScrewProps {
  className?: string;
  rotation?: number;
}

export default function TorxScrew({ className, rotation }: TorxScrewProps): React.JSX.Element {
  const finalRotation = rotation !== undefined ? rotation : 45;

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `rotate(${finalRotation}deg)`,
        display: 'block',
      }}
    >
      <circle cx="50" cy="50" r="48" fill="rgba(0, 0, 0, 0.08)" />
      <circle
        cx="50"
        cy="50"
        r="44"
        fill="url(#torxScrewMetalGradient)"
        stroke="var(--screw-stroke, rgba(0, 0, 0, 0.15))"
        strokeWidth="2"
      />
      <circle
        cx="50"
        cy="50"
        r="41"
        stroke="var(--screw-rim-highlight, rgba(255, 255, 255, 0.45))"
        strokeWidth="1.5"
      />
      <path
        d="M 50 24
           L 56.5 38.7
           L 72.5 37
           L 63.5 50
           L 72.5 63
           L 56.5 61.3
           L 50 76
           L 43.5 61.3
           L 27.5 63
           L 36.5 50
           L 27.5 37
           L 43.5 38.7
           Z"
        fill="url(#torxScrewRecessGradient)"
        stroke="var(--screw-recess-stroke, rgba(0, 0, 0, 0.4))"
        strokeWidth="1"
      />
      <path
        d="M 50 24 L 56.5 38.7 L 72.5 37"
        stroke="var(--screw-recess-highlight, rgba(255, 255, 255, 0.15))"
        strokeWidth="1"
      />
      <line
        x1="50"
        y1="34"
        x2="50"
        y2="66"
        stroke="var(--screw-slot-color, rgba(0, 0, 0, 0.25))"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <defs>
        <radialGradient id="torxScrewMetalGradient" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="var(--screw-metal-light, #fbfbfb)" />
          <stop offset="50%" stopColor="var(--screw-metal-mid, #d6d6d2)" />
          <stop offset="100%" stopColor="var(--screw-metal-dark, #a3a39e)" />
        </radialGradient>
        <radialGradient id="torxScrewRecessGradient" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="var(--screw-recess-light, #1b1b1a)" />
          <stop offset="100%" stopColor="var(--screw-recess-dark, #333331)" />
        </radialGradient>
      </defs>
    </svg>
  );
}
