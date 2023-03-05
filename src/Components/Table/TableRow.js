import {
  Avatar,
  Badge,
  Text,
  Tr,
  Td,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import { UserResetPassword } from '../../API/User_Request';
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
}) => {
  const navigate = useNavigate();
  const handleResetPassword = async () => {
    UserResetPassword({ email: row.email });
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

      {title !== 'Archived Case' ? (
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
                          />
                        </>
                      )}
                    </Flex>
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
                  ) : cell.column.id === 'cases_status' ? (
                    <>
                      <Badge
                        variant="subtle"
                        colorScheme={
                          cell.row.values.cases_status === 0
                            ? 'red'
                            : cell.row.values.cases_status === 1
                            ? 'green'
                            : 'blue'
                        }
                      >
                        {cell.row.values.cases_status === 0
                          ? 'Pending'
                          : cell.row.values.cases_status === 1
                          ? 'Active'
                          : 'Done'}
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
                      {props.pageIndex === 0 ? ++i : (1 + i) * props.pageIndex}
                    </Text>
                  ) : cell.column.Header === 'STATUS' ? (
                    <Text fontWeight={'bold'} color={'green.600'}>
                      {cell.row.values.status === 1
                        ? 'ACTIVE'
                        : cell.row.values.status === 2
                        ? 'DISSABLED'
                        : 'PENDING'}
                    </Text>
                  ) : cell.column.Header === 'DOCTORS' ? (
                    <>
                      {
                        props.doctors.filter(
                          x =>
                            x.FK_specializations_ID ===
                            cell.row.values.PK_specializations_ID
                        ).length
                      }
                    </>
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
