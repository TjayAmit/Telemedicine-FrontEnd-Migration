import { useEffect } from 'react';
import {
  IconButton,
  Box,
  Text,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useState } from 'react';
import { GetRequest } from '../API/api';
import { Case } from '../API/Paths';
import { useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/AuthContext';
import { HiBellAlert, HiOutlineBellAlert } from 'react-icons/hi2';

const MenuItemComponent = ({ data, handleClick }) => {
  return (
    <MenuItem
      w={'20rem'}
      _hover={{ bg: 'white' }}
      value={data.id}
      onClick={e => handleClick(e, data)}
    >
      <Box
        w="300px"
        boxShadow="md"
        p={2}
        rounded={5}
        _hover={{ bg: 'lightgreen' }}
      >
        <Box display="flex" justifyContent={'space-between'}>
          <Heading size="sm">{data.case_number}</Heading>
          <Box
            bg={data.case_status === 0 ? 'grey' : 'green'}
            pl={3}
            pr={3}
            rounded={8}
            boxShadow="sm"
          >
            <Text fontSize={12} fontWeight={600} color="white">
              New
            </Text>
          </Box>
        </Box>
        <Box mt={2}>
          <Text fontSize={12}>{data.patient}</Text>
        </Box>
      </Box>
    </MenuItem>
  );
};

const Notification = () => {
  const navigate = useNavigate();
  const {
    user: { user_role },
  } = useAuth();
  const [msg, setMsg] = useState();
  const [fetch, setFetch] = useState(true);
  const [cases, setCases] = useState([]);
  const [active, setActive] = useState(false);

  const handleClick = (e, data) => {
    e.preventDefault();
    navigate('/case-view', { state: data });
  };

  const handleFetch = () => {
    GetRequest({ url: `${Case}/notification` })
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }
        const {
          data: { data },
        } = res;

        if (data.length === cases.length) {
          return;
        }
        setCases(data);
      })
      .catch(err => {
        switch (err) {
          case 400:
            setMsg("Process can't complete. try again later.");
            break;
          case 401:
            setMsg('Un-Authorized.');
            break;
          case 404:
            setMsg('No record found.');
            break;
          default:
            setMsg("Can't process right now. try again later.");
            break;
        }
      });
  };

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        if (fetch) {
          setFetch(false);
        }
        handleFetch();
      },
      fetch ? 0 : 50000
    );

    return () => clearInterval(intervalId);
  }, [fetch]);

  const filtered = cases.filter(filter =>
    filter.cases_status === 2
      ? null
      : user_role !== 'External Doctor'
      ? filter.info !== 1
      : filter.info === 1
  );

  return (
    <Box>
      <Menu>
        <MenuButton>
          <button>
            <IconButton
              w="30px"
              bg="white"
              size={['sm', 'sm', 'md', 'md']}
              mt={-1}
              rounded={100}
              onClick={e => handleClick(e)}
              icon={
                <Box fontSize={[25, 25, 30, 30]}>
                  {cases.length > 0 ? (
                    <HiBellAlert color={'orange'} />
                  ) : (
                    <HiOutlineBellAlert color={'grey'} />
                  )}
                </Box>
              }
            />
          </button>
        </MenuButton>
        <MenuList maxH={'30vh'} overflow="auto">
          {filtered.map(value => {
            return <MenuItemComponent data={value} handleClick={handleClick} />;
          })}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Notification;
