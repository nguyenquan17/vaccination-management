import {useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import {connect} from "react-redux";
import Chip from '@mui/material/Chip';
import {getAllRegistration} from "../../../redux/actions/scheduleInjectionsAction";
import ToolbarSheduleInjections from "./ToolbarSheduleInjections";

const columns = [
    {field: 'id_dangkytiem', headerName: 'ID', width: 100},
    {field: 'id_priority', headerName: 'Độ ưu tiên', width: 150},
    {field: 'email', headerName: 'Email', width: 200},
    {
        field: 'date', headerName: 'Thời gian', width: 150, renderCell: (params) => {
            return new Date(params.row.date * 1000).toISOString().substring(0, 10)
        },
    },
    {
        field: 'is_sick', headerName: 'Tình trạng', width: 150, renderCell: (params) => {
            if(params.row.is_sick){
                return <Chip color="error" label={"Ốm"} variant="outlined"/>
            }else {
                return <Chip color="success" label={"Bình thường"} variant="outlined"/>
            }
        },
    },
    {field: 'note', headerName: 'Ghi chú', width: 200},
    {
        field: 'number_of_times', headerName: 'Mũi thứ', width: 100, renderCell: (params) => {
            return <Chip color="success" label={"Mũi" + params.row.number_of_times} variant="outlined"/>
        },
    },
];

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function ScheduleInjectionsTable(props) {
    let {dataRegistration} = props.dataRegistration

    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState([]);

    // search
    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = dataRegistration.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    const [sortModel, setSortModel] = useState([
        {
            field: 'id_dangkytiem',
            sort: 'asc',
        },
    ]);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        setRows(dataRegistration);
    }, [dataRegistration]);

    /// Call api
    useEffect(() => {
        props.getAllRegistration();
    }, [])


    const [listIdRegistration, setListIdRegistration] = useState([]);
    const onSelectBox = (item) => {
        let newIdRes = item.map(index => {
            return dataRegistration[index].id_dangkytiem
        })
        setListIdRegistration(newIdRes)
    }

    return (
        <div style={{height: 460, width: '100%'}}>
            <DataGrid
                components={{Toolbar: ToolbarSheduleInjections}}
                checkboxSelection
                onSelectionModelChange={onSelectBox}
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
                        listIDRegistration: listIdRegistration
                    },
                }}
            />
        </div>
    );
}

const mapStateToProps = (state) => ({
    dataRegistration: state.scheduleInjectionsReducer
});

const mapDispatchToProps = {
    getAllRegistration
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleInjectionsTable);