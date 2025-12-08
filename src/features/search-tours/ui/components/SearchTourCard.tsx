import type { UITour } from "../types/search.ui.types";
import styles from "./SearchTourCard.module.scss";
import { formatCurrency } from "../../utils/currency";
import { formatTourDate } from "../../utils/formatDate";

interface SearchTourCardProps {
  tour: UITour;
}

export const SearchTourCard: React.FC<SearchTourCardProps> = ({ tour }) => {
  const hotel = tour.hotel;
  const priceFormatted = formatCurrency(tour.amount, tour.currency);

  if (!hotel) {
    return (
      <div className={styles.card}>
        <div className={styles.card__body}>
          <h3 className={styles.card__title}>Готель не знайдено</h3>

          <div className={styles.card__label}>Старт туру</div>
          <div className={styles.card__date}>
            {formatTourDate(tour.startDate)}
          </div>

          <div className={styles.card__price}>{priceFormatted}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.card__image_wrapper}>
        <img
          className={styles.card__image}
          src={hotel.img}
          alt={hotel.name}
          loading="lazy"
        />
      </div>

      <div className={styles.card__body}>
        <h3 className={styles.card__title}>{hotel.name}</h3>

        <div className={styles.card__location}>
          <img
            className={styles.card__flag}
            src={tour.flag ?? ""}
            alt={hotel.countryName}
          />
          <span className={styles.card__locationText}>
            {hotel.countryName}, {hotel.cityName}
          </span>
        </div>

        <div className={styles.card__label}>Старт туру</div>
        <div className={styles.card__date}>
          {formatTourDate(tour.startDate)}
        </div>

        <div className={styles.card__price}>{priceFormatted}</div>

        <button className={styles.card__link}>Відкрити ціну</button>
      </div>
    </div>
  );
};
