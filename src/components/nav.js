import Link from 'next/link'

import styles from './nav.module.sass'

const Nav = () => {
  return (
    <nav className="svizzerina">
      <input className="svizzerina__trigger" type="checkbox"/>

      <span className="svizzerina__glyph svizzerina__glyph1"></span>
      <span className="svizzerina__glyph svizzerina__glyph2"></span>
      <span className="svizzerina__glyph svizzerina__glyph3"></span>

      <ul className="svizzerina__menu">
        <li className="svizzerina__menu-item">
          <Link href="/">Home</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
