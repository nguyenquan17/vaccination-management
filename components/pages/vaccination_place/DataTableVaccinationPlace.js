import {useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import {connect} from "react-redux";
import Chip from '@mui/material/Chip';

import {getAllVaccinationPlace} from '../../../redux/actions/vaccinationPlaceAction'
import DeleteVaccinationPlace from "./DeleteVaccinationPlace";
import EditVaccinationPlace from "./EditVaccinationPlace";
import ToolbarVaccinationPlace from './ToolbarVaccinationPlace'

const columns = [
    {field: 'id_vaccination_place', headerName: 'ID', width: 100},
    {field: 'name_place', headerName: 'Tên điểm tiêm', width: 250},
    {
        field: 'number_table', headerName: 'Số bàn', width: 100, renderCell: (params) => {
            return <Chip color="success" label={params.row.number_table + " bàn"} variant="outlined"/>
        },
    },
    {field: 'curator', headerName: 'Người phục trách', width: 200},
    {field: 'address', headerName: 'Địa chỉ', width: 200},
    {field: 'name_city', headerName: 'Tỉnh/Thành phố', width: 120},
    {field: 'name_district', headerName: 'Quận/Huyện', width: 120},
    {field: 'name_sub_district', headerName: 'Phường xã', width: 120},
    {
        field: 'editer',
        headerName: 'Chỉnh sửa',
        width: 160,
        renderCell: (params) => {
            const dataRow = {
                idVaccinationPlace: params.row.id_vaccination_place,
                namePlace: params.row.name_place,
                numberTable: params.row.number_table,
                curator: params.row.curator,
                address: params.row.address,
                idCity: params.row.id_city,
                idDistrict: params.row.id_district,
                idSubDistrict: params.row.id_sub_district,
            }
            return (
                <>
                    <EditVaccinationPlace {...dataRow} />
                    <DeleteVaccinationPlace {...dataRow} />
                </>
            )
        },
    },
];

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function DataTableVaccinationPlace(props) {
    const {dataVaccinationPlace} = props.dataVaccinationPlace

    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState([]);

    // search
    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = dataVaccinationPlace.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    const [sortModel, setSortModel] = useState([
        {
            field: 'id_vaccination_place',
            sort: 'asc',
        },
    ]);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        setRows(dataVaccinationPlace);
    }, [dataVaccinationPlace]);

    /// Call api
    useEffect(() => {
        props.getAllVaccinationPlace();
    }, [])


    return (
        <div style={{height: 460, width: '100%'}}>
            <DataGrid
                components={{Toolbar: ToolbarVaccinationPlace}}
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
    dataVaccinationPlace: state.vaccinationPlaceReducer,
});

const mapDispatchToProps = {
    getAllVaccinationPlace
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTableVaccinationPlace);