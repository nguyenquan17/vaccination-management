import {useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import {connect} from "react-redux";
import Chip from '@mui/material/Chip';
import moment from "moment";
import ToolbarFeedbackUser from "./ToolbarFeedbackUser";
import {feedbackUserAction} from "../../../redux/actions/feedbackUserAction"

const columns = [
    {field: 'id_user', headerName: 'ID User', width: 150},
    {field: 'full_name', headerName: 'Họ và tên', width: 200},
    {field: 'email', headerName: 'Email', width: 200},
    {field: 'phone', headerName: 'Số điện thoại', width: 150},
    {
        field: 'id_vaccine', headerName: 'Vaccine', width: 150, renderCell: (params) => {
            if(params.row.id_vaccine.toString() === "1"){
                return <p>AstraZeneca</p>
            }
            else if(params.row.id_vaccine.toString() === "2"){
                return <p>SPUTNIK V</p>
            }
            else if(params.row.id_vaccine.toString() === "3"){
                return <p>Pfizer</p>
            }
            else if(params.row.id_vaccine.toString() === "4"){
                return <p>Moderna</p>
            }else return <p>Sinopharm</p>
        },
    },
    {
        field: 'inject_date', headerName: 'Ngày tiêm', width: 150, renderCell: (params) => {
            return <p>{moment.unix(params.row.inject_date).format("DD/MM/YYYY")}</p>
        },
    },
    {
        field: 'number_of_times', headerName: 'Mũi thứ', width: 150, renderCell: (params) => {
            return <Chip color="success" label={"Mũi " + params.row.number_inject} variant="outlined"/>
        },
    },
    {field: 'feedback', headerName: 'Phản hồi', width: 300},
];

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function FeedbackUserTable(props) {

    const {dataFeedbackUser} = props.dataTable
    // State
    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState([]);

    console.log(dataFeedbackUser)

    // search
    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = dataFeedbackUser.filter((row) => {
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
        setRows(dataFeedbackUser);
    }, [dataFeedbackUser]);

    useEffect(() => {
        props.feedbackUserAction({
            injectionDate: 0,
            idVaccine: 0,
        });
    }, [])

    return (
        <div style={{height: 700, width: '100%'}}>
            <DataGrid
                components={{Toolbar: ToolbarFeedbackUser}}
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
    dataTable : state.feedbackUserReducer
});

const mapDispatchToProps = {
    feedbackUserAction
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackUserTable);