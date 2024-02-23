import {OpenGraphImage} from './responsiveImage.d'

const EXTENSION_TO_MIME_TYPE = {
  gif: 'image/gif',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp'
}

const mimeType = url => {
  const match = url.match(/\.(\w+)(\?.*?)?$/)
  if (match) {
    return EXTENSION_TO_MIME_TYPE[match[1].toLowerCase()]
  } else {
    return EXTENSION_TO_MIME_TYPE.jpg
  }
}

// https://ogp.me/#structured
const toOpenGraphImage = ({alt, height, src, title, width}): OpenGraphImage => {
  return {
    alt,
    height,
    url: src,
    title,
    type: mimeType(src),
    width
  }
}

const fragment = ({width}) => (
  `
  responsiveImage(
    imgixParams: {fit: max, w: ${width}},
    sizes: "(max-width: ${width}px) 100vw, ${width}px"
  ) {
    alt
    height
    src
    title
    width
  }
  `
)

export {fragment, toOpenGraphImage}
