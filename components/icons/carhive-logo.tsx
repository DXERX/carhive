export function CarhiveLogo(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      width="72"
      height="24"
      viewBox="0 0 72 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="1" y="1" width="70" height="22" rx="3" fill="white" stroke="#E11D2E" strokeWidth="2" />
      <text
        x="36"
        y="16.5"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="14"
        fontWeight="700"
        letterSpacing="1.5"
        fill="#E11D2E"
      >
        AVIS
      </text>
    </svg>
  );
}
