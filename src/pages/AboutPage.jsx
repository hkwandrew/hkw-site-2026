import AboutScene from '../scenes/AboutScene'
import useAboutPageAnimation from '../hooks/useAboutPageAnimation'


const AboutPage = () => {
    const { sectionRef, handleScrollHintClick } = useAboutPageAnimation()

    return <AboutScene sectionRef={sectionRef} onScrollHintClick={handleScrollHintClick} />
}

export default AboutPage
