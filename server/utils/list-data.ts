import { ListResult } from 'api-sdk'

const getBatchPagesArray = (from: number, to: number): number[] => {
  const result = []
  for (let current = from; current <= to; current += 1) {
    result.push(current)
  }
  return result
}

export const getAllItems = async <T extends unknown[]>(
  handler: (page: number) => Promise<ListResult<T>>,
  fromPage = 1,
  toPage = 0,
  batchSize = 10,
): Promise<T> => {
  const response = await handler(fromPage)
  const result = response.data
  const lastPage = toPage ? toPage : response.meta.pagination.total_pages
  for (let current = fromPage + 1; current <= lastPage; current += batchSize + 1) {
    const items = await Promise.all(
      getBatchPagesArray(current, Math.min(current + batchSize, lastPage)).map(page => {
        return handler(page).then(({ data }) => data)
      })
    )
    result.push(...items.reduce((acc, items) => acc.concat(items), []))
  }

  return result
}

export const handleList = async <T>(
  items: T[],
  handler: (item: T) => Promise<void>,
  batchSize = 100,
  batchHandledCallback = (from: number, to: number) => {},
): Promise<void> => {
  for (let startIndex = 0; startIndex < items.length; startIndex += batchSize) {
    await Promise.all(
      items.slice(startIndex, startIndex + batchSize).map(async item => {
        return handler(item)
      })
    )
    batchHandledCallback(startIndex, startIndex + batchSize)
  }
}
