import React from 'react';
import { Box } from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';

interface MainPanelProps extends React.PropsWithChildren {
  isSidebarOpen: boolean;
}

const variants: Variants = {
  sidebarOpen: {
    width: 'calc(100% - 300px)',
    x: 300,
  },
  sidebarClose: {
    width: '100%',
    x: 0,
  },
};

export const MainPanel: React.FC<MainPanelProps> = ({
  children,
  isSidebarOpen,
}) => {
  return (
    <motion.div
      style={{ backgroundColor: '#f9f9f9', height: '100vh' }}
      animate={isSidebarOpen ? 'sidebarOpen' : 'sidebarClose'}
      variants={variants}
      transition={{ ease: 'linear' }}
    >
      {children}
    </motion.div>
  );
};
