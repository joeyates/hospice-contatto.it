import Body, {queryFragment as bodyQueryFragment} from '@/components/body'
import Footer, {queryFragment as footerQueryFragment} from '@/components/footer'
import Head from '@/components/head'
import Main from '@/components/main'
import Title from '@/components/title'
import {request} from '@/lib/datocms'
import styles from './chi-siamo.module.sass'

const ABOUT_US_QUERY = `
query {
  about {
    id
    title
    ${bodyQueryFragment}
    attachments {
      id
      title
      url
    }
  }
  ${footerQueryFragment}
}
`

const AboutUs = ({page}) => (
  <>
    <Head title={page.about.title}/>
    <Main>
      <Title title={page.about.title}/>
      <Body data={page.about.body}/>
      <ul className={styles.attachments}>
      {
        page.about.attachments.map(a => (
          <li>
            <a href={a.url} key={a.id} rel="noreferrer" target="_blank">
              {a.title}
            </a>
          </li>
        ))
      }
      </ul>
      <Footer layout={page.layout}/>
    </Main>
  </>
)

const getStaticProps = async () => {
  const page = await request({
    query: ABOUT_US_QUERY
  })

  return {
    props: {page}
  }
}

export {getStaticProps}
export default AboutUs
