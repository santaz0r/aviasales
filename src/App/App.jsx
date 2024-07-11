import logo from '../assets/avia-logo.svg';

import styles from './App.module.scss';
import CheckboxesFilter from './components/CheckboxesFilter/CheckboxesFilter';
import SortedList from './components/SortedList/SortedList';
import TicketsList from './components/TicketsList/TicketsList';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.app__wrapper}>
        <img src={logo} alt="logo" />
        <div className={styles.tickets}>
          <CheckboxesFilter filterTitle="КОЛИЧЕСТВО ПЕРЕСАДОК" />
          <div className="tickets__wrapper">
            <SortedList />

            <TicketsList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
