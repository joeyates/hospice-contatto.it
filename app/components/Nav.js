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

const Item = ({path, current, alt, label}) => (
  <li className={linkClass(path, current)}>
    <Link href={path} alt={alt}>
      {label}
    </Link>
  </li>
)

const Nav = () => {
  const current = usePathname()
  const [checked, setChecked] = useState(false)

  /* close the hamburger menu when the user navigates */
  useEffect(() => {
    setChecked(false)
  }, [current])

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
        <input
          className={styles.trigger}
          type='checkbox'
          checked={checked}
          onChange={handleChange}
        />

        {/* hamburger */}
        <span className={styles.glyph1}></span>
        <span className={styles.glyph2}></span>
        <span className={styles.glyph3}></span>

        <a href='/' alt='Pagina home'>
          <Logo />
        </a>

        <ul className={styles.menu}>
          <Item path='/' current={current} alt='Pagina home' label='Home' />
          <Item
            path='/chi-siamo'
            current={current}
            alt="Come nasce e cosa vuol fare l'associazione ConTatto"
            label='Chi siamo'
          />
          <Item
            path='/eventi'
            current={current}
            alt='Eventi e incontri organizzati da ConTatto'
            label='Eventi'
          />
          <Item
            path='/diario'
            current={current}
            alt="La storia dell'associazione, giorno per giorno"
            label='Diario'
          />
          <Item
            path='/approfondimenti'
            current={current}
            alt='Approfondimenti su alcuni termini inerenti agli hospice'
            label='Approfondimenti'
          />
          <Item
            path='/come-sostenerci'
            current={current}
            alt='Come puoi aiutarci?'
            label='Come sostenerci'
          />
          <Item
            path='/contatti'
            current={current}
            alt='Come contattarci'
            label='Contatti'
          />
        </ul>
      </nav>
    </>
  )
}

export default Nav
