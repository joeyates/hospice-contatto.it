import {createMetadata as globalCreateMetadata} from '@lib/info'

const createMetadata = () => {
  return globalCreateMetadata(async ({props}) => {
    return {title: generateTitle({props})}
  })
}

const generateTitle = ({props}) => {
  return `Diario - pagina ${props.params.page}`
}

export {createMetadata, generateTitle}
