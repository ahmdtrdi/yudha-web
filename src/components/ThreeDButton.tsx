type ThreeDButtonProps = {
  href: string;
  id?: string;
  topLabel: string;
  frontLabel: string;
};

export function ThreeDButton({
  href,
  id,
  topLabel,
  frontLabel,
}: ThreeDButtonProps) {
  return (
    <a
      className="mega-button"
      id={id}
      href={href}
      aria-label={`${topLabel} ${frontLabel}`}
    >
      <svg viewBox="0 0 620 270" role="img" aria-hidden="true">
        <g className="mega-button__released">
          <polygon
            points="570,57 612,117 507,255 489,158"
            fill="#050505"
            stroke="#050505"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <polygon
            points="48,122 489,158 507,255 27,216"
            fill="#cbd41f"
            stroke="#050505"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <text
            className="mega-button__front-label"
            x="270"
            y="205"
          >
            {frontLabel}
          </text>
          <polygon
            points="145,27 570,57 489,158 48,122"
            fill="#e3ec35"
            stroke="#050505"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <text
            className="mega-button__top-label"
            x="307"
            y="105"
          >
            {topLabel}
          </text>
        </g>

        <g className="mega-button__pressed">
          <polygon
            points="570,122 600,155 498,254 489,223"
            fill="#050505"
            stroke="#050505"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <polygon
            points="48,187 489,223 498,254 40,218"
            fill="#b9c216"
            stroke="#050505"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <polygon
            points="145,92 570,122 489,223 48,187"
            fill="#e3ec35"
            stroke="#050505"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <text
            className="mega-button__top-label"
            x="307"
            y="170"
          >
            {topLabel}
          </text>
        </g>
      </svg>
    </a>
  );
}
