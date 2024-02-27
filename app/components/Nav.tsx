'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'

import Logo from '@components/Logo'
import styles from './Nav.module.sass'

const isCurrent = (path: string, current: string) => {
  return path == current
}

const linkClass = (path: string, current: string) => {
  if (isCurrent(path, current)) {
    return styles['current-item']
  } else {
    return styles.item
  }
}

type MenuCloser = () => void

const Item = ({path, current, label, closeMenu}: {path: string, current: string, label: string, closeMenu: MenuCloser}) => (
  <li className={linkClass(path, current)} role='menuitem'>
    <Link href={path} onClick={isCurrent(path, current) ? closeMenu : null}>{label}</Link>
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
      data-testid='hamburger-trigger'
    />

    {/* hamburger */}
    <span className={styles.glyph1} data-testid='hamburger-top'></span>
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

  const closeMenu = () => {
    setChecked(false)
  }

  return (
    <Hamburger checked={checked} handleChange={handleChange}>
      <Link href='/'>
        <Logo />
      </Link>

      <ul className={styles.menu} role='menu'>
        <Item path='/' current={current} label='Home' closeMenu={closeMenu} />
        <Item path='/chi-siamo' current={current} label='Chi siamo' closeMenu={closeMenu} />
        <Item path='/eventi' current={current} label='Eventi' closeMenu={closeMenu} />
        <Item path='/diario' current={current} label='Diario' closeMenu={closeMenu} />
        <Item path='/approfondimenti' current={current} label='Approfondimenti' closeMenu={closeMenu} />
        <Item path='/come-sostenerci' current={current} label='Come sostenerci' closeMenu={closeMenu} />
        <Item path='/contatti' current={current} label='Contatti' closeMenu={closeMenu} />
      </ul>
    </Hamburger>
  )
}

export default Nav
