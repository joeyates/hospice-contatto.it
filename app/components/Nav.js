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

  /* close the hamburger menu when the user navigates */
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
      <nav className={styles.container}>
        {/* invisible checkbox, present only on mobile that triggers opening the hamburger */}
        <input className={styles.trigger} type="checkbox" checked={checked} onChange={handleChange}/>

        {/* hamburger */}
        <span className={styles.glyph1}></span>
        <span className={styles.glyph2}></span>
        <span className={styles.glyph3}></span>

        <a href="/" alt="Pagina home">
          <div className={styles.logo}>
            <div className={styles.logoPrefix}>Con</div>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" />
              <text x="22" y="80" width="100" height="100">≈</text>
            </svg>
            <div className={styles.logoSuffix}>tatto</div>
          </div>
        </a>

        <ul className={styles.menu}>
          <li className={linkClass('/', pathname)}>
            <Link href="/" alt="Pagina home">Home</Link>
          </li>
          <li className={linkClass('/chi-siamo', pathname)}>
            <Link href="/chi-siamo" alt="Come nasce e cosa vuol fare l'associazione ConTatto">Chi siamo</Link>
          </li>
          <li className={linkClass('/eventi', pathname)}>
            <Link href="/eventi" alt="Eventi e incontri organizzati da ConTatto">Eventi</Link>
          </li>
          <li className={linkClass('/diario', pathname)}>
            <Link href="/diario" alt="La storia dell'associazione, giorno per giorno">Diario</Link>
          </li>
          <li className={linkClass('/approfondimenti', pathname)}>
            <Link href="/approfondimenti" alt="Aprrofondimenti su alcumi termini inerenti agli hospice">Approfondimenti</Link>
          </li>
          <li className={linkClass('/come-sostenerci', pathname)}>
            <Link href="/come-sostenerci" alt="Come puoi aiutarci?">Come sostenerci</Link>
          </li>
          <li className={linkClass('/contatti', pathname)}>
            <Link href="/contatti" alt="Come contattarci">Contatti</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Nav
