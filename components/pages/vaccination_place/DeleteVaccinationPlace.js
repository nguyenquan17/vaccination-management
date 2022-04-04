import {useState} from "react";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import {DialogActions, DialogContent, DialogTitle, Dialog} from '@mui/material';

import {deleteVaccinationPlace} from "../../../redux/actions/vaccinationPlaceAction";
import {number, string} from "prop-types";
import SCSS from "../vaccine/VCMNCSS.module.scss";

function DeleteVaccinationPlace(props) {

    const [openDelete, setOpenDelete] = useState(false);

    const handleClickDelete = () => {
        setOpenDelete(true);
    };

    const handleClose = () => {
        setOpenDelete(false);
    };

    const onClickDeleteVaccinationPlace = async () => {
        await props.deleteVaccinationPlace(props.idVaccinationPlace);
        handleClose();
    }

    return (
        <>
            <Button
                variant="contained"
                className={SCSS.buttonCancel}
                onClick={handleClickDelete}
            >
                <i className="fas fa-trash-alt"/>
            </Button>
            <Dialog
                open={openDelete}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Bạn có chắc chắn muốn xóa không?"}
                </DialogTitle>
                <DialogContent>
                    <p>Tên điểm tiêm: {props.namePlace}</p>
                    <p>Số bàn: {props.numberTable}</p>
                    <p>Địa chỉ: {props.address}</p>
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
                        onClick={onClickDeleteVaccinationPlace}
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
    deleteVaccinationPlace
};

DeleteVaccinationPlace.prototype = {
    idVaccinationPlace: number,
    namePlace: String,
    numberTable: number,
    curator: String,
    address: String,
    idCity: number,
    idDistrict: number,
    idSubDistrict: number,
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteVaccinationPlace);