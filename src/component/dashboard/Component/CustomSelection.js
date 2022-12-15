import { Select, FormControl, FormLabel } from "@chakra-ui/react";
import useAuth from "../../context/AuthContext";

const Selection = ({ label, value, setValue, datas, mt }) => {
  return (
    <FormControl mt={mt}>
      <FormLabel fontSize={14}>{label}</FormLabel>
      <Select
        fontSize={14}
        // focusBorderColor={"red.400"}
        placeholder="- Please Select -"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        required
        value={value}
      >
        {datas.map((data) => {
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

export const CustomSelection = ({ title, value, setValue, mt }) => {
  const { hospitals, specializations } = useAuth();

  return (
    <Selection
      label={title}
      value={value}
      setValue={setValue}
      datas={title === "Hospital" ? hospitals : specializations}
      mt={mt}
    />
  );
};

export default CustomSelection;
