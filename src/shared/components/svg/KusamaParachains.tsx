const KusamaParachains = ({ collapse }: { collapse: boolean }) => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 20 20"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>kusama parachains</title>
    <defs>
      <path
        d="M18,12.5 C18.5522847,12.5 19,12.9477153 19,13.5 C19,14.0522847 18.5522847,14.5 18,14.5 L2,14.5 C1.44771525,14.5 1,14.0522847 1,13.5 C1,12.9477153 1.44771525,12.5 2,12.5 L18,12.5 Z M17.408394,9.8177608e-06 L17.5786466,0.0108070893 C18.0785133,0.0941182107 18.4950689,0.344051575 18.869969,0.67729606 C19.1615579,0.885573864 20.0779803,1.63537396 19.9946691,1.5937184 C19.536458,1.76034064 19.0365912,1.96861844 18.5783801,2.21855181 C18.20348,2.55179629 17.9118911,2.92669634 17.7452689,3.38490751 C17.5786466,3.88477423 17.162091,4.88450769 16.9538132,5.42602998 C16.7455354,5.96755227 16.3289798,6.63404124 14.6211018,7.50880801 C13.1631572,8.25860811 12.4550126,8.55019703 12.2467348,9.09171932 C12.038457,9.63324161 12.1634237,10.2164195 12.4966682,10.6746306 C12.8715683,11.2161529 13.371435,11.591053 13.9546128,11.8409863 C14.5377907,12.0076086 14.5794462,12.2575419 14.5794462,12.2575419 C13.8296461,12.0076086 12.9965349,12.0076086 12.2050793,12.2575419 C12.2050793,12.0076086 12.6216349,11.8409863 12.6216349,11.8409863 C12.6216349,11.8409863 12.5799793,11.5077418 11.7468681,10.9662196 C11.2470014,10.6746306 10.9137569,10.1331083 10.8304458,9.54993049 C10.8304458,9.54993049 9.45581228,9.46661937 9.37250115,9.46661937 L9.37250115,9.46661937 L10.2472679,9.216686 C8.83097887,8.46688591 1.45794462,11.3827752 1.45794462,11.3827752 L1.45794462,11.3827752 L1.45794462,11.1744974 C0.999733457,11.4244307 0.499866728,11.5077418 0,11.3827752 L0,11.3827752 L0.874766774,10.7162862 L0.249933364,10.7162862 L6.45661191,7.50880801 L5.0819784,7.50880801 C5.0819784,7.50880801 6.54492925,6.57160513 8.13577945,5.55929539 L8.5718157,5.28199647 C9.66481875,4.5873323 10.7608579,3.8941862 11.436774,3.47580893 L11.6837309,3.32376006 L11.6837309,3.32376006 L11.7885237,3.25994082 C13.1631572,2.42682961 13.9962684,2.26020737 14.3295129,1.96861844 C14.6627574,1.67702952 15.4958686,0.927229424 15.9124242,0.6356405 C16.3289798,0.344051575 16.9538132,-0.0725040321 17.5786466,0.0108070893 Z"
        id="path-kusama"
      ></path>
    </defs>
    <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Dashboard" transform="translate(-40.000000, -340.000000)">
        <g id="kusama-parachain" transform="translate(40.000000, 340.000000)">
          <rect id="矩形" x="0" y="0" width="20" height="20"></rect>
          <g id="green" transform="translate(0.000000, 3.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-kusama"></use>
            </mask>
            <use
              id="蒙版"
              fill={collapse ? '#949593' : '#14B071'}
              fillRule="nonzero"
              xlinkHref="#path-kusama"
            ></use>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export default KusamaParachains