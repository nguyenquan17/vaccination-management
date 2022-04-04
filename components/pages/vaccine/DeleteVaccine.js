import {useState} from "react";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import {DialogActions, DialogContent, DialogTitle, Dialog} from '@mui/material';

import {deleteVaccine} from "../../../redux/actions/vaccinesAction";
import {number, string} from "prop-types";
import SCSS from "./VCMNCSS.module.scss";

function DeleteVaccine(props) {

    const [openDelete, setOpenDelete] = useState(false);

    const handleClickOpen = () => {
        setOpenDelete(true);
    };

    const handleClose = () => {
        setOpenDelete(false);
    };

    const onClickDeleteVaccine = async () => {
        await props.deleteVaccine(props.id);
    }

    return (
        <>
            <Button
                variant="contained"
                className={SCSS.buttonCancel}
                onClick={handleClickOpen}
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
                        <p>Vaccine ID: {props.id}</p>
                        <p>Tên vacxin: {props.name}</p>
                        <p>Hãng sản xuất: {props.nameProduct}</p>
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
                        onClick={onClickDeleteVaccine}
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
    deleteVaccine
};

DeleteVaccine.prototype = {
    id: number,
    name: string,
    nameProduct: string,
    numberVaccine: number,
    timeSpace: number,
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteVaccine);