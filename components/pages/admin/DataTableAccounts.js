import {useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import {connect} from "react-redux";
import Chip from '@mui/material/Chip';

import {getDataAccounts} from '../../../redux/actions/adminAction'
import ToolbarAdmin from './ToolbarAdmin'
import DeleteAccount from "./DeleteAccount";

const columns = [
    {field: 'id_account', headerName: 'ID', width: 100},
    {field: 'username', headerName: 'Username', width: 250},
    {
        field: 'role', headerName: 'Chức vụ', width: 200, renderCell: (params) => {
            switch (params.row.id_role) {
                case 1:
                    return "Admin"
                case 2:
                    return "Quản lý"
                case 3:
                    return "Quản lý điểm tiêm"
                case 4:
                    return "Tổ chức"
                default:
                    return "Người dân"
            }
        },
    },
    {
        field: 'active_acc', headerName: 'Trạng thái', width: 150, renderCell: (params) => {
            if (params.row.active_acc) {
                return <Chip color="success" label={"Active"} variant="outlined"/>
            }
            else {
                return <Chip color="error" label={"Off"} variant="outlined"/>
            }
        },
    },
    {
        field: 'editer',
        headerName: 'Chỉnh sửa',
        width: 160,
        renderCell: (params) => {
            const dataRow = {
                id_account: params.row.id_account,
                username: params.row.username,
                id_role: params.row.id_role,
                id_place: params.row.id_place,
                active_acc: params.row.active_acc
            }
            return (
                <>
                    <DeleteAccount {...dataRow} />
                </>)
        },
    },
];

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function DataTableAccounts(props) {

    /// Lấy data từ trên redux về
    const {dataAccounts} = props.dataAccounts

    // State
    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState([]);

    // search
    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = dataAccounts.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    const [sortModel, setSortModel] = useState([
        {
            field: 'id_account',
            sort: 'asc',
        },
    ]);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        setRows(dataAccounts);
    }, [dataAccounts]);

    /// Call api
    useEffect(() => {
        props.getDataAccounts();
    }, [])

    return (
        <div style={{height: 470, width: '100%'}}>
            <DataGrid
                components={{Toolbar: ToolbarAdmin}}
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
    dataAccounts: state.adminReducer,
});

const mapDispatchToProps = {
    getDataAccounts
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTableAccounts);