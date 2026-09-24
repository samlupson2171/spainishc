import Link from "next/link";
import BrandLogo from "./BrandLogo";

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
  return (
    <Link
      href="/"
      className={`brand-lockup ${compact ? "brand-lockup--compact" : ""} ${className}`}
      aria-label="Spanish Conveyancing home"
    >
      <BrandLogo
        inverted={inverted}
        className="brand-lockup__logo"
        aria-hidden="true"
      />
    </Link>
  );
}
