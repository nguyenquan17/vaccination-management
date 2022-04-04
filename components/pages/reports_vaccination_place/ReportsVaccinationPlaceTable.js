import {useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import {connect} from "react-redux";
import Chip from '@mui/material/Chip';
import moment from "moment";
import ToolbarReportsVaccinationPlace from "./ToolBarVaccinationPlace";
import {reportsDataVaccinationPlaceAction} from "../../../redux/actions/reportsVaccinationPlaceAction"

const columns = [
    {field: 'id_user', headerName: 'ID User', width: 100},
    {field: 'name_user', headerName: 'Họ và tên', width: 200},
    {field: 'email', headerName: 'Email', width: 200},
    {field: 'indentify', headerName: 'CMND', width: 150},
    {field: 'phone_number', headerName: 'Số điện thoại', width: 150},
    {
        field: 'dob', headerName: 'Ngày sinh', width: 150, renderCell: (params) => {
            return <p>{moment.unix(params.row.dob).format("DD/MM/YYYY")}</p>
        },
    },
    {
        field: 'status', headerName: 'Trạng thái', width: 150, renderCell: (params) => {
            if(params.row.status.toString() === "1"){
                return <Chip color="error" label="Chưa tiêm" variant="outlined"/>
            }
            return <Chip color="success" label="Đã tiêm" variant="outlined"/>
        },
    },
    {
        field: 'date', headerName: 'Ngày tiêm', width: 150, renderCell: (params) => {
            return <p>{moment.unix(params.row.date).format("DD/MM/YYYY")}</p>
        },
    },
    {field: 'name_vaccine', headerName: 'Vacxin', width: 150},
    {
        field: 'number_of_times', headerName: 'Mũi thứ', width: 150, renderCell: (params) => {
            return <Chip color="success" label={"Mũi " + params.row.number_of_times} variant="outlined"/>
        },
    },
];

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function ReportsVaccinationPlaceTable(props) {

    const {dataReportsVaccinationPlace} = props.dataTable

    // State
    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState([]);

    // search
    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = dataReportsVaccinationPlace.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    const [sortModel, setSortModel] = useState([
        {
            field: 'id_user',
            sort: 'asc',
        },
    ]);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        setRows(dataReportsVaccinationPlace);
    }, [dataReportsVaccinationPlace]);

    useEffect(() => {
        props.reportsDataVaccinationPlaceAction({
            dateFrom: new Date('2018-01-01'),
            dateTo: new Date(),
            status: 0,
            numberOfTime: 0,
            idVaccine: 0,
            ageFrom: 0,
            ageTo: 200,
        });
    }, [])

    return (
        <div style={{height: 700, width: '100%'}}>
            <DataGrid
                components={{Toolbar: ToolbarReportsVaccinationPlace}}
                rows={rows}
                columns={columns}
                sortModel={sortModel}
                onSortModelChange={(model) => setSortModel(model)}
                rowsPerPageOptions={[5, 10, 20, 30]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                componentsProps={{
                    toolbar: {
                        value: searchText,
                        onChange: (event) => requestSearch(event.target.value),
                        clearSearch: () => requestSearch(''),
                    },
                }}
            />
        </div>
    );
}

const mapStateToProps = (state) => ({
    dataTable : state.reportsVaccinationPlaceReducer
});

const mapDispatchToProps = {
    reportsDataVaccinationPlaceAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsVaccinationPlaceTable);