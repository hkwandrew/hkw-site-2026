import HeroCloud from '../assets/about-clouds/about-hero-cloud.svg?react'
import scrollHint from '../assets/scroll-hint.svg'

import AboutCloudLayer from '../components/AboutCloudLayer'
import AboutIntroCopy from '../components/AboutIntroCopy'
import AboutOutro from '../components/AboutOutro'
import AboutQuoteLayer from '../components/AboutQuoteLayer'
import { CLOUDS, QUOTES } from '../hooks/aboutData'

const AboutScene = ({ sectionRef, onScrollHintClick }) => {
    return (
        <section className='about' id='about' ref={sectionRef}>
            <div className='about-scene'>
                <div className='about-heroCloud' aria-hidden='true'>
                    <HeroCloud />
                </div>

                <AboutIntroCopy />

                <button
                    className='about-scrollHint'
                    type='button'
                    aria-label='Scroll for testimonials'
                    data-scroll-hint
                    onClick={onScrollHintClick}
                >
                    <img src={scrollHint} alt='' />
                </button>

                <AboutCloudLayer clouds={CLOUDS} />
                <AboutQuoteLayer quotes={QUOTES} />
                <AboutOutro />
            </div>
        </section>
    )
}

export default AboutScene
