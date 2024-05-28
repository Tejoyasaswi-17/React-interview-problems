import styles from './styles.module.css';
import CountDownTimer from './components/countdown-timer';

function App() {
  return (
    <div className={styles.body}>
      <CountDownTimer />
    </div>
  );
}

export default App;
