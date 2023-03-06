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
        }
      }
      ... on LargeImageRecord {
        id
        image {
          alt
          src: url
          title
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
