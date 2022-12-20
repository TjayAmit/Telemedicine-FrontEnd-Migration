import { useTable, usePagination } from 'react-table';
import { IoAddCircleOutline } from 'react-icons/io5';
import {
  Avatar,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Select,
  Box,
  Badge,
  Button,
} from '@chakra-ui/react';
import useAuth from '../../context/AuthContext';
import Searchfield from '../Component/Searchfield';
import { MdOutlineMessage } from 'react-icons/md';

import SearchNotFound from './SearchNotFound';

import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@chakra-ui/icons';

import {
  CustomViewButton,
  CustomEditButton,
  CustomDeleteButton,
} from '../Packages';

import '../../../Table.css';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';

const CustomTablePaginate = ({
  title,
  columns,
  data,
  fetch,
  SpecializationData,
  hospitalData,
  doctors,
  onOpen,
  search,
  setSearch,
  handleClick,
  isModal,
  child,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );
  const { user } = useAuth();

  const Actions = ({
    title,
    fetch,
    rawData,
    SpecializationData,
    hospitalData,
    cellvalue,
    row,
  }) => {
    const navigate = useNavigate();

    return (
      <>
        {title == 'Case' || title == 'Archived Case' ? (
          <>
            <IconButton
              className="btn-message"
              fontSize={17}
              fontWeight={'normal'}
              color={'blue.400'}
              onClick={() => {
                navigate('/h/case/case-data', {
                  state: {
                    data: cellvalue,
                    rawData: data.filter(
                      x => x.PK_cases_ID == cellvalue.PK_cases_ID
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
            rawData={data}
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

  const CustomBtnTheme = {
    backgroundColor: '#9AE6B4',
    borderRadius: '52px',
    fontSize: '20px',
  };

  let i = pageIndex * 10;

  return (
    <>
      <Box w={'100%'}>
        <Flex
          justifyContent={'space-between'}
          flexDirection={['column', 'column', 'row', 'row']}
        >
          <Searchfield
            search={search}
            placeholder={`Search ${title}`}
            currsearch={setSearch}
          />
          <Box>
            <Flex columnGap={3} justifyContent={'end'}>
              {(user.user_role === 'External Doctor' && title === 'Case') ||
              (title !== 'Archived Case' && title !== 'Case') ? (
                <Button
                  size={'sm'}
                  fontSize={14}
                  bg={'#1CB45D'}
                  colorScheme={'green'}
                  color={'white'}
                  variant={'solid'}
                  fontWeight={'normal'}
                  className={''}
                  onClick={isModal ? onOpen : handleClick}
                  columnGap={2}
                  mt={5}
                >
                  <IoAddCircleOutline fontSize={20} marginRight="5px" />
                  {title}
                </Button>
              ) : null}
              {child !== null ? child : null}
              <Select
                w={32}
                mt={5}
                size={'sm'}
                value={pageSize}
                focusBorderColor={'gray.400'}
                borderRadius={5}
                onChange={e => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option fontSize={14} key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </Select>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <div className="table-responsive">
        <Table
          mt={5}
          className={'table'}
          variant="unstyled"
          {...getTableProps()}
        >
          <Thead className="">
            {headerGroups.map(headerGroup => (
              <Tr fontSize={13} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th
                    bg={'green.100'}
                    color={'gray.600'}
                    fontSize={14}
                    {...column.getHeaderProps()}
                  >
                    {column.render('Header')}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.length >= 1 ? (
              page.map(row => {
                prepareRow(row);
                i++;
                return (
                  <Tr className="td" {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <Td {...cell.getCellProps()}>
                          {cell.column.id === 'action' ? (
                            <Flex columnGap={3}>
                              {title === 'Patient' || title === 'User' ? (
                                <CustomViewButton
                                  title={title}
                                  data={data}
                                  id={[cell.row.values]}
                                />
                              ) : (
                                ''
                              )}
                              {title === 'Case' ? (
                                user.user_role === 'Super Admin' ||
                                user.user_role === 'Admin' ? (
                                  /* Restrict Admin */
                                  <>
                                    <Actions
                                      title={title}
                                      cellvalue={cell.row.values}
                                      fetch={fetch}
                                      rawData={data}
                                      SpecializationData={SpecializationData}
                                      hospitalData={hospitalData}
                                      row={row.values}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <Actions
                                      title={title}
                                      cellvalue={cell.row.values}
                                      fetch={fetch}
                                      rawData={data}
                                      SpecializationData={SpecializationData}
                                      hospitalData={hospitalData}
                                      row={row.values}
                                    />
                                  </>
                                )
                              ) : (
                                <>
                                  <Actions
                                    title={title}
                                    cellvalue={cell.row.values}
                                    fetch={fetch}
                                    rawData={data}
                                    SpecializationData={SpecializationData}
                                    hospitalData={hospitalData}
                                    row={row.values}
                                  />
                                </>
                              )}
                            </Flex>
                          ) : cell.column.id === 'profile' ? (
                            <>
                              <Avatar
                                src={
                                  cell.row.values.profile === 'NONE'
                                    ? require('../../../assets/default_profile.png')
                                    : cell.row.values.profile
                                }
                              />
                            </>
                          ) : cell.column.id === 'cases_status' ? (
                            <>
                              <Badge
                                variant="subtle"
                                colorScheme={
                                  cell.row.values.cases_status == 0
                                    ? 'red'
                                    : cell.row.values.cases_status == 1
                                    ? 'green'
                                    : 'blue'
                                }
                              >
                                {cell.row.values.cases_status == 0
                                  ? 'Pending'
                                  : cell.row.values.cases_status == 1
                                  ? 'Active'
                                  : 'Done'}
                              </Badge>
                            </>
                          ) : cell.column.id === 'specializations_Title' ? (
                            <Text fontWeight={'bold'} color={'green.600'}>
                              {cell.row.values.specializations_Title}
                            </Text>
                          ) : cell.column.id === 'created_at' ? (
                            moment(cell.row.values.created_at).format(
                              'hh:mm a MM-DD-YYYY'
                            )
                          ) : cell.column.id === 'updated_at' ? (
                            moment(cell.row.values.updated_at).format(
                              'hh:mm a MM-DD-YYYY'
                            )
                          ) : cell.column.id === 'hospital_Name' ? (
                            <Text
                              fontWeight={'bold'}
                              textTransform={'uppercase'}
                              color={'green.600'}
                            >
                              {cell.row.values.hospital_Name}
                            </Text>
                          ) : cell.column.Header === 'ID' ? (
                            <Text fontWeight={'bold'} color={'green.600'}>
                              {i}
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
                                doctors.filter(
                                  x =>
                                    x.FK_specializations_ID ==
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
              })
            ) : (
              <SearchNotFound />
            )}
          </Tbody>
        </Table>
      </div>

      {page.length >= 1 ? (
        <Flex justifyContent={'end'} mt={5}>
          <div id="btnleft">
            <Tooltip label="First Page">
              <IconButton
                style={CustomBtnTheme}
                onClick={() => gotoPage(0)}
                isDisabled={!canPreviousPage}
                icon={<ArrowLeftIcon h={3} w={3} />}
                mr={4}
              />
            </Tooltip>
            <Tooltip label="Previous Page">
              <IconButton
                style={CustomBtnTheme}
                className="paginationbtn"
                onClick={previousPage}
                isDisabled={!canPreviousPage}
                icon={<ChevronLeftIcon h={6} w={6} />}
              />
            </Tooltip>
          </div>

          <Box bg={'white.200'} p={2} borderRadius={5}>
            <Flex>
              <Box fontSize={13}>Page</Box>
              <Text fontWeight="bold" fontSize={13} ml={2} as="span">
                {pageIndex + 1}
              </Text>
              <Box ml={2} fontSize={13} w={'2rem'}>
                of
              </Box>

              <Text fontSize={13} fontWeight="bold" as="span">
                {pageOptions.length}
              </Text>
            </Flex>
          </Box>

          <div id="btnright">
            <Tooltip label="Next Page">
              <IconButton
                style={CustomBtnTheme}
                className="paginationbtn"
                onClick={nextPage}
                isDisabled={!canNextPage}
                icon={<ChevronRightIcon h={6} w={6} />}
              />
            </Tooltip>
            <Tooltip label="Last Page">
              <IconButton
                style={CustomBtnTheme}
                className="paginationbtn"
                onClick={() => gotoPage(pageCount - 1)}
                isDisabled={!canNextPage}
                icon={<ArrowRightIcon h={3} w={3} />}
                ml={4}
              />
            </Tooltip>
          </div>
        </Flex>
      ) : (
        ''
      )}
    </>
  );
};

export default CustomTablePaginate;
