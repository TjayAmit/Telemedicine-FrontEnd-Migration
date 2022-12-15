import React from "react";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import "../../../Table.css";
function Searchfield({ search, currsearch, placeholder }) {
  return (
    <div>
      <Box mb={2} mt={2}>
        <InputGroup id="searchbg">
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineSearch />}
            color={"gray.500"}
          />
          <Input
            id="searchfield"
            placeholder={placeholder}
            fontSize={14}
            focusBorderColor={"green"}
            outline={"none"}
            value={search}
            onChange={(e) => currsearch(e.target.value)}
          />
        </InputGroup>
      </Box>
    </div>
  );
}

export default Searchfield;
