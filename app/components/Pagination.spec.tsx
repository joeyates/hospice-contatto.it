import {describe, expect, it} from 'vitest'
import {render, screen} from '@testing-library/react'

import Pagination from './Pagination'
import {LinkBuilder} from './Pagination.d'

const link: LinkBuilder = page => `/pages/${1}`

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

  it('when the current page is not the first, Pagination links to the first page', () => {
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