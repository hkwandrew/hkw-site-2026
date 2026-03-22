import { Fragment, createElement } from 'react'

const BR_TAG_REGEX = /<br\s*\/?>/gi

export const quoteLines = (quote) => {
    if (Array.isArray(quote)) return quote
    if (typeof quote === 'string')
        return quote.split(BR_TAG_REGEX).map((line) => line.trim())
    return [String(quote ?? '')]
}

export const quoteTextWithMarks = (quote) =>
    createElement(
        Fragment,
        null,
        '"',
        ...quoteLines(quote).map((line, index) =>
            createElement(
                Fragment,
                { key: `quote-line-${index}` },
                index > 0 ? createElement('br') : null,
                line,
            ),
        ),
        '"',
    )
