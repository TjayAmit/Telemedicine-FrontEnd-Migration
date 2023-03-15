import {
  Avatar,
  Badge,
  Box,
  Text,
  Tr,
  Td,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import { PutRequest } from '../../API/api';
import { User } from '../../API/Paths';
import { BiReset } from 'react-icons/bi';
import { MdOutlineMessage } from 'react-icons/md';
import { CustomViewButton } from '../../Components/Modal/CustomViewModal';
import { CustomEditButton, CustomDeleteButton } from '../Modal/ActionModal';
import useAuth from '../../Hooks/AuthContext';

const Actions = ({
  title,
  fetch,
  rawData,
  SpecializationData,
  hospitalData,
  cellvalue,
  row,
  props,
  user,
}) => {
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    PutRequest({ url: `${User}/reset` }, { email: row.email })
      .then(res => res.data)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response', { cause: res });
        }

        console.log('Password Reset.');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      {title === 'Admin Doctor' ? (
        <>
          <IconButton
            className="btn-message"
            fontSize={17}
            fontWeight={'normal'}
            color={'blue.400'}
            onClick={() => handleResetPassword()}
          >
            <BiReset />
          </IconButton>
        </>
      ) : null}
      {title === 'Case' || title === 'Archived Case' ? (
        <>
          <IconButton
            className="btn-message"
            fontSize={17}
            fontWeight={'normal'}
            color={'blue.400'}
            onClick={() => {
              navigate('/case/case-data', {
                state: {
                  data: cellvalue,
                  rawData: props.data.filter(
                    x => x.PK_cases_ID === cellvalue.PK_cases_ID
                  ),
                },
              });
            }}
          >
            <MdOutlineMessage />
          </IconButton>
        </>
      ) : null}

      {title !== 'Archived Case' && user.user_role === 'Internal Doctor' ? (
        <CustomEditButton
          title={title}
          data={cellvalue}
          fetch={fetch}
          rawData={props.data}
          SpecializationData={SpecializationData}
          hospitalData={hospitalData}
          row={row}
        />
      ) : null}
      {title !== 'User' ? (
        <CustomDeleteButton fetch={fetch} title={title} id={[cellvalue]} />
      ) : null}
    </>
  );
};

const TableRow = props => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { user_role } = user;
  const handleClick = (e, data) => {
    e.preventDefault();
    if (props.title.toLowerCase().includes('case')) {
      navigate('/case-view', { state: data });
    }
  };

  return (
    <>
      {props.page.map((row, i) => {
        props.prepareRow(row);
        return (
          <Tr
            onClick={e => handleClick(e, row.original)}
            className="td"
            {...row.getRowProps()}
          >
            {row.cells.map(cell => {
              return (
                <Td textAlign="center" {...cell.getCellProps()}>
                  {cell.column.id === 'action' ? (
                    <Flex columnGap={3}>
                      {props.title === 'Patient' || props.title === 'User' ? (
                        <CustomViewButton
                          title={props.title}
                          data={props.data}
                          id={[cell.row.values]}
                        />
                      ) : (
                        ''
                      )}
                      {props.title === 'Case' ? (
                        user.user_role === 'Super Admin' ||
                        user.user_role === 'Admin' ? (
                          /* Restrict Admin */
                          <>
                            <Actions
                              title={props.title}
                              cellvalue={cell.row.values}
                              fetch={fetch}
                              rawData={props.data}
                              SpecializationData={props.SpecializationData}
                              hospitalData={props.hospitalData}
                              row={row.values}
                              props={props}
                              user={user}
                            />
                          </>
                        ) : (
                          <>
                            <Actions
                              title={props.title}
                              cellvalue={cell.row.values}
                              fetch={fetch}
                              rawData={props.data}
                              SpecializationData={props.SpecializationData}
                              hospitalData={props.hospitalData}
                              row={row.values}
                              props={props}
                              user={user}
                            />
                          </>
                        )
                      ) : (
                        <>
                          <Actions
                            title={props.title}
                            cellvalue={cell.row.values}
                            fetch={fetch}
                            rawData={props.data}
                            SpecializationData={props.SpecializationData}
                            hospitalData={props.hospitalData}
                            row={row.values}
                            props={props}
                            user={user}
                          />
                        </>
                      )}
                    </Flex>
                  ) : cell.column.Header === 'ID' ? (
                    <Box display="flex" columnGap={3}>
                      <Text>{cell.row.values.id}</Text>
                      {!!row.original.notif &&
                      row.original.notif !== 1 &&
                      user_role !== 'External Doctor' ? (
                        <Badge fontSize={10} colorScheme={'green'}>
                          New message
                        </Badge>
                      ) : (
                        ''
                      )}
                    </Box>
                  ) : cell.column.id === 'profile' ? (
                    <>
                      <Avatar
                        size="sm"
                        src={
                          cell.row.values.profile === 'NONE'
                            ? require('../../assets/default_profile.png')
                            : cell.row.values.profile
                        }
                      />
                    </>
                  ) : cell.column.id === 'case_status' ? (
                    <>
                      <Badge
                        variant="subtle"
                        colorScheme={
                          cell.row.values.case_status === 0
                            ? 'red'
                            : cell.row.values.case_status === 1
                            ? 'green'
                            : 'blue'
                        }
                      >
                        {cell.row.values.case_status === 0
                          ? 'Pending'
                          : cell.row.values.case_status !== 1
                          ? 'Done'
                          : 'Active'}
                      </Badge>
                    </>
                  ) : cell.column.id === 'specializations_Title' ? (
                    <Text fontWeight={'bold'}>
                      {cell.row.values.specializations_Title}
                    </Text>
                  ) : cell.column.id === 'created_at' ? (
                    moment(cell.row.values.created_at).format('MMM DD, YYYY')
                  ) : cell.column.id === 'updated_at' ? (
                    moment(cell.row.values.updated_at).format('MMM DD, YYYY')
                  ) : cell.column.id === 'hospital_Name' ? (
                    <Text fontWeight={'bold'} textTransform={'uppercase'}>
                      {cell.row.values.hospital_Name}
                    </Text>
                  ) : cell.column.Header === 'ID' ? (
                    <Text fontWeight={'bold'} color={'green.600'}>
                      {props.pageIndex === 0 ? ++i : (1 + i) * props.pageIndex}s
                    </Text>
                  ) : cell.column.id === 'status' ? (
                    <Text fontWeight={'bold'} color={'green.600'}>
                      {cell.row.values.status === 1
                        ? 'ACTIVE'
                        : cell.row.values.status === 2
                        ? 'DISSABLED'
                        : 'PENDING'}
                    </Text>
                  ) : (
                    cell.render('Cell')
                  )}
                </Td>
              );
            })}
          </Tr>
        );
      })}
    </>
  );
};

export default TableRow;
