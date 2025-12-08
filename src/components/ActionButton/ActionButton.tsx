import styles from "./ActionButton.module.scss";

interface ActionButtonProps {
  type?: "button" | "submit";
  onClick?: () => void;
  label?: string;
  disabled?: boolean;
}

export default function ActionButton({
  type = "button",
  onClick,
  label,
  disabled,
}: ActionButtonProps) {
  return (
    <div className={styles.button__wrapper}>
      <button
        type={type}
        onClick={onClick}
        className={`${styles.button__control} ${styles.button__control_search}`}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
}
