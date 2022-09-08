import React from 'react';

export const RowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 512 512'
      width={16}
      height={16}
      {...props}
    >
      <path d='M0,149.854v212.293h512V149.854H0z M158.179,324.683H37.463V187.317h120.716V324.683z M316.357,324.683H195.643V187.317    h120.715V324.683z M474.537,324.683H353.821V187.317h120.716V324.683z' />
    </svg>
  );
};
