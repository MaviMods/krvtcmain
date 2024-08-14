import { Typography } from "@mui/material";
import { useDarkMode } from "../hooks/contex/DarkModeContex";
import Divider from "@mui/material/Divider";

const ErrorData = ({ msj }) => {
    const { themeTatailwind, darkMode } = useDarkMode();

    return (
        <div className="flex justify-center w-full">
            <div
                className={`flex flex-col items-center ${
                    darkMode ? "bg-yellow-900" : "bg-yellow-600"
                }  rounded-xl gap-2 m-10 p-3`}
            >
                <Typography variant="h4" color={themeTatailwind.primary.color}>
                    <b>We did not find results</b>
                </Typography>
                <Divider sx={{ mr: 1 }} variant="middle" flexItem />
                <Typography variant="h6" color={themeTatailwind.primary.color}>
                    {msj}
                </Typography>

                <Typography
                    className="max-w-lg mt-3"
                    variant="caption"
                    color={themeTatailwind.primary.color}
                >
                    Unfortunately, no results were found for your consultation.
                </Typography>
            </div>
        </div>
    );
};

export default ErrorData;
