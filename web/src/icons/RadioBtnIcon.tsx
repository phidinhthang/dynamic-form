export const RadioBtnIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  style,
  ...props
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={16}
      height={16}
      viewBox='0 0 512 512'
      {...props}
    >
      <path
        d='M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z'
        style={{
          fill: 'none',
          stroke: '#000',
          strokeMiterlimit: 10,
          strokeWidth: 32,
          ...style,
        }}
      />
      <circle cx='256' cy='256' r='144' />
    </svg>
  );
};
