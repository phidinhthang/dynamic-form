import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, IconButton, Portal, Text } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

interface SidebarProps extends React.PropsWithChildren {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  openSidebar,
  closeSidebar,
  children,
}) => {
  const SidebarOpenButton = (
    <Button onClick={openSidebar} position='fixed' left='0' top='16'>
      open sidebar
    </Button>
  );

  const Component = (
    <AnimatePresence>
      {isSidebarOpen && (
        <Box
          as={motion.div}
          initial={{
            translateX: -300,
          }}
          animate={{ translateX: 0 }}
          exit={{ translateX: -300 }}
          w='300px'
          top='0'
          left='0'
          bottom='0'
          bg='white'
          opacity={1}
          shadow={'base'}
          position='fixed'
          p={4}
          display='flex'
          flexDir='column'
          gap={2}
        >
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
          >
            <Text as='h2' fontWeight='semibold' fontSize='xl'>
              Form elements
            </Text>
            <IconButton
              icon={<CloseIcon />}
              aria-label='close sidebar'
              onClick={closeSidebar}
            />
          </Box>
          {children}
        </Box>
      )}
    </AnimatePresence>
  );

  return (
    <Portal>
      {!isSidebarOpen && SidebarOpenButton}
      {Component}
    </Portal>
  );
};
