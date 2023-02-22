const SITE_TITLE = 'Associazione CONTATTO'
const SITE_DESCRIPTION = 'Per un Hospice nel Valdarno Fiorentino e nella Valdisieve'

const DEFAULTS = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION
}

const build = ({title: rawTitle, description = SITE_TITLE}) => {
  let title
  if(rawTitle) {
    title = `${rawTitle} — ${SITE_TITLE}`
  } else {
    title = SITE_TITLE
  }

  return {
    title,
    description
  }
}

export {build, DEFAULTS, SITE_DESCRIPTION, SITE_TITLE}
