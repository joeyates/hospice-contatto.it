import Link from 'next/link'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'

import styles from './nav.module.sass'

const linkClass = (name, current) => {
  if (name == current) {
    return styles['current-item']
  } else {
    return styles.item
  }
}

const Nav = () => {
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(false)
  }, [router.asPath])

  const handleChange = e => {
    if (e.target.checked) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }

  return (
    <nav className={styles.container}>
      <input className={styles.trigger} type="checkbox" checked={checked} onChange={handleChange}/>

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
}

export default Nav
