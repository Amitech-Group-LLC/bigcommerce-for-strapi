import { ListResult } from 'api-sdk'

export const getAllItems = async <T extends unknown[]>(
  handler: (page: number) => Promise<ListResult<T>>,
  start = 1,
) => {
  const response = await handler(start)
  const result = response.data
  const pagesArray = [...Array(response.meta.pagination.total_pages)]
    .map((_, index) => index + 1)
    .slice(1)
  const batchSize = 10
  for (
    let startPage = start;
    startPage < pagesArray.length;
    startPage += batchSize
  ) {
    const items = await Promise.all(
      pagesArray.slice(startPage, startPage + batchSize).map(async page => {
        return handler(page).then(({ data }) => data)
      })
    )
    result.push(...items)
  }
  return result
}

export const handleList = async <T>(items: T[], handler: (item: T) => Promise<void>): Promise<void> => {
  const batchSize = 100
  for (let startIndex = 0; startIndex < items.length; startIndex += batchSize) {
    await Promise.all(
      items.slice(startIndex, startIndex + batchSize).map(async (item) => {
        return handler(item)
      })
    )
  }
}
