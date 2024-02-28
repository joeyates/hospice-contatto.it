import {ApolloClient, InMemoryCache, gql} from '@apollo/client'

const ENDPOINT = 'https://graphql.datocms.com/'
const NEXT_DATOCMS_API_TOKEN = process.env.NEXT_DATOCMS_API_TOKEN
const AUTHORIZATION = `Bearer ${NEXT_DATOCMS_API_TOKEN}`
const HEADERS = {authorization: AUTHORIZATION}

const client = new ApolloClient({
  uri: ENDPOINT,
  headers: HEADERS,
  cache: new InMemoryCache()
})

import type {isoDate, parseDate, request} from './datocms.d'

const isoDate: isoDate = date => date.toISOString()
const parseDate: parseDate = date => new Date(date)

const request: request = async ({query, variables}) => {
  return await client
    .query({
      query: gql`
        ${query}
      `,
      variables
    })
    .then(response => response.data)
}

const metadataFragment = `
{
  count
}
`

const recordLinkFragment = `
{
  id
  __typename
  slug
}
`

export {
  AUTHORIZATION,
  ENDPOINT,
  isoDate,
  metadataFragment,
  parseDate,
  recordLinkFragment,
  request
}
