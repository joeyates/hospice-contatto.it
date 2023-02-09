import {GraphQLClient} from 'graphql-request'

const parseDate = date => new Date(date)

const request = ({query, variables, includeDrafts, excludeInvalid}) => {
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

export {parseDate, request}
