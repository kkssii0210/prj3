import {
  AbsoluteCenter,
  Box,
  DrawerFooter,
  Spacer,
  Text,
} from "@chakra-ui/react";
import NavBar from "../page/component/NavBar";
import { Outlet } from "react-router-dom";
import React from "react";

export function HomeLayout() {
  return (
    <>
      <Box>
        <NavBar />
        <Outlet />
      </Box>
      <Spacer h={100} />
      <Box
        w="100%"
        h="250px"
        mt={5}
        textAlign="center"
        backgroundColor="grey"
        color="white"
      >
        <AbsoluteCenter>
          <Text mb={2}>Company: 뮤레코드 대표: 주예린</Text>
          <Text mb={2}>E-mail: muerecords@gmail.com</Text>
          <Text mb={2}>Address: 제주도 서귀포시</Text>
          <Text mb={2}>Bank info: 국민은행 284002-04-192958</Text>
        </AbsoluteCenter>
      </Box>
    </>
  );
}
//주석
