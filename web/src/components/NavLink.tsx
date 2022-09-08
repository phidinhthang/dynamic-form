import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface NavLinkProps extends LinkProps {
  children?: React.ReactNode;
  to: string;
  activeProps?: LinkProps;
}

export const NavLink: React.FC<NavLinkProps> = ({
  to,
  activeProps,
  children,
  ...props
}) => {
  const router = useRouter();
  const isActive = router.asPath === to;

  return (
    <Link href={to}>
      <ChakraLink {...props} {...(isActive ? activeProps : {})}>
        {children}
      </ChakraLink>
    </Link>
  );
};
