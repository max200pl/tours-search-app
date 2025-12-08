import styles from "./SearchInputClearButton.module.scss";

interface SearchInputClearButtonProps {
  onClick: () => void;
  className?: string;
}

export default function SearchInputClearButton({
  onClick,
  className,
}: SearchInputClearButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.clear} ${className ?? ""}`}
      onClick={onClick}
      aria-label="Clear input"
    >
      <svg
        className={styles.clear__icon}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
}
