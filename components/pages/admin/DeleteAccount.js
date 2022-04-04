import {useState} from "react";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import {DialogActions, DialogContent, DialogTitle, Dialog} from '@mui/material';

import {deleteAccount} from "../../../redux/actions/adminAction";
import {number, string} from "prop-types";
import SCSS from "./VCMNCSS.module.scss";

function DeleteAccount(props) {

    const [openDelete, setOpenDelete] = useState(false);

    const handleClickOpen = () => {
        setOpenDelete(true);
    };

    const handleClose = () => {
        setOpenDelete(false);
    };

    const onClickDeleteAccount = async () => {
        await props.deleteAccount(props.id_account);
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
                        <p>ID Account: {props.id_account}</p>
                        <p>Username: {props.username}</p>
                        <p>Mã quyền: {props.id_role}</p>
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
                        onClick={onClickDeleteAccount}
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
    deleteAccount
};

DeleteAccount.prototype = {
    id_account: number,
    username: string,
    password: string,
    id_role: number,
    id_place: number,
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);