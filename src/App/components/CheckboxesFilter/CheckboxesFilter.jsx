import { useDispatch, useSelector } from 'react-redux';

import { getCheckboxesState, switchAll, switchCheckboxes } from '../../store/checkboxes';
import { checkboxFilterLocal } from '../../utils/localizations';

import styles from './filter.module.scss';

const CheckboxesFilter = ({ filterTitle }) => {
  const checkboxesFilter = useSelector(getCheckboxesState);
  const dispatch = useDispatch();

  const handleChange = (item) => {
    item.title === 'all' ? dispatch(switchAll(item)) : dispatch(switchCheckboxes(item));
  };

  return (
    <ul className={styles.tickets__filter}>
      <span>{filterTitle}</span>
      {checkboxesFilter.map((item) => (
        <li key={item.title}>
          <label>
            <input type="checkbox" onChange={() => handleChange(item)} name={item.title} checked={item.value} />
            {checkboxFilterLocal[item.title]}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default CheckboxesFilter;
