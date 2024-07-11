import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchTickets, getLoadingStatus, getTickets } from '../../store/tickets';
import Ticket from '../Ticket/Ticket';
import { getActiveOption } from '../../store/sorted';
import Loader from '../Loader/Loader';
import { getCheckboxesState } from '../../store/checkboxes';

import styles from './tickets-list.module.scss';

const TicketsList = () => {
  const [displayCount, setDisplayCount] = useState(5);
  const dispatch = useDispatch();
  const tickets = useSelector(getTickets);
  const isLoading = useSelector(getLoadingStatus);
  const activeSortOption = useSelector(getActiveOption);
  const activeFilters = useSelector(getCheckboxesState);

  useEffect(() => {
    dispatch(fetchTickets());
  }, []);

  const handleClick = () => setDisplayCount((prev) => prev + 5);

  const sortArr = (arr) => {
    if (activeSortOption.title === 'cheapest') return arr.toSorted((a, b) => a.price - b.price);
    if (activeSortOption.title === 'fastest')
      return arr.toSorted((a, b) => {
        const sumOfDurationA = a.segments[0].duration + a.segments[1].duration;
        const sumOfDurationB = b.segments[0].duration + b.segments[1].duration;
        return sumOfDurationA - sumOfDurationB;
      });
  };

  const filterByChbx = (tickets, checkboxes) => {
    const stopsMapping = {
      noTransfer: 0,
      oneStop: 1,
      twoStops: 2,
      threeStops: 3,
    };

    return tickets.filter((flight) => {
      const stopsCountStart = flight.segments[0].stops.length;
      const stopsCountEnd = flight.segments[1].stops.length;
      const filters = checkboxes
        .filter((checkbox) => checkbox.value)
        .map((checkbox) => stopsMapping[checkbox.title] ?? null)
        .filter((value) => value !== null);

      return (
        filters.includes(stopsCountStart) ||
        filters.includes(stopsCountEnd) ||
        (filters.length === 0 && checkboxes.find((checkbox) => checkbox.title === 'all').value)
      );
    });
  };
  if (!isLoading) {
    const sortedTickets = sortArr(tickets);
    const filteredSegments = filterByChbx(sortedTickets, activeFilters);
    const banchTickets = filteredSegments.slice(0, displayCount);

    return banchTickets.length ? (
      <>
        <div className={styles.tickets__list}>
          {banchTickets.map((t, index) => (
            <Ticket key={1 + index} ticket={t} />
          ))}
        </div>
        <button className={styles.tickets__btn} onClick={handleClick}>
          Загрузить еще 5 билетов
        </button>
      </>
    ) : (
      'Рейсов, подходящих под заданные фильтры, не найдено'
    );
  }
  return <Loader title={'Загружаем первую партию билетов'} />;
};

export default TicketsList;
