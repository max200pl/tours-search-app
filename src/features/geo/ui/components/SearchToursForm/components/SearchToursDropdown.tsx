import styles from "./SearchToursDropdown.module.scss";
import type { GeoUIEntity } from "../../../types/geo.ui.types";

interface SearchToursDropdownProps {
  items: GeoUIEntity[];
  isOpen: boolean;
  isLoading?: boolean;
  selectedId: string | number | null;
  onSelect: (entity: GeoUIEntity) => void;
}

export default function SearchToursDropdown({
  items,
  isOpen,
  isLoading = false,
  selectedId,
  onSelect,
}: SearchToursDropdownProps) {
  if (!isOpen) return null;

  const renderLoader = () => (
    <div className={styles.dropdown__loading}>
      <span className={styles.dropdown__spinner} />
      Завантаження…
    </div>
  );

  const renderEmpty = () => (
    <div className={styles.dropdown__empty}>Нічого не знайдено…</div>
  );

  const renderList = () => (
    <ul className={styles.dropdown__list}>
      {items.map((item) => {
        const isSelected = selectedId === item.id;

        return (
          <li
            key={item.id}
            className={
              isSelected
                ? `${styles.dropdown__item} ${styles["dropdown__item--selected"]}`
                : styles.dropdown__item
            }
            onClick={() => onSelect(item)}
          >
            <span className={styles.dropdown__icon}>
              {item.type === "country" ? (
                <img
                  src={item.flag}
                  alt={item.name}
                  className={styles.dropdown__flag}
                />
              ) : (
                item.icon
              )}
            </span>

            <span className={styles.dropdown__title}>{item.name}</span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className={styles.dropdown}>
      {isLoading && renderLoader()}
      {!isLoading && items.length === 0 && renderEmpty()}
      {!isLoading && items.length > 0 && renderList()}
    </div>
  );
}
