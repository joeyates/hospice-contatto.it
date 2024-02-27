import styles from './Logo.module.sass'

const Icon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 100 100'
    className={styles.icon}
  >
    <circle cx='50' cy='50' r='40' />
    <text x='22' y='80' width='100' height='100'>
      ≈
    </text>
  </svg>
)

const Logo = () => (
  <div className={styles.logo}>
    <div className={styles.logoPrefix}>Con</div>
    <Icon />
    <div className={styles.logoSuffix}>tatto</div>
  </div>
)

export default Logo
