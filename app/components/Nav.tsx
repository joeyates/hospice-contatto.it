'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'

import styles from './Nav.module.sass'

const linkClass = (path: string, current: string) => {
  if (path == current) {
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

const Item = ({path, current, label}) => (
  <li className={linkClass(path, current)}>
    <Link href={path}>{label}</Link>
  </li>
)

const Hamburger = ({checked, handleChange, children}) => (
  <nav className={styles.container}>
    {/* hidden checkbox triggers opening the hamburger on mobile */}
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

    {children}
  </nav>
)

const Nav = (): JSX.Element => {
  const current = usePathname()
  const [checked, setChecked] = useState(false)

  /* close the hamburger menu when the user navigates */
  useEffect(() => {
    setChecked(false)
  }, [current])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }

  return (
    <Hamburger checked={checked} handleChange={handleChange}>
      <Link href='/'>
        <Logo />
      </Link>

      <ul className={styles.menu}>
        <Item path='/' current={current} label='Home' />
        <Item path='/chi-siamo' current={current} label='Chi siamo' />
        <Item path='/eventi' current={current} label='Eventi' />
        <Item path='/diario' current={current} label='Diario' />
        <Item path='/approfondimenti' current={current} label='Approfondimenti' />
        <Item path='/come-sostenerci' current={current} label='Come sostenerci' />
        <Item path='/contatti' current={current} label='Contatti' />
      </ul>
    </Hamburger>
  )
}

export default Nav
