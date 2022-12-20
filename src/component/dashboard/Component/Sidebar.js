import { Menu, MenuItem } from 'react-pro-sidebar';
import { Image, Heading, Box, Divider, Text } from '@chakra-ui/react';
import RouteData from '../../Routes/RouteData';
import { useNavigate } from 'react-router-dom';
import '../../Sidebar.css';
import useAuth from '../../context/AuthContext';

const SidebarDividerHeader = ({ data, header, flip }) => {
  return (
    <>
      {flip ? null : (
        <span
          key={data.index}
          style={{
            fontSize: '12px',
            marginLeft: '10%',
            color: '#37c739',
          }}
          id="consult"
        >
          {header}
        </span>
      )}
    </>
  );
};

const CustomSidebar = ({ flip }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = data => {
    navigate('/h' + data.href);
  };

  return (
    <>
      <div
        className="sidebar"
        style={{ width: flip && '75px', display: flip && 'block' }}
      >
        <Menu iconShape="circle" color={'#1d8b10'}>
          <MenuItem
            icon={
              <Image w={8} src={require('../../../assets/zcmc_logo.png')} />
            }
          >
            <Heading size={'md'}>TELEMEDICINE </Heading>
          </MenuItem>
          <Box h={10} p={4}>
            <Divider color={'red'} width={'1px'} />
          </Box>
          {RouteData.path
            .filter(x =>
              user.user_role === 'Super Admin'
                ? x.superadmin === true
                : user.user_role === 'Admin'
                ? x.admin === true
                : user.user_role === 'Internal Doctor'
                ? x.doctor === true
                : x.index !== 9 && user.user_role === 'External Doctor'
                ? x.edoctor === true
                : user.user_role === 'Staff'
                ? x.staff === true
                : null
            )
            .map(data => {
              return (
                <>
                  {data.index === 1 || data.index === 5 || data.index === 9 ? (
                    <SidebarDividerHeader
                      data={data}
                      header={
                        data.index === 1
                          ? 'ANALYTICS'
                          : data.index === 5
                          ? 'CONSULTATION'
                          : 'REPORT'
                      }
                      flip={flip}
                      key={data.index * 2}
                    />
                  ) : null}
                  <MenuItem
                    key={data.index}
                    onClick={() => handleClick(data)}
                    icon={data.icon}
                  >
                    <Text> {data.label}</Text>
                  </MenuItem>
                </>
              );
            })}
        </Menu>
      </div>
    </>
  );
};

export default CustomSidebar;
