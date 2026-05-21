import arrow from './assets/figma-frames/up-button/arrow.svg'
import button from './assets/figma-frames/up-button/button.svg'

export default function RootsUpButton() {
  return (
    <div
      data-figma-node='5244:3688'
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '104.025 / 102.974',
      }}
    >
      <img alt='' src={button} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      <img alt='' src={arrow} style={{ position: 'absolute', left: '29.49%', top: '10.35%', width: '44.53%', height: '48.97%' }} />
      <div
        style={{
          position: 'absolute',
          left: '22.43%',
          right: '18.91%',
          bottom: '10.21%',
          color: '#ab4d00',
          fontFamily: 'Acumin Variable Concept, Arial, sans-serif',
          fontSize: '16px',
          fontWeight: 900,
          lineHeight: '1.58',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        GO UP
      </div>
    </div>
  )
}
