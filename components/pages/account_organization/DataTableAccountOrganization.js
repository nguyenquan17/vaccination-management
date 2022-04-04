import {useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import {connect} from "react-redux";

import {getDataAccountOrganization} from '../../../redux/actions/accountOrganizationAction'
import ConfirmAccountOrganization from "./ConfirmAccountOrganization";
import ToolBarAccountOrganization from './ToolBarAccountOrganization'

const columns = [
    {field: 'id_organization', headerName: 'ID', width: 100},
    {field: 'name_organization', headerName: 'Tên tổ chức', width: 250},
    {field: 'address', headerName: 'Địa chỉ', width: 300},
    {field: 'regency', headerName: 'Chức vụ', width: 200},
    {field: 'phone_number', headerName: 'Số điện thoại', width: 150},
    {field: 'email', headerName: 'Email', width: 200},
    {field: 'id_category_organization', headerName: 'Loại Tổ chức', width: 130},
    {field: 'tax_number', headerName: 'Mã số thuế', width: 150},
    {field: 'representative_name', headerName: 'Người đại diện', width: 250},
    {field: 'dob', headerName: 'Ngày sinh', width: 170},
    {field: 'id_account', headerName: 'ID tài khoản', width: 130},
    {
        field: 'editer',
        headerName: 'Duyệt',
        width: 160,
        renderCell: (params) => {
            const dataRow = params.row
            return (
                <>
                    <ConfirmAccountOrganization {...dataRow} />
                </>)
        },
    },
];

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function DataTableAccountOrganization(props) {

    const {dataAccountOrganization} = props.dataAccountOrganization;

    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState([]);

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = dataAccountOrganization.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    const [sortModel, setSortModel] = useState([
        {
            field: 'id_organization',
            sort: 'asc',
        },
    ]);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        setRows(dataAccountOrganization);
    }, [dataAccountOrganization]);

    /// Call api
    useEffect(() => {
        props.getDataAccountOrganization();
    }, [])

    
    return (
        <div style={{height: 470, width: '100%'}}>
            <DataGrid
                components={{Toolbar: ToolBarAccountOrganization}}
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
    dataAccountOrganization: state.accountOrganizationReducer,
});

const mapDispatchToProps = {
    getDataAccountOrganization
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTableAccountOrganization);