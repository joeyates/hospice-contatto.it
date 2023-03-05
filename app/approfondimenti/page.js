import Link from 'next/link'

import Main from '@components/Main'
import Title from '@components/Title'
import {queryFragment as bodyQueryFragment} from '@lib/body'
import {request as datoCMSRequest} from '@lib/datocms'
import {build as buildMetadata} from '@lib/metadata'
import styles from './page.module.sass'

const QUERY = `
query {
  allDetails {
    id
    slug
    title
    ${bodyQueryFragment}
  }
}
`

const getData = async () => {
  return await datoCMSRequest({query: QUERY})
}

const Page = async () => {
  const pages = await getData()

  return (
    <Main>
      <Title title="Approfondimenti"/>
      <ul className={styles.details}>
        {pages.allDetails.map(d => (
          <li className={styles.detail} key={`detail-${d.id}`}>
            <Link className={styles['detail-inner']} href={`/approfondimenti/${d.slug}`}>
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

const metadata = buildMetadata({title: 'Approfondimenti'})

export {metadata}
export default Page
