import { Input, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import moment from 'moment';
import { useToast } from '@chakra-ui/react';
import { toastposition, toastvariant } from '../Pages/Packages';

const TextFormController = ({
  title,
  value,
  setValue,
  isRequired,
  textArea,
  compare,
  isType,
  DateOnly,
  max,
  setexist,
  isDisabled,
}) => {
  const toast = useToast();
  return (
    <FormControl>
      <FormLabel fontSize={14}>{title}</FormLabel>
      {textArea == true ? (
        <Textarea
          placeholder=""
          border={'1px solid'}
          type={'Text'}
          value={value}
          onChange={e => setValue(e.target.value)}
          focusBorderColor={'gray.400'}
          fontWeight={'normal'}
          fontSize={'14px'}
          bg={'gray.100'}
          disabled={isDisabled}
          required={isRequired}
        />
      ) : (
        <Input
          border={'1px solid'}
          focusBorderColor={'gray.400'}
          fontWeight={'normal'}
          fontSize={'14px'}
          className="textArea"
          disabled={isDisabled}
          type={
            !title.toLowerCase().includes('date')
              ? 'Text'
              : DateOnly
              ? 'date'
              : 'datetime-local'
          }
          value={value}
          onChange={e => {
            if (!title.toLowerCase().includes('date')) {
              const currentvalue = e.target.value;
              setValue(currentvalue);
              try {
                if (setexist != null) {
                  setexist(false);
                }
              } catch (e) {
                console.log(e);
              }
            } else {
              const InputDate = moment(e.target.value).format('YYYY-MM-DD');
              const Comparison = moment(compare).format('YYYY-MM-DD');
              const Datenow = moment().format('YYYY-MM-DD');
              if (isType == 'fromdate') {
                if (InputDate >= Comparison) {
                  toast({
                    title: 'Invalid Date!',
                    position: toastposition,
                    variant: toastvariant,
                    status: 'error',
                    isClosable: true,
                  });
                  setValue('');
                } else {
                  setValue(e.target.value);
                }
              } else if (isType == 'todate') {
                console.log(InputDate + ' ' + Comparison);

                if (InputDate <= Comparison) {
                  toast({
                    title: 'Should be greater than the from date',
                    position: toastposition,
                    variant: toastvariant,
                    status: 'error',
                    isClosable: true,
                  });
                  setValue('');
                } else if (InputDate > Datenow) {
                  toast({
                    title: 'Invalid Date!',
                    position: toastposition,
                    variant: toastvariant,
                    status: 'error',
                    isClosable: true,
                  });
                  setValue('');
                } else {
                  setValue(e.target.value);
                }
              } else if (isType == 'birthday') {
                if (InputDate > Datenow) {
                  toast({
                    title: 'Invalid Date!',
                    position: toastposition,
                    variant: toastvariant,
                    status: 'error',
                    isClosable: true,
                  });
                  setValue('');
                } else {
                  setValue(e.target.value);
                }
              }
            }
          }}
          borderColor={'gray.300'}
          bg={'gray.100'}
          required={isRequired}
        />
      )}
    </FormControl>
  );
};

export default TextFormController;
