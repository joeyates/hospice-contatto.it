export type Body = {
  blocks: Array<{
    __typename: string
    id: string
    image?: {
      alt: string
      src: string
      title: string
      width: number
      height: number
    }
  }>
  links: Array<{
    id: string
    __typename: string
    slug?: string
  }>
  value: string
}
