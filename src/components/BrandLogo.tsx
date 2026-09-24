import type { SVGProps } from 'react';

type BrandLogoProps = SVGProps<SVGSVGElement> & {
  title?: string;
  inverted?: boolean;
};

/**
 * Spanish Conveyancing wordmark.
 *
 * The tagline stays aligned with the wordmark while the building mark's
 * bottom edge aligns with the tagline.
 */
export default function BrandLogo({
  title = 'Spanish Conveyancing — Bespoke Property Lawyers',
  inverted = false,
  ...props
}: BrandLogoProps) {
  const primaryText = inverted ? '#fffaf2' : '#292a2d';
  const secondaryText = inverted ? '#d3cbc5' : '#5e5a58';
  const taglineText = inverted ? '#fffaf2' : '#746964';

  return (
    <svg
      viewBox="0 0 590 111"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{title}</title>

      <g transform="translate(0 10)">
        <g
          fill="none"
          stroke="#ad8b6c"
          strokeWidth="2.6"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <path d="M22 56V5h99v27" />
          <path d="M1.5 56h67v40h-67z" />
          <path d="M68.5 31.5h94v64.5h-94z" />
        </g>
        <path fill="#ad8b6c" d="M87 56h21v40H87z" />
      </g>

      <g>
        <text
          x="191"
          y="44"
          fill={primaryText}
          fontSize="42"
          fontWeight="400"
          letterSpacing="7.5"
          textLength="377"
          lengthAdjust="spacing"
        >
          SPANISH
        </text>
        <text
          x="191"
          y="78"
          fill={secondaryText}
          fontSize="27"
          fontWeight="400"
          letterSpacing="4.3"
          textLength="377"
          lengthAdjust="spacing"
        >
          CONVEYANCING
        </text>
      </g>

      <text
        x="191"
        y="106"
        fill={taglineText}
        fontSize="17.5"
        fontWeight="500"
        letterSpacing="1.25"
        textLength="377"
        lengthAdjust="spacing"
      >
        BESPOKE PROPERTY LAWYERS
      </text>
    </svg>
  );
}
