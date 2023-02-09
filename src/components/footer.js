import { StructuredText } from 'react-datocms'
import styles from './footer.module.sass'

const Footer = ({ layout }) => {
  return (
    <div className={styles.footer}>
      <StructuredText data={layout.footer}/>
    </div>
  )
}

const queryFragment = `
  layout {
    footer {
      blocks
      links
      value
    }
  }
`

export {queryFragment}
export default Footer
