const WestendParachains = ({ collapse }: { collapse: boolean }) => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 20 20"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>Westend Parachains</title>
    <defs>
      <path
        d="M15,12.7466233 C15.5522847,12.7466233 16,13.1943386 16,13.7466233 C16,14.2989081 15.5522847,14.7466233 15,14.7466233 L1,14.7466233 C0.44771525,14.7466233 6.76353751e-17,14.2989081 0,13.7466233 C-6.76353751e-17,13.1943386 0.44771525,12.7466233 1,12.7466233 L15,12.7466233 Z M0.532307071,0 C2.17481282,0 3.59271758,1.16044195 3.9308412,2.7814089 L3.9308412,2.7814089 L4.23261419,4.22810169 C4.35977875,4.83768521 5.21855217,4.84942605 5.36203274,4.24354027 L5.36203274,4.24354027 L6.36693992,0 L9.63569808,0 L10.6672415,4.21734274 C10.814963,4.82122297 11.671898,4.80438468 11.7962005,4.19517721 L11.7962005,4.19517721 L12.6519029,0 L16.002638,0 L13.2661033,10.5709332 L9.69711813,10.5709332 L8.5610144,6.43742673 C8.40430971,5.86728575 7.60277811,5.8669306 7.44557203,6.43694623 L7.44557203,6.43694623 L6.30551987,10.5709332 L2.72966147,10.5709332 L9.09494702e-13,0 Z"
        id="path-Westend"
      ></path>
    </defs>
    <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Dashboard" transform="translate(-40.000000, -400.000000)">
        <g id="Westend-Parachains" transform="translate(40.000000, 400.000000)">
          <rect id="矩形" x="0" y="0" width="20" height="20"></rect>
          <g id="green" transform="translate(2.000000, 3.253377)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-Westend"></use>
            </mask>
            <use
              id="蒙版"
              fill={collapse ? '#949593' : '#14B071'}
              fillRule="nonzero"
              xlinkHref="#path-Westend"
            ></use>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export default WestendParachains
