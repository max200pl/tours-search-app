import styles from "./SearchToursLoader.module.scss";

const SearchToursLoader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__spinner}></div>
      <span>Завантаження турів...</span>
    </div>
  );
};

export default SearchToursLoader;
