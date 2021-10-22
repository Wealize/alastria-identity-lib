import { get, Response } from 'request'

export const responseRequest = (url: string): Promise<Response> => {
  return new Promise((resolve, reject) => {
    get(url, (error, response: Response) => {
      if (error) {
        return reject(error)
      }

      return resolve(response)
    })
  })
}

export const responseBodyRequest = async (url: string) => {
  try {
    const requestData = await responseRequest(url)
    return requestData.body
  } catch (error) {
    return null
  }
}

export const responseheadersRequest = async (url: string) => {
  try {
    const requestData = await responseRequest(url)
    return requestData.headers
  } catch (error) {
    return null
  }
}
