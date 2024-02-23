import styles from './Main.module.sass'

const Main = ({children}) => (
  <div className={styles.wrap}>
    <main className={styles.main}>{children}</main>
  </div>
)

export default Main
