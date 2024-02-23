import Link from 'next/link'

import styles from './Pagination.module.sass'

type LinkBuilder = (page: number) => string

const pageRange = (current: number, pageCount: number, pageLinkCount: number): number[] => {
  if (pageCount <= pageLinkCount) {
    return [...Array(pageCount).keys()]
  }
  const half = Math.floor(pageLinkCount / 2)
  const leftStart = current <= half ? 1 : current - half
  const maxStart = pageCount - pageLinkCount + 1
  const start = Math.min(leftStart, maxStart)
  return [...Array(pageLinkCount).keys()].map(n => n + start)
}

const PageLink = ({page, linkBuilder}: {page: number, linkBuilder: LinkBuilder}) => (
  <Link className={styles.page} href={linkBuilder(page)}>
    {page}
  </Link>
)

const CurrentPage = ({page}: {page: number}) => <div className={styles.pageCurrent}>{page}</div>

const Page = ({index, current, linkBuilder}: {index: number, current: number, linkBuilder: LinkBuilder}) => {
  if (index === current) {
    return <CurrentPage page={index} />
  } else {
    return <PageLink page={index} linkBuilder={linkBuilder} />
  }
}

const FirstPage = ({current, linkBuilder}: {current: number, linkBuilder: LinkBuilder}) => {
  const firstLabel = <span className={styles.label}>&nbsp;Prima</span>
  let first: JSX.Element, klass: string
  if (current > 1) {
    first = <Link href={linkBuilder(1)}>|&lt;{firstLabel}</Link>
    klass = styles.buttonFirst
  } else {
    first = <div>|&lt;{firstLabel}</div>
    klass = styles.buttonFirstDisabled
  }
  return <div className={klass}>{first}</div>
}

const LastPage = ({current, count, linkBuilder}: {current: number, count: number, linkBuilder: LinkBuilder}) => {
  const lastLabel = <span className={styles.label}>Ultima&nbsp;</span>
  let last: JSX.Element, klass: string
  if (current < count) {
    last = <Link href={linkBuilder(count)}>{lastLabel}&gt;|</Link>
    klass = styles.buttonLast
  } else {
    last = <div>{lastLabel}&gt;|</div>
    klass = styles.buttonLastDisabled
  }
  return <div className={klass}>{last}</div>
}

const Pagination = ({currentPage, pageCount, linkBuilder}: {currentPage: any, pageCount: any, linkBuilder: LinkBuilder}) => {
  const current: number = parseInt(currentPage)
  const count: number = parseInt(pageCount)
  const pages = pageRange(current, count, 5)
  return (
    <div className={styles.pagination}>
      <FirstPage current={current} linkBuilder={linkBuilder} />
      {pages.map((page, i) => (
        <Page
          key={i}
          index={page}
          current={current}
          linkBuilder={linkBuilder}
        />
      ))}
      <LastPage linkBuilder={linkBuilder} current={current} count={count} />
    </div>
  )
}

export default Pagination
