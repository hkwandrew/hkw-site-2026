import accent from './assets/figma-frames/hub-sign/accent.svg'
import bottomRail from './assets/figma-frames/hub-sign/bottom-rail.svg'
import landscape from './assets/figma-frames/hub-sign/landscape.svg'
import leftPost from './assets/figma-frames/hub-sign/left-post.svg'
import rightPost from './assets/figma-frames/hub-sign/right-post.svg'
import sun from './assets/figma-frames/hub-sign/sun.svg'
import topRail from './assets/figma-frames/hub-sign/top-rail.svg'

export default function RootsHubSign() {
  return (
    <div
      data-figma-node='5244:4385'
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '309.255 / 310.605',
      }}
    >
      <img alt='' src={leftPost} style={{ position: 'absolute', left: 0, top: '6.41%', width: '8.41%', height: '93.59%' }} />
      <img alt='' src={rightPost} style={{ position: 'absolute', right: '5.96%', top: 0, width: '9.89%', height: '99.5%' }} />
      <img alt='' src={topRail} style={{ position: 'absolute', left: 0, top: '6.41%', width: '99.36%', height: '8.37%' }} />
      <img alt='' src={bottomRail} style={{ position: 'absolute', left: '0.26%', bottom: '5.74%', width: '99.05%', height: '8.37%' }} />
      <div
        style={{
          position: 'absolute',
          left: '13.19%',
          top: '12.66%',
          width: '72.73%',
          height: '78.35%',
          background: '#d0471b',
          border: '4px solid #a53213',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '17.66%',
            top: '13.67%',
            width: '64.91%',
            color: '#fcfae5',
            fontFamily: 'Acumin Variable Concept, Arial, sans-serif',
            fontSize: '29px',
            fontWeight: 800,
            lineHeight: '0.88',
            textAlign: 'center',
          }}
        >
          Welcome
          <br />
          to our
          <br />
          Non-profit hub
        </div>
        <img alt='' src={landscape} style={{ position: 'absolute', left: '-6.93%', right: '-45.32%', bottom: '-1.12%', height: '49.52%' }} />
        <img alt='' src={accent} style={{ position: 'absolute', left: '71.43%', top: '53.8%', width: '20.2%', height: '8.71%' }} />
        <img alt='' src={sun} style={{ position: 'absolute', left: '43.98%', top: '53.8%', width: '12.04%', height: '11.13%' }} />
      </div>
    </div>
  )
}
