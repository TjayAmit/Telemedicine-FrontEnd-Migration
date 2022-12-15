import React, { useState } from "react";
import { VscBracketError } from "react-icons/vsc";
import { AiOutlineSearch } from "react-icons/ai";
import { Box, Text, Center } from "@chakra-ui/react";
import "../../../App.css";

function SearchNotFound() {
  const [fetch, setFetch] = useState(true);

  setTimeout(() => setFetch(false), [4000]);

  return (
    <div>
      <Box className="notfound" alignItems={"center"} alignContent={"center"}>
        <Center>
          <VscBracketError style={{ fontSize: "50px", color: "grey" }} />
        </Center>

        <Text fontSize={"17px"} color={"gray.600"}>
          {fetch ? "Fetching Records" : "No Records Found"}
        </Text>
        <Box className="searchBox" w={"100px"} h={"100px"}>
          <AiOutlineSearch
            className="rotatecircle"
            style={{
              fontSize: "40px",
            }}
          />
        </Box>
      </Box>
    </div>
  );
}

export default SearchNotFound;
