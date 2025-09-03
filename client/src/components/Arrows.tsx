import React from 'react';

type ArrowProps = {
  width?: number;
  height?: number;
  fill?: string;
};

export const ArrowRight: React.FC<ArrowProps> = ({
  width = 17,
  height = 15,
  fill = 'white',
}) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 17 15'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M10.324 15V10.2472H0V4.78652H10.324V0L17 7.48314L10.324 15Z'
      fill={fill}
    />
  </svg>
);

export const ArrowLeft: React.FC<ArrowProps> = ({
  width = 17,
  height = 15,
  fill = 'white',
}) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 17 15'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M6.67602 15L0 7.48314L6.67602 0V4.78652H17V10.2472H6.67602V15Z'
      fill={fill}
    />
  </svg>
);

export const ArrowUp: React.FC<ArrowProps> = ({
  width = 15,
  height = 17,
  fill = 'white',
}) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 15 17'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M4.75281 17V6.67602H0L7.51685 0L15 6.67602H10.2135V17H4.75281Z'
      fill={fill}
    />
  </svg>
);

export const ArrowDown: React.FC<ArrowProps> = ({
  width = 15,
  height = 17,
  fill = 'white',
}) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 15 17'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M7.51685 17L0 10.324H4.78652V0H10.2472V10.324H15L7.51685 17Z'
      fill={fill}
    />
  </svg>
);
