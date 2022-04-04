import {useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import {connect} from "react-redux";
import Chip from '@mui/material/Chip';
import moment from "moment";
import {getAllScheduleInjections} from "../../../redux/actions/acceptRecordActions";
import QuickSearchToolbar from "./QuickSearchToolBar";

const columns = [
    {field: 'id_dangkytiem', headerName: 'ID', width: 100},
    {field: 'full_name', headerName: 'Họ và tên', width: 200},
    {field: 'email', headerName: 'Email', width: 200},
    {field: 'phone_number', headerName: 'Số điện thoại', width: 150},
    {field: 'identify', headerName: 'CMND', width: 150},
    {
        field: 'number_of_times', headerName: 'Mũi thứ', width: 100, renderCell: (params) => {
            return <Chip color="success" label={"Mũi" + params.row.number_of_times} variant="outlined"/>
        },
    },
    {field: 'name_vaccine', headerName: 'Tên Vaccine', width: 200},
    {
        field: 'date_time', headerName: 'Thời gian tiêm', width: 200, renderCell: (params) => {
            return <p>{moment.unix(params.row.date_time).format("[Ngày] DD [tháng] MM [năm] YYYY")}</p>
        },
    },
];

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function AcceptRecordTable(props) {
    let {dataScheduleInjection} = props.acceptRecordReducer

    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState([]);

    // search
    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = dataScheduleInjection.filter((row) => {
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
        setRows(dataScheduleInjection);
    }, [dataScheduleInjection]);

    /// Call api
    useEffect(() => {
        props.getAllScheduleInjections();
    }, [])


    const [listId, setListId] = useState([]);
    const onSelectBox = (item) => {
        let newIdRes = item.map(index => {
            return dataScheduleInjection[index].id_dangkytiem
        })
        setListId(newIdRes)
    }

    return (
        <div style={{height: 460, width: '100%'}}>
            <DataGrid
                components={{Toolbar: QuickSearchToolbar}}
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
                        listID: listId
                    },
                }}
            />
        </div>
    );
}

const mapStateToProps = (state) => ({
    acceptRecordReducer: state.acceptRecordReducer
});

const mapDispatchToProps = {
    getAllScheduleInjections
};

export default connect(mapStateToProps, mapDispatchToProps)(AcceptRecordTable);