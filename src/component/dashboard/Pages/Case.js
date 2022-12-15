import { Box, Text, Container, Flex, Center } from "@chakra-ui/react";
import { CaseData, CustomTablePaginate, TitleColor } from "../Packages";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaHospitalUser } from "react-icons/fa";
import { CaseGetRequest } from "../../api/Case_Request";
import { useEffect } from "react";

const Case = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [search, setSearch] = useState("");
  const [fetch, setFetch] = useState(false);
  const Title = "Case";

  const handleClick = () => {
    navigate("/h/case/form");
  };

  const columns = [
    {
      Header: "ID",
      accessor: "PK_cases_ID",
    },
    {
      Header: "PATIENTS",
      accessor: "patient",
    },
    {
      Header: "CIVIL STATUS",
      accessor: "patients_CivilStatus",
    },
    {
      Header: "GENDER",
      accessor: "patients_Gender",
    },
    {
      Header: "SERVICE",
      accessor: "specializations_Title",
    },
    {
      Header: "STATUS",
      accessor: "cases_status",
    },
    {
      Header: "ACTION",
      accessor: "action",
    },
  ];

  const handleFetchCase = async () => {
    const res = await CaseGetRequest();

    if (res.data.status === 200) {
      setCases(res.data.data);
    }
  };

  const filtered = cases.filter((filter) =>
    filter.cases_status === 2
      ? null
      : filter.patient.toLowerCase().includes(search.toLowerCase()) ||
        filter.specializations_Title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        filter.patients_Gender.toLowerCase().includes(search.toLowerCase()) ||
        filter.patients_CivilStatus.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    handleFetchCase();
  }, []);

  return (
    <>
      <Container maxW={"container.xxl"}>
        <Box mt={[5, 5, 8, 5]} p={[0, 0, 3, 10]}>
          <Box className="table-head">
            <Flex color={TitleColor} columnGap={2}>
              <FaHospitalUser fontSize={35} fontWeight={"900"} ml={5} />
              <Text fontSize={30} fontWeight={"900"}>
                {Title}
              </Text>
            </Flex>
          </Box>

          <Box mt={"2rem"}>
            <CustomTablePaginate
              title={Title}
              columns={columns}
              data={filtered}
              fetch={setFetch}
              search={search}
              handleClick={handleClick}
              setSearch={setSearch}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Case;
