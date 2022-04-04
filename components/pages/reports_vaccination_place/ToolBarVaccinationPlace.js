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
import {reportsDataVaccinationPlaceAction} from "../../../redux/actions/reportsVaccinationPlaceAction";
import {
    GridToolbarContainer,
    GridToolbarExport,
    gridClasses,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarColumnsButton
} from '@mui/x-data-grid';
import XLSX from 'xlsx'
import Button from "@mui/material/Button";
import moment from "moment";

function ToolbarReportsVaccinationPlace(props) {

    const {dataVaccines} = props.dataVaccines

    const {dataReportsVaccinationPlace} = props.dataTable

    useEffect(() => {
        props.getDataVaccines()
    }, [])

    const [filterReports, setFilterReports] = useState({
        dateFrom: new Date('2018-01-01'),
        dateTo: new Date(),
        status: 0,
        numberOfTime: 0,
        idVaccine: 0,
        ageFrom: 0,
        ageTo: 200,
    })

    const downloadExcel = () => {
        let dataExport = dataReportsVaccinationPlace.map(item => {
            return {
                ...item,
                date: moment.unix(item.date).format("DD/MM/YYYY"),
                dob: moment.unix(item.dob).format("DD/MM/YYYY"),
                status: item.status.toString() === "1" ? "Chưa tiêm": "Đã tiêm",
                number_of_times: "Mũi thứ" + item.number_of_times.toString()
            }
        })
        const workSheet = XLSX.utils.json_to_sheet(dataExport)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, "vaccination_place")
        //Buffer
        let buf = XLSX.write(workBook, {bookType: "xlsx", type: "buffer"})
        //Binary string
        XLSX.write(workBook, {bookType: "xlsx", type: "binary"})
        //Download
        XLSX.writeFile(workBook, "StudentsData.xlsx")
    }

    const showVaccine = () => {
        return (
            <TextField
                className="min-w-full xl:w-full"
                id="outlined-select-currency"
                select
                onChange={(event) => {
                    setFilterReports({...filterReports, idVaccine: parseInt(event.target.value)});
                    props.reportsDataVaccinationPlaceAction({
                        ...filterReports,
                        idVaccine: parseInt(event.target.value),
                    })
                }}
                value={filterReports.idVaccine}
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
                <div className="my-5">
                    <Button variant="text" onClick={downloadExcel}> <i className="fas fa-download mr-2"/> Xuất file
                        Excel</Button>
                </div>
                <GridToolbarContainer className={gridClasses.toolbarContainer}>
                    <GridToolbarExport />
                </GridToolbarContainer>
            </div>
            <div className="flex">
                <div className="mx-5">
                    <div className="my-4">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <p className="mb-2">Từ ngày</p>
                            <DesktopDatePicker
                                value={filterReports.dateFrom}
                                minDate={new Date('2017-01-01')}
                                onChange={(newValue) => {
                                    setFilterReports({...filterReports, dateFrom: newValue})
                                    props.reportsDataVaccinationPlaceAction({...filterReports, dateFrom: newValue})
                                }}
                                renderInput={(params) => <TextField className="w-full" {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="my-4">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <p className="mb-2">Đến ngày</p>
                            <DesktopDatePicker
                                value={filterReports.dateTo}
                                minDate={new Date('2017-01-01')}
                                onChange={(newValue) => {
                                    setFilterReports({...filterReports, dateTo: newValue})
                                    props.reportsDataVaccinationPlaceAction({...filterReports, dateTo: newValue})
                                }}
                                renderInput={(params) => <TextField className="w-full" {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div className="mx-5">
                    <div className="my-4">
                        <p className="mb-2">Độ tuổi từ</p>
                        <TextField
                            className="min-w-full xl:w-full"
                            id="outlined-select-currency"
                            type="number"
                            onChange={(event) => {
                                if (event.target.value && event.target.value > 0) {
                                    setFilterReports({...filterReports, ageFrom: parseInt(event.target.value)})
                                    props.reportsDataVaccinationPlaceAction({
                                        ...filterReports,
                                        ageFrom: parseInt(event.target.value)
                                    })
                                } else {
                                    setFilterReports({...filterReports, ageFrom: ""})
                                }
                            }}
                            value={filterReports.ageFrom}
                            label="Tuổi bắt đầu"
                        >
                        </TextField>
                    </div>
                    <div className="my-4">
                        <p className="mb-2">Đến tuổi</p>
                        <TextField
                            className="min-w-full xl:w-full"
                            id="outlined-select-currency"
                            type="number"
                            onChange={(event) => {
                                if (event.target.value && event.target.value > 0) {
                                    setFilterReports({...filterReports, ageTo: parseInt(event.target.value)})
                                    props.reportsDataVaccinationPlaceAction({
                                        ...filterReports,
                                        ageTo: parseInt(event.target.value)
                                    })
                                } else {
                                    setFilterReports({...filterReports, ageTo: ""})
                                }
                            }}
                            value={filterReports.ageTo}
                            label="Đến tuổi"
                        >
                        </TextField>
                    </div>
                </div>
                <div className="mx-5">
                    <div className="my-4">
                        <p className="mb-2">Loại Vacxin</p>
                        {showVaccine()}
                    </div>
                    <div className="my-4">
                        <p className="mb-2">Mũi thứ</p>
                        <TextField
                            className="min-w-full xl:w-full"
                            id="outlined-select-currency"
                            type="number"
                            onChange={(event) => {
                                if (event.target.value && event.target.value > 0) {
                                    setFilterReports({...filterReports, numberOfTime: parseInt(event.target.value)})
                                    props.reportsDataVaccinationPlaceAction({
                                        ...filterReports,
                                        numberOfTime: parseInt(event.target.value)
                                    })
                                } else {
                                    setFilterReports({...filterReports, numberOfTime: ""})
                                }
                            }}
                            value={filterReports.numberOfTime}
                            label="Mũi thứ"
                        >
                        </TextField>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    dataVaccines: state.vaccinesReducer,
    dataTable: state.reportsVaccinationPlaceReducer
});

const mapDispatchToProps = {
    getDataVaccines,
    reportsDataVaccinationPlaceAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarReportsVaccinationPlace);

ToolbarReportsVaccinationPlace.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};