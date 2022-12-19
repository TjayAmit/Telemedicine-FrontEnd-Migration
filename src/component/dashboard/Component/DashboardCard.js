import React, { useRef, useEffect } from 'react';
import { Text, Box, Heading } from '@chakra-ui/react';
import '../../../App.css';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';

const DashboardCard = ({ data, value }) => {
  const { user } = useAuth();
  const count = useRef([]);
  const navigate = useNavigate();

  const handleSubmit = e => {
    if (user.user_role === 'Super Admin') {
      return;
    }
    navigate('/h' + data.path);
  };

  useEffect(() => {
    function animateValue(obj, start, end, duration) {
      let startTimestamp = null;
      const step = timestamp => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
    animateValue(count.current, 0, count.current.innerHTML, 1500);
  }, []);

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
        bg={data.bgColor}
        borderRadius={6}
      >
        <svg
          className="cardIcon"
          stroke="currentColor"
          color={data.color}
          fill="currentColor"
          strokeWidth="0"
          viewBox={data.viewBox}
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule={data.fillRule}
            d={data.directory}
            clipRule={data.clipRule}
          />
        </svg>
      </Box>

      <Heading fontSize={30} ref={count} className={'counter'}>
        {value.value}
      </Heading>
      <Text fontSize={15} fontWeight="normal" color={'blackAlpha.700'}>
        {data.title}
      </Text>
      <Text color={data.color} fontSize={15}>
        {data.title === 'Total Hospitals'
          ? value.subValue === undefined
            ? 0
            : value.subValue - 1
          : value.subValue === undefined
          ? 0
          : value.subValue}
        {' ' + data.description}
      </Text>
    </Box>
  );
};

export default DashboardCard;
