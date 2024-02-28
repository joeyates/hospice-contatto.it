import {responsiveImageFragment} from '@lib/responsiveImage'

const bodyFragment = `
  {
    blocks {
      __typename
      ... on ImageRecord {
        id
        image {
          id
          ${responsiveImageFragment({width: 200})}
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
          ${responsiveImageFragment({width: 700})}
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

export {bodyFragment}
