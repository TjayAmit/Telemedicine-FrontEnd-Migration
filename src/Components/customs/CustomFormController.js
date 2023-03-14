import React from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import '../../Style/App.css';

const CustomFormController = ({
  isSignup,
  title,
  type,
  value,
  placeholder,
  setValue,
  errorMessage,
  isError,
  children,
  mt,
  isRequired,
}) => {
  const [show, setShow] = React.useState(false);

  const handleOnChange = e => {
    let textInput = e.target.value;
    setValue(textInput.trim());
  };

  return (
    <>
      <FormControl
        marginTop={mt}
        isInvalid={isError}
        border={'red'}
        isRequired={isRequired}
      >
        <FormLabel fontSize={'14'} fontWeight="500" color={'#272727'}>
          {title}
        </FormLabel>
        <InputGroup>
          {isSignup ? null : (
            <InputLeftElement pointerEvents="none" children={children} />
          )}
          <Input
            onPaste={e => (type === 'password' ? e.preventDefault() : null)}
            type={type !== 'password' ? type : show ? 'text' : type}
            value={value}
            placeholder={placeholder}
            fontSize={13}
            bg="white"
            boxShadow="sm"
            focusBorderColor={'rgba(0, 128, 128,0.5)'}
            onChange={e => handleOnChange(e)}
          />
          {type === 'password' ? (
            <InputRightElement width="3rem" onClick={() => setShow(!show)}>
              {show ? (
                <MdVisibility size={'22px'} color="#718096" />
              ) : (
                <MdVisibilityOff size={'22px'} color="#718096" />
              )}
            </InputRightElement>
          ) : null}
        </InputGroup>
      </FormControl>
    </>
  );
};

export default CustomFormController;
