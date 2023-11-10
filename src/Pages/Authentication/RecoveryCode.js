import { Flex } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import TOPTextFormController from "./TOPTextFormController";
import "../../Style/App.css";

const RecoveryCode = ({ setCode }) => {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleInputChange = (event, currentIndex) => {
    const { value } = event.target;
    if (value.length <= 1) {
      const newOTP = [...otp];
      newOTP[currentIndex] = value;
      setOTP(newOTP);

      if (value !== "" && currentIndex < inputRefs.length - 1) {
        // Move focus to the next input field
        const nextIndex = currentIndex + 1;
        inputRefs[nextIndex].current.focus();
      } else if (value === "" && currentIndex > 0) {
        const prevIndex = currentIndex - 1;
        inputRefs[prevIndex].current.focus();
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const joinedOTP = otp.join("");
    // Perform validation or further processing with the joined OTP value
    setCode(joinedOTP);
    console.log("OTP:", joinedOTP);
    // Clear the OTP value after submission
    setOTP(["", "", "", ""]);
    // Move focus back to the first input field
    inputRefs[0].current.focus();
  };

  useEffect(() => {
    const joinedOTP = otp.join("");
    if (joinedOTP.length === 6) {
      setCode(joinedOTP);
      return;
    }
  }, [otp, setCode]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Flex justifyContent="space-around">
          {otp.map((value, index) => (
            <TOPTextFormController
              key={index}
              index={index}
              inputRef={inputRefs[index]}
              value={value}
              onChange={handleInputChange}
            />
          ))}
        </Flex>
      </form>
    </>
  );
};

RecoveryCode.propTypes = {
  setCode: PropTypes.string,
};

export default RecoveryCode;