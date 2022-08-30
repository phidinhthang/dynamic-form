export const TextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={16}
      height={16}
      viewBox='0 0 20 20'
      {...props}
    >
      <path
        fill='currentColor'
        d='M2 17h16v2H2zm9.34-15h3.31l2 14h-3.19l-.29-2.88H8L6.43 16H3.37zm-2 8.71h3.55l-.61-5.51z'
      />
    </svg>
  );
};
