const responsiveImage = ({width, height}) => (
  `
  responsiveImage(
    imgixParams: {fm: jpg, fit: crop, w: ${width}, h: ${height}},
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
