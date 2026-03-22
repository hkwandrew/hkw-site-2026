import { createElement } from 'react'

const AboutCloudLayer = ({ clouds }) => {
    return (
        <div className='about-clouds' aria-hidden='true'>
            {clouds.map((cloud) => (
                <div
                    key={cloud.id}
                    className={`about-cloud about-cloud--${cloud.layer}`}
                    data-cloud-id={cloud.id}
                >
                    {createElement(cloud.component)}
                </div>
            ))}
        </div>
    )
}

export default AboutCloudLayer
