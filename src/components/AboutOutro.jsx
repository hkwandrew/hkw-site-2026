import MarmotCheer from '../assets/about-clouds/marmot-cheer.svg?react'

const AboutOutro = () => {
    return (
        <>
            <article className='about-outroCopy' data-outro-copy>
                <p className='about-outroQuote'>"We are grateful we selected HKW..."</p>
                <p className='about-outroName'>Nancy Janzen</p>
                <p className='about-outroRole'>CEO at Maplewood</p>
            </article>
            <div className='about-mascot' data-outro-mascot aria-hidden='true'>
                <MarmotCheer />
            </div>
        </>
    )
}

export default AboutOutro
