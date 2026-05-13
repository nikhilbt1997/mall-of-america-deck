/**
 * AI-Generated Visual Components
 * These cinematic visual renders were designed using generative AI prompting
 * (Claude + SVG generation) to create luxury mall environment imagery
 * where real photography assets were unavailable.
 */

export const MallInteriorRender = ({ height = 300 }) => (
  <svg viewBox="0 0 800 400" style={{ width: '100%', height, display: 'block' }} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="atrium" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.3"/>
        <stop offset="40%" stopColor="#1a1208" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#080808" stopOpacity="1"/>
      </radialGradient>
      <radialGradient id="skylight" cx="50%" cy="0%" r="60%">
        <stop offset="0%" stopColor="#fff8e0" stopOpacity="0.9"/>
        <stop offset="30%" stopColor="#C9A84C" stopOpacity="0.4"/>
        <stop offset="100%" stopColor="#080808" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1a1208" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#080808" stopOpacity="1"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    {/* Background */}
    <rect width="800" height="400" fill="#080808"/>
    {/* Atrium ceiling light */}
    <ellipse cx="400" cy="0" rx="280" ry="160" fill="url(#skylight)" opacity="0.7"/>
    {/* Floor reflection */}
    <rect x="0" y="280" width="800" height="120" fill="url(#floor)"/>
    {/* Left wing stores */}
    {[0,1,2,3].map(i => (
      <g key={i}>
        <rect x={30 + i*80} y={120 + i*15} width="70" height={160 - i*15} fill={`rgba(201,168,76,${0.04 + i*0.01})`} stroke="rgba(201,168,76,0.15)" strokeWidth="0.5"/>
        <rect x={35 + i*80} y={125 + i*15} width="60" height="20" fill={`rgba(201,168,76,${0.08})`}/>
        {/* Store lights */}
        <rect x={40 + i*80} y={127 + i*15} width="50" height="3" fill="#C9A84C" opacity="0.4" filter="url(#glow)"/>
      </g>
    ))}
    {/* Right wing stores */}
    {[0,1,2,3].map(i => (
      <g key={i}>
        <rect x={700 - i*80} y={120 + i*15} width="70" height={160 - i*15} fill={`rgba(201,168,76,${0.04 + i*0.01})`} stroke="rgba(201,168,76,0.15)" strokeWidth="0.5"/>
        <rect x={705 - i*80} y={125 + i*15} width="60" height="20" fill={`rgba(201,168,76,${0.08})`}/>
        <rect x={710 - i*80} y={127 + i*15} width="50" height="3" fill="#C9A84C" opacity="0.4" filter="url(#glow)"/>
      </g>
    ))}
    {/* Central atrium space */}
    <ellipse cx="400" cy="200" rx="200" ry="120" fill="url(#atrium)"/>
    {/* Hanging light fixtures */}
    {[-120,-60,0,60,120].map((x, i) => (
      <g key={i}>
        <line x1={400+x} y1="0" x2={400+x} y2={80 + i%2*20} stroke="rgba(201,168,76,0.2)" strokeWidth="0.5"/>
        <circle cx={400+x} cy={80 + i%2*20} r="4" fill="#C9A84C" opacity="0.6" filter="url(#glow)"/>
        <ellipse cx={400+x} cy={82 + i%2*20} rx="20" ry="8" fill="#C9A84C" opacity="0.08"/>
      </g>
    ))}
    {/* People silhouettes */}
    {[280,340,400,460,520].map((x,i) => (
      <g key={i}>
        <ellipse cx={x} cy={270} rx="6" ry="15" fill={`rgba(255,255,255,${0.06 + i%3*0.02})`}/>
        <circle cx={x} cy={252} r="5" fill={`rgba(255,255,255,${0.06 + i%3*0.02})`}/>
      </g>
    ))}
    {/* Floor reflection of lights */}
    {[-120,-60,0,60,120].map((x,i) => (
      <ellipse key={i} cx={400+x} cy={320} rx="30" ry="8" fill="#C9A84C" opacity="0.04"/>
    ))}
    {/* Balcony railings level 2 */}
    <rect x="100" y="160" width="180" height="2" fill="rgba(201,168,76,0.2)"/>
    <rect x="520" y="160" width="180" height="2" fill="rgba(201,168,76,0.2)"/>
    {[0,1,2,3,4,5,6,7,8].map(i => (
      <rect key={i} x={100+i*22} y={130} width="1" height="30" fill="rgba(201,168,76,0.15)"/>
    ))}
    {[0,1,2,3,4,5,6,7,8].map(i => (
      <rect key={i} x={520+i*22} y={130} width="1" height="30" fill="rgba(201,168,76,0.15)"/>
    ))}
    {/* AI Generated label */}
    <text x="10" y="390" fill="rgba(201,168,76,0.25)" fontSize="8" fontFamily="monospace" letterSpacing="2">AI-GENERATED RENDER · MALL OF AMERICA ATRIUM</text>
  </svg>
)

