import {
  Box,
  Button,
  ButtonGroup,
  Center,
  list,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function MemberList() {
  const [list, setList] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호 (0부터 시작)
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const itemsPerPage = 20; // 페이지당 항목 수
  useEffect(() => {
    axios
      .get(`/member/list?page=${currentPage}&size=${itemsPerPage}`)
      .then((response) => {
        setList(response.data.content);
        setTotalPages(response.data.totalPages);
      });
  }, [currentPage]);
  if (list === null) {
    return <Spinner />;
  }
  function handleTableRowClick(id) {
    const params = new URLSearchParams();
    params.set("id", id);
    navigate("/member?" + params.toString());
  }
  function handlePreviousPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  }

  function handleNextPage() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  }

  // 페이지 번호 버튼 생성
  const pageButtons = [];
  for (let i = 0; i < totalPages; i++) {
    pageButtons.push(
      <Button
        key={i}
        onClick={() => setCurrentPage(i)}
        colorScheme={i === currentPage ? "blue" : "gray"}
      >
        {i + 1}
      </Button>,
    );
  }
  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>logId</Th>
            <Th>name</Th>
            <Th>email</Th>
            <Th>address</Th>
            <Th>age</Th>
            <Th>gender</Th>
            <Th>role</Th>
            <Th>joinDate</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list.map((member) => (
            <Tr
              _hover={{ cursor: "pointer" }}
              key={member.logId}
              onClick={() => handleTableRowClick(member.logId)}
            >
              <Td>{member.logId}</Td>
              <Td>{member.name}</Td>
              <Td>{member.email}</Td>
              <Td>{member.address}</Td>
              <Td>{member.age}</Td>
              <Td>{member.gender}</Td>
              <Td>{member.role}</Td>
              <Td>{member.joinDate}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Center>
        <ButtonGroup>
          <Button onClick={handlePreviousPage} disabled={currentPage === 0}>
            이전
          </Button>
          {pageButtons}
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            다음
          </Button>
        </ButtonGroup>
      </Center>
    </Box>
  );
}
