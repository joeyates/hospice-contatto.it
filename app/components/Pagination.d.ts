export type LinkBuilder = (page: number) => string

export type PaginationElement = ({
  currentPage,
  pageCount,
  linkBuilder
}: {
  currentPage: number
  pageCount: number
  linkBuilder: LinkBuilder
}) => JSX.Element
