import styles from "./ActionButton.module.scss";

interface ActionButtonProps {
  type?: "button" | "submit";
  onClick?: () => void;
  label?: string;
}

export default function ActionButton({
  type = "button",
  onClick,
  label,
}: ActionButtonProps) {
  return (
    <div className={styles.button__wrapper}>
      <button
        type={type}
        onClick={onClick}
        className={`${styles.button__control} ${styles.button__control_search}`}
      >
        {label}
      </button>
    </div>
  );
}
