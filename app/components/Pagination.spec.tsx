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
    const pages = screen.getAllByText(/\d/)

    expect(pages.length).toEqual(5)
  })

  describe('when the current page is in the middle', {}, () => {
    it('shows the pages around the current page', () => {
      render(
        <Pagination
          currentPage={12}
          pageCount={20}
          perPage={5}
          linkBuilder={link}
        />
      )
      const pages = screen.getAllByText(/\d/)

      const content = pages.map(p => p.textContent)
      expect(content).toEqual(['10', '11', '12', '13', '14'])
    })
  })

  describe('when the current page is at the end', {}, () => {
    it('shows the last pages', () => {
      render(
        <Pagination
          currentPage={20}
          pageCount={20}
          perPage={5}
          linkBuilder={link}
        />
      )
      const pages = screen.getAllByText(/\d/)

      const content = pages.map(p => p.textContent)
      expect(content).toEqual(['16', '17', '18', '19', '20'])
    })
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
      const pages = screen.getAllByText(/\d/)

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

    const pages = screen.getAllByText(/\d/)
    const firstPage = pages[0] as HTMLAnchorElement
    expect(firstPage.href).toMatch('/pages')
    const secondPage = pages[1] as HTMLAnchorElement
    expect(secondPage.href).toMatch('/pages/2')
  })

  it("doesn't link to the current page", () => {
    render(
      <Pagination
        currentPage={3}
        pageCount={20}
        perPage={5}
        linkBuilder={link}
      />
    )

    const pages = screen.getAllByText(/\d/)
    expect(pages[2]).toBeInstanceOf(HTMLDivElement)
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

  describe('when the current page is not the last', {}, () => {
    it('links to the last page', () => {
      render(
        <Pagination
          currentPage={2}
          pageCount={20}
          perPage={5}
          linkBuilder={link}
        />
      )
      const last = screen.getByRole('last')

      const anchor = last.querySelector('a')
      expect(anchor).toBeDefined()
    })
  })

  describe('when the current page is the last', {}, () => {
    it('links to the last page', () => {
      render(
        <Pagination
          currentPage={20}
          pageCount={20}
          perPage={5}
          linkBuilder={link}
        />
      )
      const last = screen.getByRole('last')

      const anchor = last.querySelector('a')
      expect(anchor).toEqual(null)
    })
  })
})
