import {describe, expect, it} from 'vitest'
import {render, screen} from '@testing-library/react'

import Pagination from './Pagination'
import {LinkBuilder} from './Pagination.d'

const link: LinkBuilder = page => page == 1 ? '/pages' : `/pages/${page}`

describe('Pagination', async () => {
  it('shows pages', () => {
    render(
      <Pagination
        currentPage={1}
        pageCount={20}
        perPage={5}
        linkBuilder={link}
      />
    )
    const pages = screen.getAllByRole('page')

    expect(pages.length).toEqual(5)
  })

  describe('when there are less pages than required per page', () => {
    it('shows that number of pages', () => {
      render(
        <Pagination
          currentPage={1}
          pageCount={4}
          perPage={5}
          linkBuilder={link}
        />
      )
      const pages = screen.getAllByRole('page')

      expect(pages.length).toEqual(4)
    })
  })

  it('uses the link builder', () => {
    render(
      <Pagination
        currentPage={3}
        pageCount={20}
        perPage={5}
        linkBuilder={link}
      />
    )

    const pages = screen.getAllByRole('page') as HTMLAnchorElement[]
    expect(pages[0].href).toMatch('/pages')
    expect(pages[1].href).toMatch('/pages/2')
  })

  describe('when the current page is the first', () => {
    it('links to the first page', () => {
      render(
        <Pagination
          currentPage={1}
          pageCount={20}
          perPage={5}
          linkBuilder={link}
        />
      )
      const first = screen.getByRole('first')

      const anchor = first.querySelector('a')
      expect(anchor).toEqual(null)
    })
  })

  describe('when the current page is not the first', () => {
    it('links to the first page', () => {
      render(
        <Pagination
          currentPage={2}
          pageCount={20}
          perPage={5}
          linkBuilder={link}
        />
      )
      const first = screen.getByRole('first')

      const anchor = first.querySelector('a')
      expect(anchor).toBeDefined()
    })
  })
})
