import { useTable, usePagination } from 'react-table';
import { IoAddCircleOutline } from 'react-icons/io5';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Flex,
  Text,
  Select,
  Skeleton,
  Box,
  Button,
} from '@chakra-ui/react';
import useAuth from '../Hooks/AuthContext';
// import SearchNotFound from './SearchNotFound';
import '../Style/Table.css';
import TableRow from './Table/TableRow';
import TableFooter from './Table/TableFooter';

const CustomTablePaginate = ({
  title,
  columns,
  data,
  fetch,
  SpecializationData,
  hospitalData,
  doctors,
  onOpen,
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

  return (
    <Box>
      <Box w={'inherit'}>
        <Flex
          justifyContent={'space-between'}
          flexDirection={['column', 'column', 'row', 'row']}
        >
          <Text color="rgba(0,0,0,0.7)" fontSize={30} fontWeight={'900'}>
            {title === 'Navigator' ? 'Doctors' : title}
          </Text>
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
                >
                  <IoAddCircleOutline fontSize={20} marginRight="5px" />
                  {title}
                </Button>
              ) : null}
              {child !== null ? child : null}
              <Select
                bg="white"
                w={32}
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
      <Table
        boxShadow={'lg'}
        mt={5}
        variant="unstyled"
        bg="white"
        rounded={15}
        size={'sm'}
        {...getTableProps()}
      >
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th
                  h={'3rem'}
                  color={'gray.600'}
                  fontSize={15}
                  textAlign="center"
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
            <TableRow
              page={page}
              prepareRow={prepareRow}
              pageIndex={pageIndex}
              title={title}
              doctors={doctors}
              hospitalData={hospitalData}
              SpecializationData={SpecializationData}
              data={data}
              fetch={fetch}
            />
          ) : (
            <Tr>
              {columns.map(_ => {
                return (
                  <Td>
                    <Skeleton h="2rem" bg="grey" rounded={5} />
                  </Td>
                );
              })}
            </Tr>
          )}
        </Tbody>
      </Table>
      {page.length >= 1 ? (
        <TableFooter
          canPreviousPage={canPreviousPage}
          previousPage={previousPage}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          nextPage={nextPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
          gotoPage={gotoPage}
        />
      ) : (
        ''
      )}
    </Box>
  );
};

export default CustomTablePaginate;
