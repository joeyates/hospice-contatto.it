import Link from 'next/link'

import Body from '@components/Body'
import Main from '@components/Main'
import Title from '@components/Title'
import {request} from '@lib/datocms'
import {homeFragment} from '@schema/home'
import {type Home} from '@schema/home.d'
import styles from './page.module.sass'

type HomeQuery = {home: Home}

const QUERY = `query { home ${homeFragment} }`

const getData = async () => {
  return await request<HomeQuery>({query: QUERY})
}

const Page = async () => {
  const page = await getData()

  return (
    <Main>
      <Title title={page.home.title} />
      <h2 className={styles.subtitle}>{page.home.subtitle}</h2>
      <Link href='/come-sostenerci'>
        <div className={styles.cta}>Sostienici</div>
      </Link>
      <div className={styles['body-wrap']}>
        <Body data={page.home.body} />
      </div>
    </Main>
  )
}

export default Page
