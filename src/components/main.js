import styles from './main.module.sass'

const Main = ({children}) => (
  <main className={styles.main}>
    <>
      {...children}
    </>
  </main>
)

export default Main
