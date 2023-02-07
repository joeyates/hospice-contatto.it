import { StructuredText } from 'react-datocms'

import styles from './body.module.sass'

const Body = ({data}) => (
  <div className={styles.body}>
    <StructuredText data={data}/>
  </div>
)

export default Body
