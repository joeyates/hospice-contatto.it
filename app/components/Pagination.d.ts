export type LinkBuilder = (page: number) => string

export type PaginationElement = ({currentPage, pageCount, linkBuilder}: {currentPage, pageCount, linkBuilder: LinkBuilder}) => JSX.Element
