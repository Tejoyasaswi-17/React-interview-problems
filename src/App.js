import styles from './styles.module.css';
import Counter from './components/counter';
import CountDownTimer from './components/countdown-timer';

function App() {
  return (
    <div className={styles.body}>
      {/* <CountDownTimer /> */}
      <Counter />
    </div>
  );
}

export default App;
