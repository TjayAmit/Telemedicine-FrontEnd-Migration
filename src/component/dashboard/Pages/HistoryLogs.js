import { useState } from "react";
import { Box, Text, Container, Flex } from "@chakra-ui/react";
import { LogTableData, CustomTablePaginate, TitleColor } from "../Packages";
import { RiFileListFill } from "react-icons/ri";

const HistoryLogs = () => {
  const [search, setSearch] = useState("");

  const Title = "History Logs";

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "METHOD",
      accessor: "method",
    },
    {
      Header: "USER",
      accessor: "user",
    },
    {
      Header: "FACILITY",
      accessor: "facility",
    },
    {
      Header: "DATE",
      accessor: "date",
    },
  ];

  return (
    <>
      <Container maxW={"container.xxl"}>
        <Box mt={[5, 5, 8, 5]} p={[0, 0, 3, 10]}>
          <Box className="table-head">
            <Flex color={TitleColor} columnGap={2}>
              <RiFileListFill fontSize={40} fontWeight={"900"} ml={5} />
              <Text fontSize={30} color={TitleColor} fontWeight={"900"}>
                {Title}
              </Text>
            </Flex>
          </Box>

          <Box mt={"2rem"}>
            <CustomTablePaginate
              title={Title}
              columns={columns}
              data={LogTableData}
              search={search}
              setSearch={setSearch}
              isModal={true}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HistoryLogs;
