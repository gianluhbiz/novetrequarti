import { useId } from 'react'

/** Vector redraw of the café's round sign: bordeaux ring, cream disc, 9¾. */
export default function Badge({ className = '', title = 'Caffè Novetrequarti' }: { className?: string; title?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={title}>
      <defs>
        <path id={`top-${id}`} d="M 32 100 A 68 68 0 0 1 168 100" />
        <path id={`bot-${id}`} d="M 26 100 A 74 74 0 0 0 174 100" />
      </defs>
      <circle cx="100" cy="100" r="98" fill="#83232f" />
      <circle cx="100" cy="100" r="58" fill="#eadbc0" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="#f4ead8" strokeWidth="2" />
      <text fill="#f4ead8" fontFamily="Schibsted Grotesk, sans-serif" fontWeight="700" fontSize="19" letterSpacing="5">
        <textPath href={`#top-${id}`} startOffset="50%" textAnchor="middle">CAFFÈ</textPath>
      </text>
      <text fill="#f4ead8" fontFamily="Schibsted Grotesk, sans-serif" fontWeight="700" fontSize="15" letterSpacing="3.2">
        <textPath href={`#bot-${id}`} startOffset="50%" textAnchor="middle" dominantBaseline="hanging">NOVETREQUARTI</textPath>
      </text>
      <g fill="#17110f" fontFamily="Cinzel, Georgia, serif" fontWeight="600">
        <text x="98" y="128" fontSize="84" textAnchor="end">9</text>
        <text x="118" y="94" fontSize="34" textAnchor="middle">3</text>
        <rect x="104" y="99" width="28" height="4" />
        <text x="118" y="134" fontSize="34" textAnchor="middle">4</text>
      </g>
    </svg>
  )
}