export const LuxuryCorridorRender = ({ height = 250 }) => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', height, display: 'block' }} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="corridor" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#0d0a04"/>
        <stop offset="100%" stopColor="#080808"/>
      </linearGradient>
      <radialGradient id="spotR" cx="50%" cy="0%" r="80%">
        <stop offset="0%" stopColor="#E8C96A" stopOpacity="0.5"/>
        <stop offset="100%" stopColor="#080808" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="marbleFloor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1a1410" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#080808" stopOpacity="1"/>
      </linearGradient>
      <filter id="glow2">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <rect width="800" height="300" fill="url(#corridor)"/>
    {/* Perspective floor */}
    <polygon points="0,300 800,300 600,180 200,180" fill="url(#marbleFloor)"/>
    {/* Marble floor lines */}
    {[0,1,2,3,4].map(i => (
      <line key={i} x1={200 + i*50} y1={180} x2={i*160} y2={300} stroke="rgba(201,168,76,0.06)" strokeWidth="0.5"/>
    ))}
    {/* Left luxury storefronts */}
    {[0,1,2].map(i => (
      <g key={i}>
        <rect x={i*120} y={60} width="110" height="160" fill={`rgba(15,12,8,${0.9})`} stroke="rgba(201,168,76,0.2)" strokeWidth="0.5"/>
        <rect x={i*120+5} y={65} width="100" height="40" fill="rgba(201,168,76,0.06)"/>
        <text x={i*120+55} y={90} textAnchor="middle" fill="rgba(201,168,76,0.4)" fontSize="9" fontFamily="serif" letterSpacing="3">
          {['COACH','KATE SPADE','PANDORA'][i]}
        </text>
        <rect x={i*120+10} y={105} width="90" height="100" fill={`rgba(201,168,76,${0.02 + i*0.01})`}/>
        {/* Display window items */}
        <ellipse cx={i*120+55} cy={155} rx="15" ry="20" fill={`rgba(201,168,76,${0.08})`} stroke="rgba(201,168,76,0.15)" strokeWidth="0.5"/>
        {/* Spotlight from ceiling */}
        <ellipse cx={i*120+55} cy={108} rx="35" ry="6" fill="#E8C96A" opacity="0.06"/>
      </g>
    ))}
    {/* Right luxury storefronts */}
    {[0,1,2].map(i => (
      <g key={i}>
        <rect x={800-i*120-110} y={60} width="110" height="160" fill="rgba(15,12,8,0.9)" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5"/>
        <rect x={800-i*120-105} y={65} width="100" height="40" fill="rgba(201,168,76,0.06)"/>
        <text x={800-i*120-55} y={90} textAnchor="middle" fill="rgba(201,168,76,0.4)" fontSize="9" fontFamily="serif" letterSpacing="3">
          {['MICHAEL KORS','HUGO BOSS','SWAROVSKI'][i]}
        </text>
        <rect x={800-i*120-100} y={105} width="90" height="100" fill={`rgba(201,168,76,0.03)`}/>
        <ellipse cx={800-i*120-55} cy={155} rx="15" ry="20" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.15)" strokeWidth="0.5"/>
        <ellipse cx={800-i*120-55} cy={108} rx="35" ry="6" fill="#E8C96A" opacity="0.06"/>
      </g>
    ))}
    {/* Central vanishing point glow */}
    <ellipse cx="400" cy="180" rx="150" ry="60" fill="url(#spotR)" opacity="0.6"/>
    {/* Ceiling track lights */}
    {[100,200,300,400,500,600,700].map((x,i) => (
      <g key={i}>
        <circle cx={x} cy={30} r="3" fill="#E8C96A" opacity="0.5" filter="url(#glow2)"/>
        <line x1={x} y1={33} x2={x+(400-x)*0.3} y2={180} stroke="rgba(232,201,106,0.04)" strokeWidth="8"/>
      </g>
    ))}
    {/* Shoppers silhouettes in distance */}
    {[320,380,420,460].map((x,i) => (
      <g key={i}>
        <ellipse cx={x} cy={175} rx="4" ry="10" fill={`rgba(255,255,255,0.05)`}/>
        <circle cx={x} cy={163} r="4" fill={`rgba(255,255,255,0.05)`}/>
      </g>
    ))}
    <text x="10" y="292" fill="rgba(201,168,76,0.25)" fontSize="8" fontFamily="monospace" letterSpacing="2">AI-GENERATED RENDER · MOA LUXURY CORRIDOR</text>
  </svg>
)

