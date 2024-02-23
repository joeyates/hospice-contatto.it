import styles from './Title.module.sass'

const Title = ({title}): JSX.Element => <h1 className={styles.title}>{title}</h1>

export default Title
