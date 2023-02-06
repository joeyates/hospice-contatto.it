import { StructuredText } from 'react-datocms'
import styles from './footer.module.sass'

const Footer = ({ layout }) => {
  return (
    <div className={styles.footer}>
      <StructuredText data={layout.footer}/>
    </div>
  )
}

export default Footer
