import {CodegenConfig} from '@graphql-codegen/cli'

const ENDPOINT = 'https://graphql.datocms.com/'
const NEXT_DATOCMS_API_TOKEN = process.env.NEXT_DATOCMS_API_TOKEN
const Authorization = `Bearer ${NEXT_DATOCMS_API_TOKEN}`

const config: CodegenConfig = {
  schema: {[ENDPOINT]: {headers: {Authorization}}},
  documents: ['src/**/*.tsx'],
  generates: {
    './app/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql'
      }
    }
  }
}

export default config
