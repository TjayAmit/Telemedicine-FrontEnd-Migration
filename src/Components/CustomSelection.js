import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import api from '../API/api';
import { Select, FormControl } from '@chakra-ui/react';
import { Specialization, Hospital } from '../API/Paths';

const Selection = ({ label, value, setValue, datas, mt }) => {
  return (
    <FormControl mt={mt}>
      <Select
        bg="white"
        boxShadow="sm"
        fontSize={14}
        focusBorderColor={'rgba(0, 128, 128, 0.5)'}
        placeholder={`- Please Select ${label} -`}
        value={value}
        onChange={e => setValue(e.target.value)}
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
      <Select
        fontSize={14}
        focusBorderColor={'rgba(0, 128, 128, 0.5)'}
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
      <Select
        fontSize={14}
        focusBorderColor={'rgba(0, 128, 128, 0.5)'}
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
    api.get(`${Specialization}s`).then(res => res.data)
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

export const SelectionSpecialization = ({ value, setValue, mt }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SpecializationHSelection value={value} setValue={setValue} mt={mt} />
    </QueryClientProvider>
  );
};

const HospitalSelection = ({ value, setValue, mt }) => {
  const title = 'Hospital';

  const { data, isLoading, error } = useQuery(title, () =>
    api.get(`${Hospital}s`).then(res => res.data)
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

export const SelectionHospital = ({ value, setValue, mt }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HospitalSelection value={value} setValue={setValue} mt={mt} />
    </QueryClientProvider>
  );
};
