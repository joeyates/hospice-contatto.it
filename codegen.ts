import {CodegenConfig} from '@graphql-codegen/cli'
import {AUTHORIZATION, ENDPOINT} from './app/lib/datocms'

const config: CodegenConfig = {
  schema: {[ENDPOINT]: {headers: {Authorization: AUTHORIZATION}}},
  documents: ['app/**/*.ts', 'app/**/*.tsx'],
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
