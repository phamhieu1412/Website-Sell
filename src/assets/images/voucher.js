import React from 'react';

const Voucher = () => {
  return (
    <>
      <svg fill="none" viewBox="0 0 23 22" className="shopee-svg-icon icon-voucher-applied-line">
        <rect x="13" y="9" width="10" height="10" rx="5" fill="#EE4D2D"></rect>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.881 11.775a.54.54 0 00-.78.019l-2.509 2.765-1.116-1.033a.542.542 0 00-.74.793l1.5 1.414a.552.552 0 00.844-.106l2.82-3.109a.54.54 0 00-.019-.743z"
          fill="#fff"></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.488 16.178h.858V14.57h-.858v1.607zM6.488 13.177h.858v-1.605h-.858v1.605zM6.488 10.178h.858V8.572h-.858v1.606zM6.488 7.178h.858V5.572h-.858v1.606z"
          fill="#EE4D2D"></path>
        <g filter="url(#voucher-filter1_d)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 4v2.325a1.5 1.5 0 01.407 2.487l-.013.012c-.117.103-.25.188-.394.251v.65c.145.063.277.149.394.252l.013.012a1.496 1.496 0 010 2.223l-.013.012c-.117.103-.25.188-.394.251v.65c.145.063.277.149.394.252l.013.012A1.5 1.5 0 011 15.876V18h12.528a6.018 6.018 0 01-.725-1H2v-.58c.55-.457.9-1.147.9-1.92a2.49 2.49 0 00-.667-1.7 2.49 2.49 0 00.667-1.7 2.49 2.49 0 00-.667-1.7A2.49 2.49 0 002.9 7.7c0-.773-.35-1.463-.9-1.92V5h16v.78a2.494 2.494 0 00-.874 2.283 6.05 6.05 0 011.004-.062A1.505 1.505 0 0119 6.325V4H1z"
            fill="#EE4D3D"></path>
        </g>
        <defs>
          <filter
            id="voucher-filter1_d"
            x="0"
            y="3"
            width="20"
            height="16"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
            <feOffset></feOffset>
            <feGaussianBlur stdDeviation=".5"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"></feColorMatrix>
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend>
            <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend>
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default Voucher;
