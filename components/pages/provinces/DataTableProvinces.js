import {useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import {connect} from "react-redux";
// import Chip from '@mui/material/Chip';

import {getDataProvinces} from '../../../redux/actions/provincesAction'

const Citycolumns = [
    {field: 'id', headerName: 'ID', width: 150},
    {field: 'name', headerName: 'Tỉnh/Thành phố', width: 200},
];

const Districtcolumns = [
    {field: 'id', headerName: 'ID', width: 150},
    {field: 'name', headerName: 'Quận/Huyện', width: 200},
];

const Towncolumns = [
    {field: 'id', headerName: 'ID', width: 150},
    {field: 'name', headerName: 'Xã/Phường/Thị trấn', width: 200},
];

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function DataTableProvinces(props) {

    /// Lấy data từ trên redux về
    const {dataCities, dataDistricts, dataTowns} = props.dataProvinces

    // State
    

    const [sortModel, setSortModel] = useState([
        {
            field: 'id',
            sort: 'asc',
        },
    ]);
    const [pageSize, setPageSize] = useState(5);

    /// Call api
    useEffect(() => {
        props.getDataProvinces();
    }, [])

    return (
        <div className="flex flex-row">
            <div style={{height: 470, width: '100%'}}>
                <DataGrid
                    rows={dataCities}
                    columns={Citycolumns}
                    sortModel={sortModel}
                    onSortModelChange={(model) => setSortModel(model)}
                    rowsPerPageOptions={[5, 10, 20, 30]}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                />
            </div>
            <div style={{height: 470, width: '100%', marginLeft: 50, marginRight: 50}}>
            <DataGrid
                rows={dataDistricts}
                columns={Districtcolumns}
                sortModel={sortModel}
                onSortModelChange={(model) => setSortModel(model)}
                rowsPerPageOptions={[5, 10, 20, 30]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            />
            </div>
            <div style={{height: 470, width: '100%'}}>
            <DataGrid
                rows={dataTowns}
                columns={Towncolumns}
                sortModel={sortModel}
                onSortModelChange={(model) => setSortModel(model)}
                rowsPerPageOptions={[5, 10, 20, 30]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            />
        </div>
    </div>
    );
}

const mapStateToProps = (state) => ({
    dataProvinces: state.provincesReducer,
});

const mapDispatchToProps = {
    getDataProvinces
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTableProvinces);