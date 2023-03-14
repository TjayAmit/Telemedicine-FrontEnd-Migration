import { useState } from 'react';
import {
  IconButton,
  Box,
  Center,
  Text,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import useAuth from '../Hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const MenuItemComponent = props => {
  const { data } = props;
  return (
    <MenuItem w={'14rem'} _hover={{ bg: 'white' }}>
      <Box
        w="200px"
        boxShadow="md"
        p={2}
        rounded={5}
        _hover={{ bg: 'lightgreen' }}
      >
        <Box display="flex" justifyContent={'space-between'}>
          <Heading size="sm">{data.id}</Heading>
          <Box
            bg={
              data.status === 1 ? 'grey' : data.status === 3 ? 'red' : 'green'
            }
            pl={3}
            pr={3}
            rounded={8}
            boxShadow="sm"
          >
            <Text fontSize={12} fontWeight={600} color="white">
              {data.status === 1
                ? 'PENDING'
                : data.status === 3
                ? 'DONE'
                : 'ACTIVE'}
            </Text>
          </Box>
        </Box>
        <Box mt={2}>
          <Text fontSize={12}>{data.name}</Text>
        </Box>
      </Box>
    </MenuItem>
  );
};

const dataSample = [
  {
    id: 2551,
    status: 1,
    name: 'Juan Ponce Enrile',
  },
  {
    id: 2552,
    status: 3,
    name: 'Juan Ponce Enrile',
  },
  {
    id: 2553,
    status: 1,
    name: 'Juan Ponce Enrile',
  },
  {
    id: 2554,
    status: 2,
    name: 'Juan Ponce Enrile',
  },
];

const Notification = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const { cases } = useAuth();

  const handleClick = e => {
    e.preventDefault();
    setActive(!active);
  };

  return (
    <Box>
      <Menu>
        <MenuButton>
          <button>
            <IconButton
              w={30}
              size={['sm', 'sm', 'md', 'md']}
              mt={-1}
              rounded={100}
              onClick={e => handleClick(e)}
              icon={
                <Box
                  color={active ? 'red' : 'grey'}
                  fontSize={[24, 24, 29, 29]}
                >
                  {active ? <AiFillHeart /> : <AiOutlineHeart />}
                </Box>
              }
            />
          </button>
        </MenuButton>
        <MenuList maxH={'30vh'} overflow="auto">
          {dataSample.map(value => {
            return <MenuItemComponent data={value} />;
          })}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Notification;
