import styles from "./SearchToursError.module.scss";

interface Props {
  message: string;
}

const SearchToursError = ({ message }: Props) => {
  return <div className={styles.error}>{message}</div>;
};

export default SearchToursError;
