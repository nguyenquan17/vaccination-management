import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import AppColor from '../../../styles/AppColor'

const CustomSelectBoxCss = styled(Select)({
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

export default function CustomSelectBox(props) {
    return (
        <>
            <CustomSelectBoxCss {...props} />
        </>
    );
}
