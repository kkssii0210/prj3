import { Box, CardBody } from "@chakra-ui/react";
import NavBar from "../page/component/NavBar";
import { Outlet } from "react-router-dom";
import React from "react";

export function HomeLayout() {
  return (
    // <Box backgroundColor="yellow.100">
    <Box>
      <NavBar colorScheme="white" />
      <Outlet colorScheme="white" />
      <Box mx={{ base: 0, md: 10, lg: 40 }}></Box>
    </Box>
  );
}
//주석
