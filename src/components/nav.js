import styles from '@/styles/Nav.module.css'

const Nav = () => {
  return (
    <>
      <div className={styles['desktop-nav']}>
      <nav className="horizontal-menu">
        <ul className="svizzerina__menu">
          <a href="/">
            <li className="svizzerina__menu-item">Home</li>
          </a>
        </ul>
      </nav>
      </div>
      <div className={styles['mobile-nav']}>
      <nav className="svizzerina">
        <input className="svizzerina__trigger" type="checkbox"/>

        <span className="svizzerina__glyph svizzerina__glyph1"></span>
        <span className="svizzerina__glyph svizzerina__glyph2"></span>
        <span className="svizzerina__glyph svizzerina__glyph3"></span>

        <ul className="svizzerina__menu">
          <a href="/">
            <li className="svizzerina__menu-item">Home</li>
          </a>
        </ul>
      </nav>
      </div>
    </>
  )
}

export default Nav