export const EventVenueRender = ({ height = 280 }) => (
  <svg viewBox="0 0 800 350" style={{ width: '100%', height, display: 'block' }} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="stage" cx="50%" cy="80%" r="60%">
        <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.6"/>
        <stop offset="50%" stopColor="#C9A84C" stopOpacity="0.1"/>
        <stop offset="100%" stopColor="#080808" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="crowd" cx="50%" cy="100%" r="80%">
        <stop offset="0%" stopColor="#1a1208" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#080808" stopOpacity="1"/>
      </radialGradient>
      <filter id="stageGlow">
        <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <rect width="800" height="350" fill="#080808"/>
    {/* Stage platform */}
    <ellipse cx="400" cy="260" rx="280" ry="40" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.2)" strokeWidth="1"/>
    <rect x="120" y="220" width="560" height="40" fill="rgba(201,168,76,0.06)" stroke="rgba(201,168,76,0.15)" strokeWidth="0.5"/>
    {/* Stage glow */}
    <ellipse cx="400" cy="240" rx="250" ry="80" fill="url(#stage)" filter="url(#stageGlow)"/>
    {/* Stage lights from above */}
    {[-200,-120,-40,40,120,200].map((x,i) => (
      <g key={i}>
        <line x1={400+x} y1={0} x2={400+x*0.3} y2={220} stroke={`rgba(201,168,76,${0.08 + i%2*0.04})`} strokeWidth="12" strokeLinecap="round"/>
        <circle cx={400+x} cy={10} r="5" fill="#E8C96A" opacity="0.7"/>
        {/* Color variation */}
        <line x1={400+x+15} y1={0} x2={400+x*0.3+10} y2={220} stroke={`rgba(200,100,50,${0.04})`} strokeWidth="8" strokeLinecap="round"/>
      </g>
    ))}
    {/* Performer on stage */}
    <ellipse cx="400" cy="228" rx="12" ry="25" fill="rgba(255,255,255,0.15)"/>
    <circle cx="400" cy="200" r="10" fill="rgba(255,255,255,0.15)"/>
    <ellipse cx="400" cy="230" rx="25" ry="6" fill="rgba(201,168,76,0.2)"/>
    {/* Crowd */}
    {Array.from({length: 60}, (_,i) => {
      const row = Math.floor(i/10)
      const col = i % 10
      const x = 120 + col * 58 + (row%2)*29
      const y = 280 + row * 14
      return <g key={i}>
        <ellipse cx={x} cy={y} rx="7" ry="12" fill={`rgba(255,255,255,${0.03 + Math.random()*0.04})`}/>
        <circle cx={x} cy={y-14} r="6" fill={`rgba(255,255,255,${0.03 + Math.random()*0.04})`}/>
        {/* Phone lights in crowd */}
        {i%5===0 && <rect cx={x+3} cy={y-5} width="4" height="6" fill="rgba(255,255,255,0.3)" rx="1"/>}
      </g>
    })}
    {/* MOA sign */}
    <rect x="300" y="30" width="200" height="50" fill="rgba(8,8,8,0.9)" stroke="rgba(201,168,76,0.3)" strokeWidth="1"/>
    <text x="400" y="50" textAnchor="middle" fill="rgba(201,168,76,0.8)" fontSize="11" fontFamily="serif" letterSpacing="4">MALL OF AMERICA</text>
    <text x="400" y="68" textAnchor="middle" fill="rgba(201,168,76,0.4)" fontSize="8" fontFamily="monospace" letterSpacing="3">ROTUNDA STAGE</text>
    {/* Confetti particles */}
    {[150,220,310,420,500,580,660].map((x,i) => (
      <g key={i}>
        <rect x={x} y={50+i*20} width="4" height="4" fill="rgba(201,168,76,0.4)" transform={`rotate(${i*25})`}/>
        <rect x={x+30} y={80+i*15} width="3" height="3" fill="rgba(255,255,255,0.2)" transform={`rotate(${i*40})`}/>
      </g>
    ))}
    <text x="10" y="342" fill="rgba(201,168,76,0.25)" fontSize="8" fontFamily="monospace" letterSpacing="2">AI-GENERATED RENDER · MOA ROTUNDA STAGE EVENT</text>
  </svg>
)
