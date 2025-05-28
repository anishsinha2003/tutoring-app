"use client";

export default function BackgroundWaveEffect() {

  return (
    <div>
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <defs>
          <filter
            id="dropShadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="-4"
              stdDeviation="8"
              floodColor="rgba(0, 0, 0, 0.09)"
            />
          </filter>
        </defs>

        <path
          fill="#D9D9D9"
          d="M0,200 C480,40 960,280 1440,200 L1440,420 L0,390 Z"
          filter="url(#dropShadow)"
        />
      </svg>
    </div>

  );
}
