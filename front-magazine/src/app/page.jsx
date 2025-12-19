import styles from'./globals.module.scss'
import Header from './components/Header'

export default function Home() {
  return (
    <div className={styles.main}>
      <Header />
    </div>
  );
}
