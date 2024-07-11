import { add, format } from 'date-fns';

import styles from './ticket.module.scss';

const Ticket = ({ ticket }) => {
  const there = ticket.segments[0];
  const back = ticket.segments[1];

  const addMinutes = (date, duration) => {
    const transformedDate = add(date, { minutes: duration });
    const departure = format(new Date(date), 'HH:mm');
    const arrival = format(new Date(transformedDate), 'HH:mm');
    return `${departure} - ${arrival}`;
  };

  const convertMinutesToHoursMinutes = (time) => {
    const hours = String(Math.floor(time / 60)).padStart(2, '0');
    const minutes = String(Math.floor(time % 60)).padStart(2, '0');
    return `${hours}ч ${minutes}м`;
  };
  const stops = (arr) => {
    const stopLenght = arr.length;
    return stopLenght >= 2 ? `${stopLenght} пересадки` : stopLenght === 1 ? '1 пересадка' : 'Прямой рейс';
  };

  return (
    <div className={`${styles.tickets__item} ${styles.ticket}`}>
      <div className={styles.ticket__header}>
        <div className={styles.ticket__price}>{new Intl.NumberFormat('ru-RU').format(ticket.price)} Р</div>
        <div></div>
        <div className={styles.ticket__logo}>
          <img src={`https://pics.avs.io/99/36/${ticket.carrier}.png`} alt="airlogo" />
        </div>
      </div>
      <div className={styles.ticket__info}>
        <div className={styles.row}>
          <div className={styles.ticket__trips}>
            <div className={styles.title}>
              {there.origin} - {there.destination}
            </div>
            <div className={styles.time}>{addMinutes(there.date, there.duration)}</div>
          </div>
          <div className={styles.ticket__trips_last}>
            <div className={styles.title}>В ПУТИ</div>
            <div className={styles.lasts}>{convertMinutesToHoursMinutes(there.duration)}</div>
          </div>
          <div className={styles.ticket__trips_transfer}>
            <div className={styles.title}>{stops(there.stops)}</div>
            <div className={styles.stops}>{there.stops.join(', ')}</div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.ticket__trips}>
            <div className={styles.title}>
              {back.origin} - {back.destination}
            </div>
            <div className={styles.time}>{addMinutes(back.date, back.duration)}</div>
          </div>
          <div className={styles.ticket__trips_last}>
            <div className={styles.title}>В ПУТИ</div>
            <div className={styles.lasts}>{convertMinutesToHoursMinutes(back.duration)}</div>
          </div>
          <div className={styles.ticket__trips_transfer}>
            <div className={styles.title}>{stops(back.stops)}</div>
            <div className={styles.stops}>{back.stops.join(', ')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
