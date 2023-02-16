import React from "react";
import { IconButton } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import { MdDeleteOutline } from "react-icons/md";
import { CustomModalDelete } from "./CustomModalDelete";
import { CustomEditButton } from "./CustomEditButton";

export const CustomDeleteButton = ({ title, data, id, fetch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton color={"red.400"} onClick={onOpen}>
        <MdDeleteOutline />
      </IconButton>
      <CustomModalDelete
        title={title}
        isOpen={isOpen}
        fetch={fetch}
        id={id}
        onClose={onClose}
      />
    </>
  );
};

export { CustomEditButton, CustomModalDelete };
