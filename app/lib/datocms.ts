import {request as graphqlRequest} from 'graphql-request'

import type {isoDate, parseDate, request} from './datocms.d'

const ENDPOINT = 'https://graphql.datocms.com/'

const isoDate: isoDate = date => date.toISOString()
const parseDate: parseDate = date => new Date(date)

const requestHeaders = ({includeDrafts, excludeInvalid}) => {
  const headers = {
    authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`
  }
  if (includeDrafts) {
    headers['X-Include-Drafts'] = 'true'
  }
  if (excludeInvalid) {
    headers['X-Exclude-Invalid'] = 'true'
  }
  return headers
}

const request: request = ({query, variables, includeDrafts, excludeInvalid}) => {
  const headers = requestHeaders({includeDrafts, excludeInvalid})
  return graphqlRequest({url: ENDPOINT, document: query, variables, requestHeaders: headers})
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

export {isoDate, metadataFragment, parseDate, recordLinkFragment, request}
