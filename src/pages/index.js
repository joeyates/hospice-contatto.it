import { request } from '../../lib/datocms'

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
    <div>
      <h1>{page.home.title}</h1>
      <h2>{page.home.subtitle}</h2>
      <h2>{page.home.footer}</h2>
    </div>
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
