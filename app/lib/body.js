import responsiveImage from '@lib/responsiveImage'

const queryFragment = `
  body {
    blocks {
      __typename
      ... on ImageRecord {
        id
        image {
          ${responsiveImage({width: 300})}
        }
      }
      ... on LargeImageRecord {
        id
        image {
          ${responsiveImage({width: 800})}
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
