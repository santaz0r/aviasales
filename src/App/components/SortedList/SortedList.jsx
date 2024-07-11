import { useDispatch, useSelector } from 'react-redux';

import { chooseSort, getAllOptionSort } from '../../store/sorted';
import { sortedLocal } from '../../utils/localizations';

import styles from './sorted.module.scss';

const SortedList = () => {
  const sortedOptions = useSelector(getAllOptionSort);
  const dispatch = useDispatch();

  const setClasses = (item) => {
    return item.status ? `${styles.sort__item} ${styles.sort__item_active}` : `${styles.sort__item}`;
  };

  const handleClick = (option) => {
    dispatch(chooseSort(option));
  };

  return (
    <div className={`${styles.tickets__sort} ${styles.sort}`}>
      {sortedOptions.map((i) => (
        <button key={i.title} className={setClasses(i)} onClick={() => handleClick(i.title)}>
          {sortedLocal[i.title]}
        </button>
      ))}
    </div>
  );
};

export default SortedList;
