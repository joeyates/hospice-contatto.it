import responsiveImage from '@lib/responsiveImage'

const queryFragment = `
  body {
    blocks {
      __typename
      id
      ... on ImageRecord {
        image {
          ${responsiveImage({width: 300, height: 300})}
        }
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
