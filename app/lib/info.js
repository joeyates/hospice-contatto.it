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

const buildTitle = ({info, props, title}) => {
  switch (typeof title) {
    case 'function':
      return title({info, props})
    case 'string':
      return `${title} — ${info.siteTitle}`
    default:
      return info.siteTitle
  }
}

/*
Build an async function to return metadata build from
the combination of DatoCMS defaults and the supplied overrides

* title [optional]: a function or string
*/
const createMetadata = ({title: pageTitle, description: pageDescription} = {}) => {
  return async (props, _parent) => {
    const info = await fetchInfo()
    const title = buildTitle({info, props, title: pageTitle})
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
