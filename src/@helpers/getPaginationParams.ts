// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function getPaginationParams(query: any): [page: number, perPage: number] {
  const { page, perPage } = query

  const perPageNumber =
    typeof perPage === 'string' && Number.parseInt(perPage, 10) > 0
      ? Number.parseInt(perPage, 10)
      : 10

  const pageNumber =
    typeof page === 'string' && Number.parseInt(page, 10) > 0 ? Number.parseInt(page, 10) : 1

  return [pageNumber, perPageNumber]
}
