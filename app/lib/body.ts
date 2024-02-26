import {fragment} from '@lib/responsiveImage'

const queryFragment = `
  body {
    blocks {
      __typename
      ... on ImageRecord {
        id
        image {
          ${fragment({width: 200})}
          alt
          src: url
          title
          width
          height
        }
        priority
      }
      ... on LargeImageRecord {
        id
        image {
          ${fragment({width: 700})}
          alt
          src: url
          title
          width
          height
        }
        priority
      }
    }
    links {
      id
      __typename
      ... on DetailRecord {
        slug
      }
    }
    value
  }
`

export {queryFragment}
