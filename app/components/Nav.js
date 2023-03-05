'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'

import styles from './Nav.module.sass'

const linkClass = (name, current) => {
  if (name == current) {
    return styles['current-item']
  } else {
    return styles.item
  }
}

const Nav = () => {
  const pathname = usePathname()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(false)
  }, [pathname])

  const handleChange = e => {
    if (e.target.checked) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }

  return (
    <>
      <input className={styles.trigger} type="checkbox" checked={checked} onChange={handleChange}/>

      <span className={styles.glyph1}></span>
      <span className={styles.glyph2}></span>
      <span className={styles.glyph3}></span>

      <nav className={styles.container}>
        <ul className={styles.menu}>
          <li className={linkClass('/', pathname)}>
            <Link href="/">Home</Link>
          </li>
          <li className={linkClass('/chi-siamo', pathname)}>
            <Link href="/chi-siamo">Chi siamo</Link>
          </li>
          <li className={linkClass('/eventi', pathname)}>
            <Link href="/eventi">Eventi</Link>
          </li>
          <li className={linkClass('/diario', pathname)}>
            <Link href="/diario">Diario</Link>
          </li>
          <li className={linkClass('/approfondimenti', pathname)}>
            <Link href="/approfondimenti">Approfondimenti</Link>
          </li>
          <li className={linkClass('/come-sostenerci', pathname)}>
            <Link href="/come-sostenerci">Come sostenerci</Link>
          </li>
          <li className={linkClass('/contatti', pathname)}>
            <Link href="/contatti">Contatti</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Nav
