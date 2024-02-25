import {HttpResponse, http} from 'msw'
import {setupServer} from 'msw/node'
import {afterAll, afterEach, beforeAll, describe, expect, it} from 'vitest'
import {fetchInfo} from './info'

describe('info', {}, () => {
  const info = {
    info: {
      email: 'me@example.com',
      title: 'My Site',
      description: 'My site description',
      taxCode: '123456',
      telephone: '1234567890',
      defaultImage: {
        responsiveImage: {
          src: 'https://example.com/image.jpg',
          alt: 'My image'
        }
      }
    }
  }

  const handlers = [
    http.post('https://graphql.datocms.com/', () => {
      return HttpResponse.json({data: info})
    })
  ]

  const server = setupServer(...handlers)

  beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  describe('fetchInfo', {}, () => {
    it('fetches the info', async () => {
      const result = await fetchInfo()

      expect(result).toEqual(info.info)
    })
  })
})
