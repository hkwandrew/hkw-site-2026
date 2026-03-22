import { quoteTextWithMarks } from '../hooks/aboutText'

const AboutQuoteLayer = ({ quotes }) => {
    return (
        <div className='about-quotes'>
            {quotes.map((quote) => (
                <article
                    key={quote.id}
                    className={`about-quote about-quote--${quote.layer}`}
                    data-quote-id={quote.id}
                    data-quote-layer={quote.layer}
                >
                    <p className='about-quoteText'>{quoteTextWithMarks(quote.quote)}</p>
                    <p className='about-quoteName'>{quote.name}</p>
                    <p className='about-quoteRole'>
                        {quote.roleLines.map((line, index) => (
                            <span key={`${quote.id}-role-${index}`}>{line}</span>
                        ))}
                    </p>
                </article>
            ))}
        </div>
    )
}

export default AboutQuoteLayer
