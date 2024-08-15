import { useDarkMode } from "../hooks/contex/DarkModeContex";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import Button from "@mui/material/Button";
import my_welcome from "../static/img/my_welcome.webp";

const JoinCard = () => {
    const { themeTatailwind } = useDarkMode();
    const navigate = useNavigate();
    return (
        <div className="flex justify-center w-full">
            <div className="flex flex-col max-w-7xl md:flex-row">
                <div className="flex justify-center p-2">
                    <img
                        className="object-cover rounded-lg drop-shadow-lg aspect-video"
                        style={{ width: "1000px", height: "auto" }}
                        src={my_welcome}
                        alt="welcome_image_card"
                    />
                </div>

                <div
                    className={`flex flex-col ${themeTatailwind.secundary.main} rounded-lg border-2 border-cyan-600 shadow-2xl m-4 p-4`}
                >
                    <div className="flex flex-col text-justify h-full gap-5 pb-2">
                        <Typography
                            color={themeTatailwind.primary.color}
                            variant="h4"
                        >
                            <b>Welcome to Kerala Roadrunners VTC!</b>
                        </Typography>
                        <Typography
                            color={themeTatailwind.primary.color}
                            variant="subtitle1"
                        >
                            If you are interested in joining Kerala RoadRunners, please send a application thorugh our Kerala RoadRunners VTC page!
                        </Typography>
                        <div className="grid content-end h-full">
                            <div className="flex justify-center">
                                <Button
                                    startIcon={<HowToRegRoundedIcon />}
                                    variant="contained"
                                    onClick={() => navigate("/news/29574")}
                                >
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinCard;
