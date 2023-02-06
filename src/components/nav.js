import Link from 'next/link'
import { withRouter } from 'next/router'

import styles from './nav.module.sass'

const linkClass = (name, current) => {
  if (name == current) {
    return styles['current-item']
  } else {
    return styles.item
  }
}

const Nav = ({ router }) => {
  return (
    <nav className={styles.container}>
      <input className={styles.trigger} type="checkbox"/>

      <span className={styles.glyph1}></span>
      <span className={styles.glyph2}></span>
      <span className={styles.glyph3}></span>

      <ul className={styles.menu}>
        <li className={linkClass('/', router.pathname)}>
          <Link href="/">Home</Link>
        </li>
        <li className={linkClass('/[about-us]', router.pathname)}>
          <Link href="/chi-siamo">Chi siamo</Link>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Nav)
