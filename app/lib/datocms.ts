import {request as graphqlRequest} from 'graphql-request'

import type {isoDate, parseDate, request} from './datocms.d'

const ENDPOINT = 'https://graphql.datocms.com/'

const isoDate: isoDate = date => date.toISOString()
const parseDate: parseDate = date => new Date(date)

const request: request = ({query, variables, includeDrafts, excludeInvalid}) => {
  const headers = {
    authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`
  }
  if (includeDrafts) {
    headers['X-Include-Drafts'] = 'true'
  }
  if (excludeInvalid) {
    headers['X-Exclude-Invalid'] = 'true'
  }
  return graphqlRequest({url: ENDPOINT, document: query, variables, requestHeaders: headers})
}

export {isoDate, parseDate, request}
