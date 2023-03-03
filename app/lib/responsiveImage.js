const responsiveImage = ({width}) => (
  `
  responsiveImage(
    imgixParams: {fm: jpg, fit: max, w: ${width}},
    sizes: "(max-width: ${width}px) 100vw, ${width}px"
  ) {
    srcSet
    sizes
    src
    width
    height
    alt
    title
    blurDataURL: base64
  }
  `
)

export default responsiveImage
