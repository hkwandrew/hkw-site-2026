import WorkDirtForegroundArtwork from '@/routes/work/WorkDirtForegroundArtwork'
import WorkMarmot from '@/routes/work/WorkMarmot'
import { describe, expect, it } from 'vitest'

const REACT_MEMO_TYPE = Symbol.for('react.memo')

describe('Work page artwork performance', () => {
  it('keeps static SVG-heavy work artwork memoized', () => {
    expect(WorkDirtForegroundArtwork).toMatchObject({
      $$typeof: REACT_MEMO_TYPE,
    })
    expect(WorkMarmot).toMatchObject({
      $$typeof: REACT_MEMO_TYPE,
    })
  })
})
