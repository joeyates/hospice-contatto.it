import {request as datoCMSRequest} from '@lib/datocms'
import responsiveImage from '@lib/responsiveImage'

const queryFragment = `
  info {
    email
    name
    siteTitle
    siteDescription
    taxCode
    telephone
    defaultImage {
      ${responsiveImage({width: 600})}
    }
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

const metadataDefaults = async () => {
  const info = await fetchInfo()
  return {
    title: info.siteTitle,
    description: info.siteDescription,
    images: [info.defaultImage.responsiveImage]
  }
}

const buildTitle = async ({defaults, title}) => `${title} — ${defaults.title}`

const buildMetadata = ({title, description, images}) => {
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: images
    }
  }
}

/*
Build an async function to return metadata build from
the combination of DatoCMS defaults and the supplied overrides

* title [optional]: a (possible async) function or a string
*/
const createMetadata = build => {
  return async (props, _parent) => {
    const defaults = await metadataDefaults()
    const overrides = typeof build === 'function' ? await build({defaults, props}) : {}
    const merged = {...defaults, ...overrides}

    return buildMetadata(merged)
  }
}

export {buildTitle, createMetadata, fetchInfo}
