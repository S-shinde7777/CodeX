function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="codexGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#2dd4bf" />
        </linearGradient>
      </defs>
      {/* Speech bubble shape */}
      <path
        d="M6 10C6 7.79086 7.79086 6 10 6H38C40.2091 6 42 7.79086 42 10V28C42 30.2091 40.2091 32 38 32H20L12 40V32H10C7.79086 32 6 30.2091 6 28V10Z"
        fill="url(#codexGradient)"
        opacity="0.15"
      />
      <path
        d="M6 10C6 7.79086 7.79086 6 10 6H38C40.2091 6 42 7.79086 42 10V28C42 30.2091 40.2091 32 38 32H20L12 40V32H10C7.79086 32 6 30.2091 6 28V10Z"
        stroke="url(#codexGradient)"
        strokeWidth="2"
      />
      {/* </> symbol */}
      <path
        d="M17 14L12 19L17 24"
        stroke="url(#codexGradient)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31 14L36 19L31 24"
        stroke="url(#codexGradient)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 12L22 26"
        stroke="url(#codexGradient)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Logo;