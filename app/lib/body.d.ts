export type Block = {
  __typename: string
  id: string
  image?: {
    alt: string
    src: string
    title: string
    width: number
    height: number
  }
  caption?: string
}

export type Body = {
  blocks: Array<Block>
  links: Array<{
    id: string
    __typename: string
    slug?: string
  }>
  value: string
}
