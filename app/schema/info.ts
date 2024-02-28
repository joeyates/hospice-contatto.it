import {request} from '@lib/datocms'
import {type Props, type Metadata, type MetadataFetcher} from '@schema/info.d'
import {responsiveImageFragment, toOpenGraphImage} from '@lib/responsiveImage'
import {type ResponsiveImage} from '@lib/responsiveImage.d'
import {type Metadata as NextMetadata} from 'next'

type InfoQuery = {
  info: {
    email: string
    name: string
    siteTitle: string
    siteDescription: string
    taxCode: string
    telephone: string
    defaultImage: {
      responsiveImage: ResponsiveImage
    }
  }
}

const QUERY = `
query {
  info {
    email
    name
    siteTitle
    siteDescription
    taxCode
    telephone
    defaultImage {
      ${responsiveImageFragment({width: 600})}
    }
  }
}
`

const fetchInfo = async () => {
  const {info} = await request<InfoQuery>({query: QUERY})
  return info
}

const metadataDefaults = async (): Promise<Metadata> => {
  const info = await fetchInfo()
  const image = toOpenGraphImage(info.defaultImage.responsiveImage)
  return {
    title: info.siteTitle,
    description: info.siteDescription,
    images: [image]
  }
}

const buildTitle = ({defaults, title}) => `${title} — ${defaults.title}`

const buildMetadata = ({title, description, images}: Metadata): NextMetadata => {
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
*/
const createMetadata = (build?: MetadataFetcher): ((props: Props, parent) => Promise<NextMetadata>) => {
  return async (props, _parent) => {
    const defaults = await metadataDefaults()
    const overrides = build ? await build({defaults, props}) : {}
    const merged = {...defaults, ...overrides}

    return buildMetadata(merged)
  }
}

export {buildTitle, createMetadata, fetchInfo}
