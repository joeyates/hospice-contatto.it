import Link from 'next/link'

import styles from './Footer.module.sass'

const Footer = () => (
  <div className={styles.footer}>
    <p>CONTATTO - Associazione per la cura nel fine vita</p>
    <p>CF: 94321040480</p>
    <p>
      <Link href="mailto:info@hospice-contatto.it">info@hospice-contatto.it</Link>
      &nbsp;-&nbsp;
      <Link href="tel:+393661687528">Tel. +393661687528</Link>
    </p>
  </div>
)

export default Footer
