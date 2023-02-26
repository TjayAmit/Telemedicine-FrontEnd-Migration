import React from 'react';
import SidebarComponent from '../Components/SidebarComponent';
import Homeheader from '../Components/Homeheader';
import { useProSidebar } from 'react-pro-sidebar';
import { Flex, Box, Spacer } from '@chakra-ui/react';
import '../Style/Sidebar.css';

const Layout = ({ children }) => {
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken } =
    useProSidebar();

  const actionHandle = () => {
    if (broken) {
      toggleSidebar();
      return;
    }
    collapseSidebar();
  };

  return (
    <Flex>
      <SidebarComponent collapsed={collapsed} />
      <Spacer />
      <Flex w={'100%'} h={'100vh'} display={'flex'} flexDirection={'column'}>
        <Homeheader action={actionHandle} collapsed={collapsed} />
        <Box w={'100%'} h={'93.2vh'} bg={'#F2F3F5'} overflow="auto">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
