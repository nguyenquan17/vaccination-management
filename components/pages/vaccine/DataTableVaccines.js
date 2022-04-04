import {useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import {connect} from "react-redux";
import Chip from '@mui/material/Chip';

import {getDataVaccines} from '../../../redux/actions/vaccinesAction'
import ToolbarVaccine from './ToolbarVaccine'
import EditVaccine from  './EditVaccine'
import DeleteVaccine from "./DeleteVaccine";

const columns = [
    {field: 'id', headerName: 'ID', width: 150},
    {field: 'Name', headerName: 'Tên vacxin', width: 200},
    {field: 'Production_by', headerName: 'Hãng sản xuất', width: 200},
    {
        field: 'Quantity', headerName: 'Số liều', width: 150, renderCell: (params) => {
            return <Chip color="success" label={params.row.Quantity + " liều"} variant="outlined"/>
        },
    },
    {
        field: 'Time', headerName: 'Khoảng cách 2 mũi', width: 220, renderCell: (params) => {
            return <Chip color="success" label={params.row.Time + " ngày"} variant="outlined"/>
        },
    },
    {
        field: 'editer',
        headerName: 'Chỉnh sửa',
        width: 160,
        renderCell: (params) => {
            const dataRow = {
                id: params.row.id,
                name: params.row.Name,
                nameProduct: params.row.Production_by,
                numberVaccine: params.row.Quantity,
                timeSpace: params.row.Time,
            }
            return (
                <>
                    <EditVaccine {...dataRow} />
                    <DeleteVaccine {...dataRow} />
                </>)
        },
    },
];

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function DataTableVaccines(props) {

    /// Lấy data từ trên redux về
    const {dataVaccines} = props.dataVaccines

    // State
    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState([]);

    // search
    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = dataVaccines.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    const [sortModel, setSortModel] = useState([
        {
            field: 'id',
            sort: 'asc',
        },
    ]);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        setRows(dataVaccines);
    }, [dataVaccines]);

    /// Call api
    useEffect(() => {
        props.getDataVaccines();
    }, [])

    return (
        <div style={{height: 470, width: '100%'}}>
            <DataGrid
                components={{Toolbar: ToolbarVaccine}}
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
    dataVaccines: state.vaccinesReducer,
});

const mapDispatchToProps = {
    getDataVaccines
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTableVaccines);