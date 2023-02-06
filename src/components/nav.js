import Link from 'next/link'

import styles from './nav.module.sass'

const Nav = () => {
  return (
    <nav className={styles.container}>
      <input className={styles.trigger} type="checkbox"/>

      <span className={styles.glyph1}></span>
      <span className={styles.glyph2}></span>
      <span className={styles.glyph3}></span>

      <ul className={styles.menu}>
        <li className={styles.item}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.item}>
          <Link href="/chi-siamo">Chi siamo</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
