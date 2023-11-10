import PropTypes from "prop-types";
import { FormControl, FormLabel, Input, InputGroup } from "@chakra-ui/react";
import "../../Style/App.css";

const TOPTextFormController = ({
  inputRef,
  value,
  index,
  onChange,
  isError,
}) => {
  return (
    <FormControl w={50} h={50} marginTop={5} isInvalid={isError} border={"red"}>
      <FormLabel fontSize={"14"} fontWeight="500" color={"#272727"}></FormLabel>
      <InputGroup>
        <Input
          ref={inputRef}
          onPaste={() => null}
          maxLength={1}
          type={"number"}
          value={value}
          placeholder=""
          fontSize={16}
          fontWeight={700}
          textAlign={"center"}
          bg="white"
          boxShadow="sm"
          focusBorderColor={"rgba(0, 128, 128,0.5)"}
          onChange={(e) => onChange(e, index)}
        />
      </InputGroup>
    </FormControl>
  );
};

TOPTextFormController.propTypes = {
  inputRef: PropTypes.object,
  value: PropTypes.string,
  index: PropTypes.integer,
  setValue: PropTypes.function,
  isError: PropTypes.bool,
  onChange: PropTypes.function,
};

export default TOPTextFormController;