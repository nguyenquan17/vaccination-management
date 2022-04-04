import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from '@mui/material/TextField';
import CSS from "../vaccine/VCMNCSS.module.scss";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import {getDataVaccines} from "../../../redux/actions/vaccinesAction";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {feedbackUserAction} from "../../../redux/actions/feedbackUserAction"

function ToolbarFeedbackUser(props) {

    const {dataVaccines} = props.dataVaccines

    useEffect(() => {
        props.getDataVaccines()
    }, [])

    const [filterFeedbacks, setFilterFeedbacks] = useState({
        injectionDate: 0,
        idVaccine: 0,
    })



    const showVaccine = () => {
        return (
            <TextField
                className="min-w-full xl:w-full"
                id="outlined-select-currency"
                select
                onChange={(event) => {
                    setFilterFeedbacks({...filterFeedbacks, idVaccine: parseInt(event.target.value)});
                    props.feedbackUserAction({
                        ...filterFeedbacks,
                        idVaccine: parseInt(event.target.value),
                    })
                }}
                value={filterFeedbacks.idVaccine}
            >
                <MenuItem key={-1} value={0}>
                    Tất cả
                </MenuItem>
                {dataVaccines.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                        {item.Name}
                    </MenuItem>
                ))}
            </TextField>
        )
    }

    return (
        <div className={CSS.headerTableData}>
            <div className="flex flex-col">
                <TextField
                    variant="standard"
                    value={props.value}
                    onChange={props.onChange}
                    placeholder="Tìm kiếm…"
                    className="my-4 mx-1"
                    InputProps={{
                        startAdornment: <SearchIcon fontSize="small"/>,
                        endAdornment: (
                            <IconButton
                                title="Clear"
                                aria-label="Clear"
                                size="small"
                                style={{visibility: props.value ? 'visible' : 'hidden'}}
                                onClick={props.clearSearch}
                            >
                                <ClearIcon fontSize="small"/>
                            </IconButton>
                        ),
                    }}
                />

            </div>
            <div className="flex">
                <div className="mx-5">
                    <div className="my-4">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <p className="mb-2">Ngày tiêm</p>
                            <DesktopDatePicker
                                value={filterFeedbacks.injectionDate === 0 ? new Date() :filterFeedbacks.injectionDate }
                                minDate={new Date('2017-01-01')}
                                onChange={(newValue) => {
                                    setFilterFeedbacks({...filterFeedbacks, injectionDate: newValue})
                                    props.feedbackUserAction({...filterFeedbacks, injectionDate: newValue})
                                }}
                                renderInput={(params) => <TextField className="w-full" {...params} />}
                            />
                        </LocalizationProvider>
                    </div>

                </div>

                <div className="mx-5">
                    <div className="my-4">
                        <p className="mb-2">Loại Vacxin</p>
                        {showVaccine()}
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    dataVaccines: state.vaccinesReducer,
});

const mapDispatchToProps = {
    getDataVaccines,
    feedbackUserAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarFeedbackUser);

ToolbarFeedbackUser.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};