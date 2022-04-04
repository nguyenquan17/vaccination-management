import {useState} from "react";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import SCSS from "../vaccine/VCMNCSS.module.scss";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {acceptScheduleInjections} from "../../../redux/actions/acceptRecordActions";
import {snackActions} from "../../../helper/showSnackBar";

function AcceptBtnRecord(props) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const showInfoAccept = () => {
        if(!props.listID){
            return (<p className="text-red-600">Bạn chưa chọn đơn nào</p>)
        }else {
            if(props.listID.length === 0){
                return (<p className="text-red-600">Bạn chưa chọn đơn nào</p>)
            }
            return (<p>Số lượng đơn đăng ký duyệt {props.listID.length}</p>)
        }
    }

    const onClickAccept = async () => {
        let result = await props.acceptScheduleInjections({listID: props.listID})
        if(result){
            snackActions.success('Xác nhận tiêm thành công 🎉')
            handleClose()
        }else{
            snackActions.error('Xác nhận tiêm thất bại, máy chủ đang bảo trì')
        }
    }

    return (
        <>
            <Button
                variant="contained"
                className={SCSS.customButton}
                onClick={handleClickOpen}
            >
                <i className="fas fa-check mr-2"/>Xác nhận tiêm
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Xác nhận tiêm"}
                </DialogTitle>
                <DialogContent>
                    {showInfoAccept()}
                </DialogContent>
                <DialogActions className="mx-5">
                    <Button
                        variant="contained"
                        className={[SCSS.customButton, SCSS.buttonClose, "text-left"].join(
                            " "
                        )}
                        onClick={handleClose}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        className={SCSS.buttonCancel}
                        onClick={onClickAccept}
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    acceptScheduleInjections
};

AcceptBtnRecord.prototype = {
    listID: PropTypes.array,
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptBtnRecord);
