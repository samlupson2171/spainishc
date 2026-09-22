import Link from "next/link";

type BrandLockupProps = {
  inverted?: boolean;
  compact?: boolean;
  className?: string;
};

export default function BrandLockup({
  inverted = false,
  compact = false,
  className = "",
}: BrandLockupProps) {
  const ink = inverted ? "#fffaf2" : "#19272d";
  const bronze = "#b48655";

  return (
    <Link
      href="/"
      className={`brand-lockup ${compact ? "brand-lockup--compact" : ""} ${className}`}
      aria-label="Spanish Conveyancing home"
    >
      <svg
        className="brand-lockup__mark"
        viewBox="0 0 116 72"
        role="img"
        aria-hidden="true"
      >
        <path d="M3 39h42v29H3zM26 17h42v51H26zM56 29h56v39H56z" fill="none" stroke={bronze} strokeWidth="3" />
        <path d="M70 47h16v21H70z" fill={bronze} />
      </svg>
      <span className="brand-lockup__copy">
        <span className="brand-lockup__name" style={{ color: ink }}>SPANISH</span>
        <span className="brand-lockup__name brand-lockup__name--second" style={{ color: inverted ? bronze : "#675f5a" }}>
          CONVEYANCING
        </span>
        {!compact && (
          <span className="brand-lockup__tagline" style={{ color: ink }}>
            BESPOKE PROPERTY LAWYERS
          </span>
        )}
      </span>
    </Link>
  );
}
