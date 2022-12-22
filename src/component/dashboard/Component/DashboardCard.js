import { useQuery } from 'react-query';
import api from '../../api/api';
import React, { useRef } from 'react';
import { Text, Box, Heading } from '@chakra-ui/react';
import '../../../App.css';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';

const DashboardCard = ({ cardData }) => {
  const { user } = useAuth();
  const count = useRef([]);
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery(cardData.title, () =>
    api.get(cardData.url).then(res => res.data)
  );

  // useEffect(() => {
  //   function animateValue(obj, start, end, duration) {
  //     let startTimestamp = null;
  //     const step = timestamp => {
  //       if (!startTimestamp) startTimestamp = timestamp;
  //       const progress = Math.min((timestamp - startTimestamp) / duration, 1);
  //       obj.innerHTML = Math.floor(progress * (end - start) + start);
  //       if (progress < 1) {
  //         window.requestAnimationFrame(step);
  //       }
  //     };
  //     window.requestAnimationFrame(step);
  //   }
  //   animateValue(count.current, 0, count.current.innerHTML, 1500);
  // }, []);

  if (isLoading)
    return (
      <Box
        p={6}
        borderRadius={5}
        border={'1px'}
        borderColor={'blackAlpha.300'}
        className="cardBox"
        onClick={e => handleSubmit()}
        bg={'white'}
        cursor={'pointer'}
      >
        <Box
          float={'right'}
          p={1}
          fontSize={50}
          bg={cardData.bgColor}
          borderRadius={6}
        >
          <svg
            className="cardIcon"
            stroke="currentColor"
            color={cardData.color}
            fill="currentColor"
            strokeWidth="0"
            viewBox={cardData.viewBox}
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule={cardData.fillRule}
              d={cardData.directory}
              clipRule={cardData.clipRule}
            />
          </svg>
        </Box>

        <Heading fontSize={30} className={'counter'}>
          0
        </Heading>
        <Text fontSize={15} fontWeight="normal" color={'blackAlpha.700'}>
          {cardData.title}
        </Text>
        <Text color={cardData.color} fontSize={15}>
          0
        </Text>
      </Box>
    );

  if (error)
    return (
      <Box
        p={6}
        borderRadius={5}
        border={'1px'}
        borderColor={'blackAlpha.300'}
        className="cardBox"
        onClick={e => handleSubmit()}
        bg={'white'}
        cursor={'pointer'}
      >
        <Box
          float={'right'}
          p={1}
          fontSize={50}
          bg={cardData.bgColor}
          borderRadius={6}
        >
          <svg
            className="cardIcon"
            stroke="currentColor"
            color={cardData.color}
            fill="currentColor"
            strokeWidth="0"
            viewBox={cardData.viewBox}
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule={cardData.fillRule}
              d={cardData.directory}
              clipRule={cardData.clipRule}
            />
          </svg>
        </Box>

        <Heading fontSize={30} className={'counter'}>
          Something went wrong.
        </Heading>
        <Text fontSize={15} fontWeight="normal" color={'blackAlpha.700'}>
          {cardData.title}
        </Text>
        <Text color={cardData.color} fontSize={15}>
          0
        </Text>
      </Box>
    );

  const handleSubmit = e => {
    if (
      user.user_role === 'Super Admin' &&
      cardData.title !== 'Total Patients'
    ) {
      return;
    }

    if (
      (user.user_role === 'Staff' ||
        user.user_role === 'Admin' ||
        user.user_role === 'Internal Doctor') &&
      cardData.title !== 'Total Cases'
    ) {
      return;
    }

    if (
      user.user_role === 'External Doctor' &&
      cardData.title !== 'Total Hospital' &&
      cardData.title !== 'Total Doctors'
    ) {
      return;
    }
    navigate('/h' + cardData.path);
  };

  return (
    <Box
      p={6}
      borderRadius={5}
      border={'1px'}
      borderColor={'blackAlpha.300'}
      className="cardBox"
      onClick={e => handleSubmit()}
      bg={'white'}
      cursor={'pointer'}
    >
      <Box
        float={'right'}
        p={1}
        fontSize={50}
        bg={cardData.bgColor}
        borderRadius={6}
      >
        <svg
          className="cardIcon"
          stroke="currentColor"
          color={cardData.color}
          fill="currentColor"
          strokeWidth="0"
          viewBox={cardData.viewBox}
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule={cardData.fillRule}
            d={cardData.directory}
            clipRule={cardData.clipRule}
          />
        </svg>
      </Box>

      <Heading fontSize={30} ref={count} className={'counter'}>
        {data.data[0].value}
      </Heading>
      <Text fontSize={15} fontWeight="normal" color={'blackAlpha.700'}>
        {cardData.title}
      </Text>
      <Text color={cardData.color} fontSize={15}>
        {cardData.title === 'Total Hospitals'
          ? data.data[0].value - 1
          : data.subdata[0] === undefined
          ? 0
          : data.subdata[0].value}
        {' ' + cardData.description}
      </Text>
    </Box>
  );
};

export default DashboardCard;
