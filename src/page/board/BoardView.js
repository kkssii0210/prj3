//상품 선택했을 때 확인 가능한 상품 정보 페이지

import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Center,
  Container,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

export function BoardView() {
  const {id} = useParams();
  const [board, setBoard] = useState(null);

  const toast = useToast();
  const navigate = useNavigate();
  const {isOpen, onOpen, onClose} = useDisclosure();

  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => setBoard(response.data))
      .catch((error) => console.log(error))
      .finally(() => console.log("끝"));
  }, []);

  if (board === null) {
    return <Spinner/>;
  }

  function handleDelete() {
    axios
      .delete("/api/board/remove/" + id)
      .then((response) => {
        toast({
          description: id + "번 앨범이 삭제되었습니다.", status: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        toast({
          description: "삭제 중 문제가 발생하였습니다.", status: "error",
        });
      })
      .finally(() => onClose());
  }

  return (
    <Center>
    <Box border="2px solid black" w="95%" h="90%">
      <Image
        src={board.uploadFiles}
        border="1px solid black"
      />
      <Heading size='md'>Title : {board.title}</Heading>
      <br/>
      <Heading size='m'>Artist : {board.artist}</Heading>
      <Heading size='m'>Album Introduction : {board.content}</Heading>
      <br/>
      <Heading size='m'>Album Price : {board.price}</Heading>
      <Heading size='s'>Album ReleaseDate : {board.releaseDate}</Heading>
      <Heading size='s'>Album Format : {board.albumFormat}</Heading>
      <Button colorScheme="pink" onClick={() => navigate("/edit/" + id)}>edit</Button>
      <Button colorScheme="orange" onClick={onOpen}>delete</Button>


      {/* 삭제 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalHeader>삭제 확인</ModalHeader>
      <ModalCloseButton/>
      <ModalBody>삭제 하시겠습니까?</ModalBody>
      <ModalContent>
        <ModalFooter>
          <Button onClose={onClose}>닫기</Button>
          <Button onClick={handleDelete} colorScheme="red">
            삭제
          </Button>
        </ModalFooter>
      </ModalContent>
      </Modal>
    </Box>
  </Center>
);

}
