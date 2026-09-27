import React from 'react';

interface DcmLogoProps {
  className?: string;
  variant?: 'full' | 'mark-only' | 'text-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  inverted?: boolean;
}

export const DcmLogo: React.FC<DcmLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  inverted = false,
}) => {
  // Height presets for different sizes
  const heightClass = {
    sm: 'h-8 md:h-9',
    md: 'h-10 md:h-12',
    lg: 'h-14 md:h-16',
    xl: 'h-20 md:h-24',
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 740 220"
        className={`${heightClass} w-auto`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="DCM Packers & Movers — Safe Move, Happy You"
      >
        <defs>
          {/* Blue 3D Gradients */}
          <linearGradient id="dcmBlueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2E6FE8" />
            <stop offset="25%" stopColor="#0E48B3" />
            <stop offset="70%" stopColor="#093582" />
            <stop offset="100%" stopColor="#041E4F" />
          </linearGradient>

          <linearGradient id="dcmBlueBevel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#68A5FF" />
            <stop offset="40%" stopColor="#1E65E2" />
            <stop offset="100%" stopColor="#072A6C" />
          </linearGradient>

          {/* Orange 3D Gradients */}
          <linearGradient id="dcmOrangeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFA149" />
            <stop offset="25%" stopColor="#FF6600" />
            <stop offset="75%" stopColor="#E64900" />
            <stop offset="100%" stopColor="#A82F00" />
          </linearGradient>

          <linearGradient id="dcmOrangeHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFC875" />
            <stop offset="50%" stopColor="#FF7A1A" />
            <stop offset="100%" stopColor="#D93D00" />
          </linearGradient>

          {/* Drop Shadows & Filters */}
          <filter id="dcm3dDepth" x="-10%" y="-10%" width="125%" height="130%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="3" dy="4" stdDeviation="2.5" floodColor="#001438" floodOpacity="0.5" />
          </filter>

          <filter id="dcmOrangeGlow" x="-10%" y="-10%" width="125%" height="130%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#852200" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* LEFT BRAND BLOCK: DCM 3D LETTERS + TEXT */}
        {variant !== 'mark-only' && (
          <g transform="translate(10, 10)">
            {/* --- Letter 'D' --- */}
            <g filter="url(#dcm3dDepth)">
              {/* Back depth */}
              <path
                d="M 28 30 L 72 30 C 104 30 120 48 120 78 C 120 108 104 126 72 126 L 28 126 Z"
                fill="#051C47"
              />
              {/* Main Face */}
              <path
                d="M 24 24 L 70 24 C 100 24 116 42 116 74 C 116 104 100 122 70 122 L 24 122 Z"
                fill="url(#dcmBlueGrad)"
                stroke="url(#dcmBlueBevel)"
                strokeWidth="2.5"
              />
              {/* Inner cutout */}
              <path
                d="M 52 48 L 68 48 C 82 48 90 58 90 73 C 90 88 82 98 68 98 L 52 98 Z"
                fill={inverted ? '#07162C' : '#FFFFFF'}
              />
              {/* Top bevel highlight */}
              <path
                d="M 24 24 L 70 24 C 92 24 108 36 113 56 C 108 42 94 32 72 32 L 32 32 L 32 118 L 24 122 Z"
                fill="white"
                opacity="0.25"
              />
              {/* Orange speed sliver on D bottom-left */}
              <path
                d="M 12 114 L 38 78 L 34 88 L 16 114 Z"
                fill="url(#dcmOrangeGrad)"
              />
            </g>

            {/* --- Letter 'C' --- */}
            <g filter="url(#dcmOrangeGlow)">
              {/* Back depth */}
              <path
                d="M 230 46 C 218 32 198 28 174 28 C 136 28 116 54 116 78 C 116 102 136 128 174 128 C 198 128 218 122 230 110 L 230 92 C 218 102 202 108 176 108 C 150 108 138 92 138 78 C 138 64 150 48 176 48 C 202 48 218 54 230 64 Z"
                fill="#8A2600"
              />
              {/* Main Face */}
              <path
                d="M 226 42 C 214 28 194 24 170 24 C 132 24 112 50 112 74 C 112 98 132 124 170 124 C 194 124 214 118 226 106 L 226 88 C 214 98 198 104 172 104 C 146 104 134 88 134 74 C 134 60 146 44 172 44 C 198 44 214 50 226 60 Z"
                fill="url(#dcmOrangeGrad)"
                stroke="url(#dcmOrangeHighlight)"
                strokeWidth="2.5"
              />
              {/* Top bevel highlight */}
              <path
                d="M 170 24 C 194 24 214 28 226 42 L 222 48 C 210 36 192 32 170 32 C 142 32 126 46 120 62 C 122 46 138 24 170 24 Z"
                fill="#FFF4D1"
                opacity="0.45"
              />
            </g>

            {/* --- Letter 'M' --- */}
            <g filter="url(#dcm3dDepth)">
              {/* Back depth */}
              <path
                d="M 242 126 L 242 30 L 272 30 L 302 82 L 332 30 L 362 30 L 362 126 L 338 126 L 338 68 L 312 110 L 292 110 L 266 68 L 266 126 Z"
                fill="#051C47"
              />
              {/* Main Face */}
              <path
                d="M 238 122 L 238 24 L 268 24 L 298 76 L 328 24 L 358 24 L 358 122 L 334 122 L 334 62 L 308 104 L 288 104 L 262 62 L 262 122 Z"
                fill="url(#dcmBlueGrad)"
                stroke="url(#dcmBlueBevel)"
                strokeWidth="2.5"
              />
              {/* Bevel highlights */}
              <path
                d="M 238 24 L 268 24 L 298 76 L 292 78 L 266 32 L 244 32 L 244 122 L 238 122 Z"
                fill="white"
                opacity="0.25"
              />
            </g>

            {/* --- PACKERS & MOVERS TEXT --- */}
            <text
              x="195"
              y="162"
              textAnchor="middle"
              fill={inverted ? '#FFFFFF' : '#0B3B8A'}
              fontSize="31"
              fontWeight="900"
              fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif"
              letterSpacing="2.5"
            >
              PACKERS &amp; MOVERS
            </text>

            {/* --- SAFE MOVE • HAPPY YOU --- */}
            <g transform="translate(195, 186)">
              {/* Left orange bar */}
              <rect x="-182" y="-12" width="40" height="9" rx="4.5" fill="#FF5E00" />
              
              {/* SAFE MOVE text */}
              <text
                x="-132"
                y="-3"
                textAnchor="start"
                fill="#FF5E00"
                fontSize="17.5"
                fontWeight="800"
                fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
                letterSpacing="1"
              >
                SAFE MOVE
              </text>

              {/* Blue separator dot */}
              <circle cx="-6" cy="-8" r="5" fill="#0B3B8A" />

              {/* HAPPY YOU text */}
              <text
                x="14"
                y="-3"
                textAnchor="start"
                fill="#FF5E00"
                fontSize="17.5"
                fontWeight="800"
                fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
                letterSpacing="1"
              >
                HAPPY YOU
              </text>

              {/* Right orange bar */}
              <rect x="142" y="-12" width="40" height="9" rx="4.5" fill="#FF5E00" />
            </g>
          </g>
        )}

        {/* RIGHT BRAND ICON: ROOF + WINDOW + MOVING TRUCK + SWOOSHES */}
        {variant !== 'text-only' && (
          <g transform={`translate(${variant === 'mark-only' ? 120 : 415}, 6)`}>
            {/* Gabled Roof Structure with 3D finish */}
            <g filter="url(#dcm3dDepth)">
              {/* Roof Chimney */}
              <path d="M 215 32 L 232 32 L 232 62 L 215 50 Z" fill="#0B3B8A" stroke="#2563EB" strokeWidth="2" />

              {/* Roof Triangle Main Outer */}
              <path
                d="M 160 8 L 285 106 L 265 106 L 160 26 L 55 106 L 35 106 Z"
                fill="url(#dcmBlueGrad)"
                stroke="#4C8DFF"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              {/* 4-pane Orange Window under gable */}
              <g transform="translate(142, 44)">
                <rect x="0" y="0" width="16" height="16" rx="2" fill="#FF771C" stroke="#FFA352" strokeWidth="1.5" />
                <rect x="20" y="0" width="16" height="16" rx="2" fill="#FF771C" stroke="#FFA352" strokeWidth="1.5" />
                <rect x="0" y="20" width="16" height="16" rx="2" fill="#FF771C" stroke="#FFA352" strokeWidth="1.5" />
                <rect x="20" y="20" width="16" height="16" rx="2" fill="#FF771C" stroke="#FFA352" strokeWidth="1.5" />
              </g>
            </g>

            {/* Aerodynamic Speed Swooshes (Orange & Blue) */}
            {/* Orange dynamic wing wrapping around */}
            <path
              d="M -30 115 C -2 88 50 82 95 90 C 40 96 0 118 -20 146 C -35 168 -15 178 30 186 C 90 196 180 188 240 162 C 170 178 70 176 10 164 C -22 158 -38 135 -30 115 Z"
              fill="url(#dcmOrangeGrad)"
            />
            {/* Speed trail bars behind truck */}
            <g transform="translate(18, 92)">
              <rect x="0" y="0" width="60" height="9" rx="4.5" fill="#FF6600" />
              <rect x="15" y="16" width="55" height="9" rx="4.5" fill="#FF6600" />
              <rect x="24" y="32" width="46" height="9" rx="4.5" fill="#FF6600" />
            </g>

            {/* Blue base cradle arc */}
            <path
              d="M -12 152 C 55 186 160 198 275 168 C 210 192 100 196 15 174 C -2 170 -16 162 -12 152 Z"
              fill="url(#dcmBlueGrad)"
            />

            {/* MOVING TRUCK CONTAINER & CABIN */}
            <g transform="translate(68, 64)" filter="url(#dcm3dDepth)">
              {/* Truck Cargo Box Container */}
              <rect
                x="0"
                y="16"
                width="135"
                height="86"
                rx="6"
                fill="url(#dcmBlueGrad)"
                stroke="#4C8DFF"
                strokeWidth="2.5"
              />

              {/* White Package Box Emblem on Truck Body */}
              <g transform="translate(42, 32)">
                {/* 3D isometric cardboard box */}
                {/* Top face */}
                <path d="M 26 6 L 46 16 L 26 26 L 6 16 Z" fill="#FFFFFF" />
                {/* Left face */}
                <path d="M 6 16 L 26 26 L 26 50 L 6 40 Z" fill="#E2E8F0" />
                {/* Right face */}
                <path d="M 26 26 L 46 16 L 46 40 L 26 50 Z" fill="#CBD5E1" />
                {/* Box tape strip */}
                <path d="M 22 8 L 30 12 L 30 48 L 22 44 Z" fill="#0B3B8A" opacity="0.85" />
              </g>

              {/* Truck Driver Cabin */}
              <path
                d="M 134 36 L 165 36 C 172 36 178 40 182 46 L 196 68 C 199 72 200 78 200 84 L 200 102 L 134 102 Z"
                fill="url(#dcmBlueGrad)"
                stroke="#4C8DFF"
                strokeWidth="2.5"
              />

              {/* Windshield & Side Window Glass */}
              <path
                d="M 144 44 L 162 44 C 166 44 170 47 172 52 L 178 66 L 144 66 Z"
                fill="#D4E4FC"
                stroke="#093582"
                strokeWidth="1.5"
              />
              <path
                d="M 180 54 L 190 68 L 182 68 Z"
                fill="#D4E4FC"
              />

              {/* Front Chrome Grille & Headlight */}
              <rect x="188" y="78" width="10" height="18" rx="2" fill="#FFFFFF" stroke="#0B3B8A" strokeWidth="1" />
              <line x1="190" y1="83" x2="196" y2="83" stroke="#0B3B8A" strokeWidth="1.5" />
              <line x1="190" y1="88" x2="196" y2="88" stroke="#0B3B8A" strokeWidth="1.5" />
              <circle cx="184" cy="94" r="3.5" fill="#FFE066" stroke="#FFA300" strokeWidth="1" />

              {/* Truck Undercarriage & Wheels */}
              {/* Back Wheel */}
              <g transform="translate(24, 102)">
                <circle cx="0" cy="0" r="15" fill="#05193A" stroke="#3B82F6" strokeWidth="3" />
                <circle cx="0" cy="0" r="7" fill="#FFFFFF" />
                <circle cx="0" cy="0" r="3.5" fill="#05193A" />
              </g>

              {/* Front Wheel */}
              <g transform="translate(162, 102)">
                <circle cx="0" cy="0" r="15" fill="#05193A" stroke="#3B82F6" strokeWidth="3" />
                <circle cx="0" cy="0" r="7" fill="#FFFFFF" />
                <circle cx="0" cy="0" r="3.5" fill="#05193A" />
              </g>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
