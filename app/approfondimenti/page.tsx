import Link from 'next/link'

import Main from '@components/Main'
import Title from '@components/Title'
import {request} from '@lib/datocms'
import {detailFragment} from '@schema/detail'
import {type Detail} from '@schema/detail.d'
import {createMetadata} from '@schema/info'
import styles from './page.module.sass'

type AllDetailsQuery = {allDetails: Detail[]}

const QUERY = `query { allDetails ${detailFragment} }`

const getData = async () => {
  return await request<AllDetailsQuery>({query: QUERY})
}

const Page = async () => {
  const pages = await getData()

  return (
    <Main>
      <Title title='Approfondimenti' />
      <ul className={styles.details}>
        {pages.allDetails.map(d => (
          <li className={styles.detail} key={`detail-${d.id}`}>
            <Link
              className={styles['detail-inner']}
              href={`/approfondimenti/${d.slug}`}
            >
              <div className={styles.text}>
                <div className={styles.title}>{d.title}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Main>
  )
}

const generateMetadata = createMetadata(async () => ({title: 'Approfondimenti'}))

export {generateMetadata}
export default Page
