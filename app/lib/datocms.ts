import {GraphQLClient} from 'graphql-request'

import type {isoDate, parseDate, request} from './datocms.d'

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
  const client = new GraphQLClient('https://graphql.datocms.com', {headers})
  return client.request(query, variables)
}

export {isoDate, parseDate, request}
