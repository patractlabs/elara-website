const DashboardIcon = ({ collapse }: { collapse: boolean }) => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 20 20"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>dashboard 2</title>
    <defs>
      <path
        d="M5,10 C6.65685425,10 8,11.3431458 8,13 L8,15 C8,16.6568542 6.65685425,18 5,18 L3,18 C1.34314575,18 2.02906125e-16,16.6568542 0,15 L0,13 C-2.02906125e-16,11.3431458 1.34314575,10 3,10 L5,10 Z M15,10 C16.6568542,10 18,11.3431458 18,13 L18,15 C18,16.6568542 16.6568542,18 15,18 L13,18 C11.3431458,18 10,16.6568542 10,15 L10,13 C10,11.3431458 11.3431458,10 13,10 L15,10 Z M5,0 C6.65685425,-3.04359188e-16 8,1.34314575 8,3 L8,5 C8,6.65685425 6.65685425,8 5,8 L3,8 C1.34314575,8 2.02906125e-16,6.65685425 0,5 L0,3 C-2.02906125e-16,1.34314575 1.34314575,3.04359188e-16 3,0 L5,0 Z M15,0 C16.6568542,-3.04359188e-16 18,1.34314575 18,3 L18,5 C18,6.65685425 16.6568542,8 15,8 L13,8 C11.3431458,8 10,6.65685425 10,5 L10,3 C10,1.34314575 11.3431458,3.04359188e-16 13,0 L15,0 Z"
        id="path-1"
      ></path>
    </defs>
    <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Dashboard" transform="translate(-40.000000, -100.000000)">
        <g id="编组" transform="translate(40.000000, 100.000000)">
          <rect id="矩形" x="0" y="0" width="20" height="20"></rect>
          <g id="green" transform="translate(1.000000, 1.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-1"></use>
            </mask>
            <use id="蒙版" fill="#949593" xlinkHref="#path-1"></use>
            <g id="编组" mask="url(#mask-2)">
              <g transform="translate(-1.000000, -1.000000)">
                <rect
                  id="矩形"
                  fill={collapse ? '#949593' : '#14B071'}
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                ></rect>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export default DashboardIcon
