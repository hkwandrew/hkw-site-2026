import ROOTS_PORTFOLIO_ITEMS from '@/routes/roots/rootsPortfolio'
import { describe, expect, it } from 'vitest'

const REACT_MEMO_TYPE = Symbol.for('react.memo')

describe('Roots portfolio frame performance', () => {
  it('keeps every static frame component memoized in the portfolio data', () => {
    ROOTS_PORTFOLIO_ITEMS.forEach(({ FrameComponent }) => {
      expect(FrameComponent).toMatchObject({
        $$typeof: REACT_MEMO_TYPE,
      })
    })
  })
})
