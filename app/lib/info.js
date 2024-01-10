import {request as datoCMSRequest} from '@lib/datocms'

const queryFragment = `
  info {
    siteTitle
    siteDescription
    taxCode
    telephone
  }
`

const QUERY = `
query {
  ${queryFragment}
}
`

const fetchInfo = async () => {
  const {info} = await datoCMSRequest({query: QUERY})
  return info
}

const createMetadata = ({title: pageTitle, description: pageDescription} = {}) => {
  return async (_props, _parent) => {
    const info = await fetchInfo()
    let title
    if(pageTitle) {
      title = `${pageTitle} — ${info.siteTitle}`
    } else {
      title = info.siteTitle
    }
    let description
    if (pageDescription) {
      description = pageDescription
    } else {
      description = info.siteDescription
    }

    return {title, description}
  }
}

export {createMetadata, queryFragment}
