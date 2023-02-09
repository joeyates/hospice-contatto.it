import Link from 'next/link'
import {withRouter} from 'next/router'

import styles from './nav.module.sass'

const linkClass = (name, current) => {
  if (name == current) {
    return styles['current-item']
  } else {
    return styles.item
  }
}

const Nav = ({router}) => (
  <nav className={styles.container}>
    <input className={styles.trigger} type="checkbox"/>

    <span className={styles.glyph1}></span>
    <span className={styles.glyph2}></span>
    <span className={styles.glyph3}></span>

    <ul className={styles.menu}>
      <li className={linkClass('/', router.pathname)}>
        <Link href="/">Home</Link>
      </li>
      <li className={linkClass('/chi-siamo', router.pathname)}>
        <Link href="/chi-siamo">Chi siamo</Link>
      </li>
      <li className={linkClass('/eventi', router.pathname)}>
        <Link href="/eventi">Eventi</Link>
      </li>
      <li className={linkClass('/approfondimenti', router.pathname)}>
        <Link href="/approfondimenti">Approfondimenti</Link>
      </li>
      <li className={linkClass('/come-sostenerci', router.pathname)}>
        <Link href="/come-sostenerci">Come sostenerci</Link>
      </li>
      <li className={linkClass('/contatti', router.pathname)}>
        <Link href="/contatti">Contatti</Link>
      </li>
    </ul>
  </nav>
)

export default withRouter(Nav)
