import SearchInputClearButton from "./components/SearchInputClearButton";
import styles from "./SearchInput.module.scss";

interface SearchInputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onClear?: () => void;
  onClick?: () => void;
}

export default function SearchInput({
  value,
  placeholder = "Куди хочете поїхати?",
  onChange,
  onFocus,
  onClear,
  onClick,
}: SearchInputProps) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const showClear = value.length > 0 && onClear;

  return (
    <div className={styles.input}>
      <input
        className={styles.input__field}
        value={value}
        placeholder={placeholder}
        onChange={handleInput}
        onFocus={onFocus}
        onClick={onClick}
      />

      {showClear && (
        <SearchInputClearButton
          onClick={onClear}
          className={styles.input__clear}
        />
      )}
    </div>
  );
}
