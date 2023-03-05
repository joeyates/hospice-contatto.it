const responsiveImage = ({width}) => (
  `
  responsiveImage(
    imgixParams: {fit: max, w: ${width}},
    sizes: "(max-width: ${width}px) 100vw, ${width}px"
  ) {
    src
    alt
    title
  }
  `
)

export default responsiveImage
