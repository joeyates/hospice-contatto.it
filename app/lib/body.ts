const queryFragment = `
  body {
    blocks {
      __typename
      ... on ImageRecord {
        id
        image {
          alt
          src: url
          title
          width
          height
        }
      }
      ... on LargeImageRecord {
        id
        image {
          alt
          src: url
          title
          width
          height
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
