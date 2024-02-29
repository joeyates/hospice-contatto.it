import {request} from '@lib/datocms'
import {type InfoQuery} from '@schema/info.d'
import {responsiveImageFragment} from '@lib/responsiveImage'

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

export {fetchInfo}
