import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

import useFetch from "../hooks/useFetch";
import AlertModal from "./AlertModal";
import SnakeBarInfo from "./SnakeBarInfo";

const SubmitButton = ({
    checkTextError,
    data,
    recaptchaRef,
    resetForm,
    url,
}) => {
    const [openEmpyData, setOpenEmpyData] = useState(false);
    const [loading, error, succes, bodyResponse, setError, setSucces] =
        useFetch(url, "POST", {
            "Content-Type": "application/json",
        });

    const dataEmpyToSend = async () => {
        if (checkTextError()) {
            return setOpenEmpyData(true);
        }
        const fetchResponse = await bodyResponse(data);
        if (fetchResponse.ok) {
            recaptchaRef.current.reset();
            resetForm();
        }
    };

    return (
        <div className="mt-3">
            <AlertModal
                title="Complete all the information"
                description="There is missing information that you complete in the form"
                handleClose={() => setOpenEmpyData(false)}
                open={openEmpyData}
            />
            <AlertModal
                title="We could not send the form"
                description="Check your internet connection or try again later"
                handleClose={() => setError(false)}
                open={error}
            />
            <SnakeBarInfo
                msj="Sent successfully"
                severity="success"
                open={succes}
                setOpen={setSucces}
            />
            <LoadingButton
                endIcon={<SendIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                size="large"
                onClick={dataEmpyToSend}
            >
                Send
            </LoadingButton>
        </div>
    );
};

export default SubmitButton;
