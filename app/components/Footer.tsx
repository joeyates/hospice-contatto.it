import Link from 'next/link'

import {fetchInfo} from '@schema/info'
import styles from './Footer.module.sass'

const Footer = async (): Promise<JSX.Element> => {
  const info = await fetchInfo()
  return (
    <div className={styles.footer}>
      <p>{info.name}</p>
      <p>CF: {info.taxCode}</p>
      <p>
        <Link href={`mailto:${info.email}`}>{info.email}</Link>
        &nbsp;-&nbsp;
        <Link href={`tel:${info.telephone}`}>Tel. {info.telephone}</Link>
      </p>
    </div>
  )
}

export default Footer
