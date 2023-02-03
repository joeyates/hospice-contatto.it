const Nav = () => {
  return (
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
  )
}

export default Nav
