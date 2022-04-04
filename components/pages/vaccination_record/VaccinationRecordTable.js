import {useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import {connect} from "react-redux";
import Chip from '@mui/material/Chip';
import moment from "moment";
import ToolbarVaccinationRecord from "./ToolbarVaccinationRecord";
import {getAllVaccinationRecord} from "../../../redux/actions/vaccinationRecordAction";
import UpdateVaccinationRecord from "./UpdateVaccinationRecord";

const columns = [
    {field: 'id_user', headerName: 'ID', width: 100},
    {field: 'fullname_user', headerName: 'Họ và tên', width: 200},
    {field: 'email', headerName: 'Email', width: 200},
    {field: 'indentify', headerName: 'CMND', width: 150},
    {
        field: 'number_of_times', headerName: 'Mũi thứ', width: 100, renderCell: (params) => {
            return <Chip color="success" label={"Mũi" + params.row.number_of_times} variant="outlined"/>
        },
    },
    {field: 'name_vaccine', headerName: 'Tên Vaccine', width: 200},
    {
        field: 'date', headerName: 'Thời gian tiêm', width: 200, renderCell: (params) => {
            return <p>{moment.unix(params.row.date).format("[Ngày] DD [tháng] MM [năm] YYYY")}</p>
        },
    },
    {
        field: 'blood_pressure', headerName: 'Huyết áp', width: 150, renderCell: (params) => {
            if(params.row.blood_pressure.toString() === "0"){
                return <Chip color="error" label="Chưa cập nhật" variant="outlined"/>
            }
            return <Chip color="success" label={params.row.blood_pressure} variant="outlined"/>
        },
    },
    {
        field: 'level_response', headerName: 'Độ phản hồi', width: 150, renderCell: (params) => {
            if(params.row.blood_pressure.toString() === "0"){
                return <Chip color="error" label="Chưa cập nhật" variant="outlined"/>
            }
            return <Chip color="success" label={params.row.level_response} variant="outlined"/>
        },
    },
    {
        field: 'heart_rate', headerName: 'Nhịp tim', width: 150, renderCell: (params) => {
            if(params.row.blood_pressure.toString() === "0"){
                return <Chip color="error" label="Chưa cập nhật" variant="outlined"/>
            }
            return <Chip color="success" label={params.row.heart_rate} variant="outlined"/>
        },
    },
    {field: 'note', headerName: 'Chú thích', width: 200},
    {
        field: 'editer',
        headerName: 'Chỉnh sửa',
        width: 100,
        renderCell: (params) => {
            const dataRow = {
                idUser: params.row.id_user,
                fullNameUser: params.row.fullname_user,
                email: params.row.email,
                indentify: params.row.indentify,
                idVaccine: params.row.id_vaccine,
                nameVaccine: params.row.name_vaccine,
                date: params.row.date,
                numberOfTimes: params.row.number_of_times,
                idVaccinationRecordsDetail: params.row.id_vaccination_records_detail,
                bloodPressure: params.row.blood_pressure,
                levelResponse: params.row.level_response,
                heartRate: params.row.heart_rate,
                note: params.row.note,
            }
            return (
                <>
                    <UpdateVaccinationRecord {...dataRow} />
                </>
            )
        },
    },
];

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function VaccinationRecordTable(props) {
    let {dataVaccinationRecord} = props.vaccinationRecordReducer

    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState([]);

    // search
    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = dataVaccinationRecord.filter((row) => {
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
        setRows(dataVaccinationRecord);
    }, [dataVaccinationRecord]);

    /// Call api
    useEffect(() => {
        props.getAllVaccinationRecord();
    }, [])


    return (
        <div style={{height: 460, width: '100%'}}>
            <DataGrid
                components={{Toolbar: ToolbarVaccinationRecord}}
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
    vaccinationRecordReducer: state.vaccinationRecordReducer
});

const mapDispatchToProps = {
    getAllVaccinationRecord
};

export default connect(mapStateToProps, mapDispatchToProps)(VaccinationRecordTable);