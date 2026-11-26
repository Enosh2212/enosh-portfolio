export function ProjectArt({kind}: {kind: string}) {
  return <div className={'project-art art-' + kind} aria-hidden="true">
    {kind === 'tide' && <svg viewBox="0 0 360 185" fill="none">
      <path d="M-15 144 C52 148 64 97 115 102 S177 146 215 105 S289 48 379 63" stroke="#B3C686" strokeWidth="3"/>
      <path d="M-15 155 C52 159 65 111 115 115 S175 155 220 118 S289 60 379 77" stroke="#B3C686" opacity=".36"/>
      <path d="M25 30H334M25 65H334M25 100H334M25 135H334M25 170H334M40 20V172M110 20V172M180 20V172M250 20V172M320 20V172" stroke="#A9BE8A" opacity=".17"/>
      <circle cx="115" cy="102" r="6" fill="#E5C575"/><circle cx="215" cy="105" r="6" fill="#E5C575"/><circle cx="310" cy="58" r="6" fill="#E5C575"/>
      <path d="M46 42h43m-43 8h22m194 93h44m-44 8h25" stroke="#D9CEA5" opacity=".65"/>
    </svg>}
    {kind === 'fault' && <svg viewBox="0 0 360 185" fill="none">
      <g stroke="#C26750" strokeWidth="1.4"><path d="M14 155 83 116 148 136 210 49 267 101 343 73M31 172 113 151 181 151 240 133 308 143 355 118M83 116l30 35m35-15 33 15m29-102 30 84m27-32 41 42M83 116l28-56 99-11 92-20 41 44m-232-13 37 76m119-35 35-72"/><circle cx="83" cy="116" r="5"/><circle cx="148" cy="136" r="5"/><circle cx="210" cy="49" r="7"/><circle cx="267" cy="101" r="5"/><circle cx="343" cy="73" r="4"/></g>
      <g fill="#DC9070"><circle cx="83" cy="116" r="2"/><circle cx="148" cy="136" r="2"/><circle cx="210" cy="49" r="3"/><circle cx="267" cy="101" r="2"/></g>
    </svg>}
    {kind === 'suqoon' && <svg viewBox="0 0 360 185" fill="none">
      <path d="M28 158 87 93 136 127 187 74 245 130 293 94 354 152V185H0Z" fill="#302645"/>
      <path d="M0 156 64 126 133 161 198 111 251 152 312 129 360 156V185H0Z" fill="#51375D"/>
      <path d="M267 35a19 19 0 1 0 20 24 19 19 0 0 1-20-24Z" fill="#E7BD78"/>
      <path d="M32 34h5m-2-2v5m85 11h6m-3-3v6m56-24h5m-2-2v5m133 35h6m-3-3v6" stroke="#E1B87F" opacity=".7"/>
      <path d="M115 67h100v40h-78l-10 9v-9h-12zM173 116h77v31h-13v9l-9-9h-55z" fill="#A989AA" opacity=".86"/>
      <path d="M132 82h65m-65 10h38m19 39h42" stroke="#F3DDCF" opacity=".9"/>
    </svg>}
  </div>;
}

