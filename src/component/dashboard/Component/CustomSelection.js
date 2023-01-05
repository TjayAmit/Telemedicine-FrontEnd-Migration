import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import api from '../../api/api';
import { Select, FormControl, FormLabel } from '@chakra-ui/react';
import useAuth from '../../context/AuthContext';

const Selection = ({ label, value, setValue, datas, mt }) => {
  return (
    <FormControl mt={mt}>
      <FormLabel fontSize={14}>{label}</FormLabel>
      <Select
        fontSize={14}
        focusBorderColor={'primary.900'}
        placeholder="- Please Select -"
        value={value}
        onChange={e => {
          setValue(e.target.value);
        }}
        required
      >
        {datas.data.map(data => {
          return (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

const SelectionLoading = ({ label, mt }) => {
  return (
    <FormControl mt={mt}>
      <FormLabel fontSize={14}>{label}</FormLabel>
      <Select
        fontSize={14}
        focusBorderColor={'primary.900'}
        placeholder="- Please Select -"
        required
      >
        <option>{'Fetching ' + label}</option>
      </Select>
    </FormControl>
  );
};

const SelectionError = ({ label, mt }) => {
  return (
    <FormControl mt={mt}>
      <FormLabel fontSize={14}>{label}</FormLabel>
      <Select
        fontSize={14}
        focusBorderColor={'primary.900'}
        placeholder={'Failed to fetch ' + label}
        borderColor={'red'}
        required
      >
        <option>{'Failed to fetch ' + label}</option>
      </Select>
    </FormControl>
  );
};

const SpecializationHSelection = ({ value, setValue, mt }) => {
  const title = 'Specialization';

  const { data, isLoading, error } = useQuery(title, () =>
    api.get('api/specializations').then(res => res.data)
  );

  if (isLoading) {
    return <SelectionLoading label={title} mt={mt} />;
  }

  if (error) {
    return <SelectionError label={'Something went wrong!'} mt={mt} />;
  }

  return (
    <Selection
      label={title}
      value={value}
      setValue={setValue}
      datas={data}
      mt={mt}
    />
  );
};

export const CustomSelection = ({ value, setValue, mt }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HospitalSeclection value={value} setValue={setValue} mt={mt} />
    </QueryClientProvider>
  );
};

const HospitalSeclection = ({ value, setValue, mt }) => {
  const title = 'Hospital';

  const { data, isLoading, error } = useQuery(title, () =>
    api.get('api/hospitals').then(res => res.data)
  );

  if (isLoading) {
    return <SelectionLoading label={title} mt={mt} />;
  }

  if (error) {
    return <SelectionError label={'Something went wrong!'} mt={mt} />;
  }

  return (
    <Selection
      label={title}
      value={value}
      setValue={setValue}
      datas={data}
      mt={mt}
    />
  );
};

export const CustomSelectionS = ({ value, setValue, mt }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SpecializationHSelection value={value} setValue={setValue} mt={mt} />
    </QueryClientProvider>
  );
};
