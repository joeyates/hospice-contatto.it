import styles from './Attachments.module.sass'

const Attachments = ({attachments}) => (
  <ul className={styles.attachments}>
  {
    attachments.map(a => (
      <li key={a.id}>
        <a href={a.url} rel="noreferrer" target="_blank">
          {a.title}
        </a>
      </li>
    ))
  }
  </ul>
)

export default Attachments
