import Link from 'next/link'

import styles from './Pagination.module.sass'

const Pagination = ({page, count, path}) => {
  const current = parseInt(page)
  let first
  let previous
  if (current > 1) {
    first = <Link href={path(1)}>|&lt;</Link>
    const href = (current === 2) ? path(1) : path(current - 1)
    previous = <Link href={href}>&lt;</Link>
  } else {
    first = <div className={styles.disabled}>|&lt;</div>
    previous = <div className={styles.disabled}>&lt;</div>
  }
  const max = parseInt(count)
  let last
  let next
  if (current < max) {
    last = <Link href={path(count)}>&gt;|</Link>
    const href = path(current + 1)
    next = <Link href={href}>&gt;</Link>
  } else {
    last = <div className={styles.disabled}>&gt;|</div>
    next = <div className={styles.disabled}>&gt;</div>
  }
  return (
    <div className={styles.pagination}>
      <div>
        {first}
        &nbsp;
        &nbsp;
        {previous}
        &nbsp;
        &nbsp;
        <p>{current}</p>
        &nbsp;
        &nbsp;
        {next}
        &nbsp;
        &nbsp;
        {last}
      </div>
    </div>
  )
}

export default Pagination