import NextHead from 'next/head'

const SITE_TITLE = 'Progetto CON≈TATTO'

const Head = ({title = null}) => {
  const fullTitle = title ? `${title} — ${SITE_TITLE}` : SITE_TITLE
  return (
    <NextHead>
      <title>{fullTitle}</title>
    </NextHead>
  )
}

export default Head
