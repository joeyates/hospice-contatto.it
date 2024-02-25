import {render, screen} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

import Nav from '@components/Nav'

describe('Nav', {}, async () => {
  it('shows links', () => {
    render(<Nav />)

    const items = screen.getAllByRole('link')
    const labels = items.map(i => i.textContent)

    expect(labels).toEqual([
      'Con≈tatto',
      'Home',
      'Chi siamo',
      'Eventi',
      'Diario',
      'Approfondimenti',
      'Come sostenerci',
      'Contatti'
    ])
  })
})
