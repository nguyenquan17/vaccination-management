import TextField from "@mui/material/TextField";
import { styled } from '@mui/material/styles';

import AppColor from '../../../styles/AppColor'

const CustomInputCss = styled(TextField)({
  "& label.Mui-focused": {
    color: AppColor().primaryColor,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: AppColor().primaryColor,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: AppColor().primaryColor,
    },
    "&:hover fieldset": {
      borderColor: AppColor().primaryColor,
    },
    "&.Mui-focused fieldset": {
      borderColor: AppColor().primaryColor,
    },
  },
});

export default function CustomInput(props) {
  return (
    <>
      <CustomInputCss {...props} />
    </>
  );
}
