import Link from 'next/link'

import Body from '@components/Body'
import Main from '@components/Main'
import Title from '@components/Title'
import {queryFragment as bodyQueryFragment} from '@lib/body'
import {request as datoCMSRequest} from '@lib/datocms'
import {defaultMetadata} from '@layout'
import styles from './page.module.sass'

const QUERY = `
query {
  home {
    title
    subtitle
    ${bodyQueryFragment}
    associationName {
      alt
      src: url
      title
    }
  }
}
`

const getData = async () => {
  return await datoCMSRequest({query: QUERY})
}

const Page = async () => {
  const page = await getData()

  return (
    <Main>
      <img className={styles['title-image']} {...page.home.associationName}/>
      <h2 className={styles.subtitle}>{page.home.subtitle}</h2>
      <Link href="/come-sostenerci">
        <div className={styles.cta}>Sostienici</div>
      </Link>
      <Body data={page.home.body}/>
    </Main>
  )
}

export default Page
