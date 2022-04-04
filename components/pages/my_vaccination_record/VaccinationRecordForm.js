import {useEffect, useState} from "react";
import React from 'react'
import {connect} from "react-redux";
import {DataGrid} from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import moment from "moment";
import {getMyVaccinationRecord} from "../../../redux/actions/myVaccinationRecordAction";
import ToolbarMyVCRecord from "./ToolbarMyVCRecord";


const columns = [
    {field: 'id_vaccination_records_detail', headerName: 'ID', width: 100},
    {field: 'name_vaccine_place', headerName: 'Điểm tiêm', width: 300},
    {field: 'name_vaccine', headerName: 'Tên vacxin', width: 200},
    {field: 'number_of_times', headerName: 'Mũi thứ', width: 100},
    {
        field: 'injection_date', headerName: 'Thời gian tiêm', width: 200, renderCell: (params) => {
            return <p>{moment.unix(params.row.injection_date).format("[Ngày] DD [tháng] MM [năm] YYYY")}</p>
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
        field: 'done', headerName: 'Xác nhận', width: 150, renderCell: (params) => {
            return <Chip color="success" label="Đã tiêm" variant="outlined"/>
        },
    },
];

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function VaccinationRecordForm(props) {

    let {myVaccinationRecord} = props.myVaccinationRecordReducer

    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState([]);

    // search
    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = myVaccinationRecord.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    const [sortModel, setSortModel] = useState([
        {
            field: 'id_vaccination_records_detail',
            sort: 'asc',
        },
    ]);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        setRows(myVaccinationRecord);
    }, [myVaccinationRecord]);

    /// Call api
    useEffect(() => {
        props.getMyVaccinationRecord();
    }, [])

    // dữ liệu người dùng
    const {userInfo} = props.userInfo;

    const showDataTable = () => {
        return (
            <div>
                <h3 className="text-2xl mx-auto text-center font-semibold uppercase my-4" >Đã tiêm các mũi</h3>
                <div style={{height: 460, width: '100%'}}>
                    <DataGrid
                        components={{Toolbar: ToolbarMyVCRecord}}
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
            </div>
        )
    }

    return (
        <>
            <div>
                <div className="xl:container mx-auto px-4">
                    <h1 className="text-3xl mx-auto text-center font-semibold uppercase" >Chứng nhận tiêm chủng Covid-19</h1>
                </div>
                <section className="sectionPage my-12">
                    <div className="xl:container mx-auto px-4">
                        <div className="row">
                            <div className="font-medium mb-2">1. Thông tin người đăng ký tiêm</div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-4 md:gap-6">
                                <div>
                                    <p className="mb-2">Họ và tên</p>
                                    <TextField
                                        className="h-8 min-w-full xl:w-full mb-2 "
                                        size="small" id="outlined-disabled"
                                        color="warning" focused
                                        variant="outlined"
                                        disabled
                                        defaultValue={userInfo.fullName}
                                    />
                                </div>
                                <div>
                                    <p className="mb-2">Ngày Sinh</p>
                                    <TextField
                                        className="h-8 min-w-full xl:w-full mb-2 "
                                        size="small"
                                        id="date"
                                        label="Ngày Sinh"
                                        type="date"
                                        disabled
                                        defaultValue={new Date(userInfo.dob * 1000).toISOString().substring(0, 10)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div>
                                    <p className="mb-2">Giới tính</p>
                                    <TextField
                                        size="small"
                                        className="min-w-full xl:w-full"
                                        id="outlined-select-currency"
                                        placeholder="Giới tính"
                                        disabled
                                        defaultValue={userInfo.gender === "male" ? "Nam" : "Nữ"}
                                    >
                                    </TextField>

                                </div>
                                <div>
                                    <p className="mb-2">Số điện thoại</p>
                                    <TextField
                                        className=" min-w-full xl:w-full"
                                        size="small" id="outlined-basic"
                                        variant="outlined"
                                        placeholder="Số điện thoại"
                                        disabled
                                        defaultValue={userInfo.phoneNumber}
                                    />
                                </div>
                                <div>
                                    <p className="mb-2">Số CMND/CCCD/HC</p>
                                    <TextField
                                        className="min-w-full xl:w-full"
                                        size="small" id="outlined-basic"
                                        variant="outlined"
                                        placeholder="Số CMND/CCCD/HC"
                                        disabled
                                        defaultValue={userInfo.identify}
                                    />
                                </div>
                                <div>
                                    <p className="mb-2">Số thẻ BHYT</p>
                                    <TextField
                                        className=" min-w-full xl:w-full"
                                        size="small" id="outlined-basic"
                                        variant="outlined"
                                        placeholder="Số thẻ BHYT"
                                        disabled
                                        defaultValue={userInfo.insurance}
                                    />

                                </div>
                                <div className="col-span-2">
                                    <p className="mb-2">Địa chỉ hiện tại</p>
                                    <TextField
                                        className=" min-w-full xl:w-full"
                                        size="small" id="outlined-basic"
                                        variant="outlined"
                                        placeholder="Địa chỉ hiện tại"
                                        disabled
                                        defaultValue={userInfo.address}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {showDataTable()}
            </div>

        </>


    );
}
const mapStateToProps = (state) => ({
    userInfo: state.authReducer,
    myVaccinationRecordReducer: state.myVaccinationRecordReducer
});
const mapDispatchToProps = {
    getMyVaccinationRecord
};

export default connect(mapStateToProps, mapDispatchToProps)(VaccinationRecordForm);