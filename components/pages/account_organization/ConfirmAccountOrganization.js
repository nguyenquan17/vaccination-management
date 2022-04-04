import {useState} from "react";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import {DialogActions, DialogContent, DialogTitle, Dialog} from '@mui/material';

import {snackActions} from '../../../helper/showSnackBar';
import {confirmAccountOrganization} from "../../../redux/actions/accountOrganizationAction";
import {number, string} from "prop-types";
import SCSS from "../vaccine/VCMNCSS.module.scss";

function ConfirmAccountOrganization(props) {

    const [openConfirm, setOpenConfirm] = useState(false);

    const handleClickOpen = () => {
        setOpenConfirm(true);
    };

    const handleClose = () => {
        setOpenConfirm(false);
    };

    const onClickConfirmAccount = async () => {
        await props.confirmAccountOrganization(props.id_organization);
    }

    return (
        <>
            <Button
                variant="contained"
                className={SCSS.buttonEdit}
                onClick={handleClickOpen}
            >
                <i className="fas fa-check"/>
            </Button>
            <Dialog
                open={openConfirm}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Bạn có chắc chắn muốn duyệt tài khoản này không?"}
                </DialogTitle>
                <DialogContent>
                        <p>Organization ID: {props.id_organization}</p>
                        <p>Tên tổ chức: {props.name_organization}</p>
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
                        onClick={onClickConfirmAccount}
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
    confirmAccountOrganization
};

ConfirmAccountOrganization.prototype = {
    id_organization: number,
    name_organization: string,
    address: string,
    regency: string,
    phone_number: string,
    email: string,
    id_category_organization: number,
    tax_number: string,
    representative_name: string,
    dob: string,
    id_account: number,
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAccountOrganization);