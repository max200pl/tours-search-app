import type { UITour } from "../types/search.ui.types";
import { SearchTourCard } from "./SearchTourCard";
import styles from "./SearchToursGrid.module.scss";

interface SearchToursGridProps {
  tours: UITour[];
}

export default function SearchToursGrid({ tours }: SearchToursGridProps) {
  return (
    <div className={styles.grid}>
      {tours.map((tour) => (
        <SearchTourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}
