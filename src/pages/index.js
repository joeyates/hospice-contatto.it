import { request } from '../../lib/datocms'
import Head from 'next/head'
import { StructuredText } from 'react-datocms'

const HOMEPAGE_QUERY = `
query HomePage {
  home {
    title
    subtitle
    body {
      blocks
      links
      value
    }
    footer
  }
}
`

const HomePage = ({page}) => {
  return (
    <>
      <Head>
        <title>Progetto Con≈tatto</title>
      </Head>
      <main>
        <div>
          <h1>{page.home.title}</h1>
          <h2>{page.home.subtitle}</h2>
          <StructuredText data={ page.home.body } />
          <h2>{page.home.footer}</h2>
        </div>
      </main>
    </>
  )
}

const getStaticProps = async () => {
  const page = await request({
    query: HOMEPAGE_QUERY
  })

  return {
    props: { page }
  }
}

export {getStaticProps}
export default HomePage
