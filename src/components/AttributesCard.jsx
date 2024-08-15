import { Typography } from "@mui/material";
import { useDarkMode } from "../hooks/contex/DarkModeContex";
import Divider from "@mui/material/Divider";

// icons
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";

const AttributesCard = () => {
    const { themeTatailwind } = useDarkMode();
    const Atributes = [
        {
            atribute: "Kerala Roadrunners VTC",
            description:
                "Welcome to Kerala RoadRunners, a virtual trucking company based in Kerala, India. We are a VTC established on 09th August 2023 dedicated to providing our drivers with the best possible experience. We are a team of friendly and experienced truckers who love the open road and the challenge of delivering cargo on time and in good condition.",
            icon: <PeopleRoundedIcon fontSize="large" />,
        },
        {
            atribute: "We Offer's",
            description:
                "A friendly and supportive community Regular convoy and Giveaways Access to the our trucks and trailers A comprehensive training program We are always looking for new drivers to join our team. If you are passionate about trucking and want to be part of a great community, then Kerala RoadRunners is the place for you.",
            icon: <AdminPanelSettingsRoundedIcon fontSize="large" />,
        },
        {
            atribute: "Our Mission",
            description:
                "Our mission is to provide our drivers with the best possible trucking experience. We want our drivers to enjoy the open road, the challenge of delivering cargo, and the camaraderie of being part of a team.",
            icon: <FlagRoundedIcon fontSize="large" />,
        },
        {
            atribute: "Our Values",
            description:
                "We believe in the following values:  Teamwork: We are a team of drivers who work together to achieve our goals. We support each other and help each other out. Communication: We communicate openly and honestly with each other. We are always willing to listen to feedback and suggestions. Respect: We respect each other as drivers and as individuals. We treat each other with kindness and compassion. Excellence: We strive to be the best trucking company we can be. We are always looking for ways to improve our VTC.",
            icon: <EmojiEventsRoundedIcon fontSize="large" />,
        }
    ];

    const AttributeCard = (id, atribute, description, icon) => {
        return (
            <div
                key={id}
                className={`flex flex-col ${themeTatailwind.secundary.main} max-w-lg rounded-lg border-2 border-transparent ${themeTatailwind.primary.border_color} shadow-2xl gap-3 m-4 p-4`}
            >
                <Typography
                    className="flex justify-center"
                    color={themeTatailwind.primary.color}
                >
                    {icon}
                </Typography>
                <Typography
                    className="flex justify-center"
                    color={themeTatailwind.primary.color}
                    variant="h6"
                >
                    {atribute}
                </Typography>
                <Divider />
                <div className="flex text-justify gap-3">
                    <Typography
                        color={themeTatailwind.primary.color}
                        variant="subtitle2"
                    >
                        {description}
                    </Typography>
                </div>
            </div>
        );
    };

    const renderAttributesP1 = () => {
        const divAtributes = Atributes.slice(0, 3);
        return (
            <div className="grid grid-cols-1 md:grid-cols-3">
                {divAtributes.map((atribute, index) => {
                    return AttributeCard(
                        index,
                        atribute.atribute,
                        atribute.description,
                        atribute.icon
                    );
                })}
            </div>
        );
    };

    const renderAttributesP2 = () => {
        const divAtributes = Atributes.slice(3, 5);
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2">
                {divAtributes.map((atribute, index) => {
                    return AttributeCard(
                        index,
                        atribute.atribute,
                        atribute.description,
                        atribute.icon
                    );
                })}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center">
            {renderAttributesP1()}
            {renderAttributesP2()}
        </div>
    );
};

export default AttributesCard;
