import React, { useState } from "react";
import CustomSidebar from "./Component/Sidebar.js";
import Homeheader from "./Component/Homeheader.js";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Flex, Box } from "@chakra-ui/react";
import "../Sidebar.css";

const Home = ({ children }) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <Flex w={"100%"} pos={"absolute"}>
      <ProSidebarProvider>
        <CustomSidebar flip={collapse} />
        <Flex w={"100%"} h={"100vh"} display={"flex"} flexDirection={"column"}>
          <Homeheader flip={collapse} setflip={setCollapse} />
          <Box id="maincontent" style={{ marginLeft: collapse ? "75px" : "" }}>
            {children}
          </Box>
        </Flex>
      </ProSidebarProvider>
    </Flex>
  );
};

export default Home;
