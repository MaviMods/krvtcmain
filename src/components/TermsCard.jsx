import { Typography } from "@mui/material";
import { useDarkMode } from "../hooks/contex/DarkModeContex";
import Divider from "@mui/material/Divider";

// icons
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";

const TermsCard = () => {
    const { themeTatailwind } = useDarkMode();
    const Atributes = [
        {
            atribute: "Terms of Use",
            description:
                "These terms and conditions outline the rules and regulations for the use of Kerala Roadrunners's Website. By accessing this website we assume you accept these terms and conditions in full. Do not continue to use Kerala Roadrunners's website if you do not accept all of the terms and conditions stated on this page. The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and any or all Agreements: *Client*, *You* and *Your* refers to you, the person accessing this website and accepting the Company's terms and conditions. *The Company*, *Ourselves*, *We*, *Our* and *Us*, refers to our Company. *Party*, *Parties*, or  *Us*, refers to both the Client and ourselves, or either the Client or ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner, whether by formal meetings of a fixed duration or any other means, for the express purpose of meeting the Client's needs in respect of the provision of the Company's stated services/products, in accordance with and subject to, prevailing law of . Any use of the above terminology or other words in the singular, plural, capitalisation and/or he/she or they, are taken as interchangeable and therefore as referring to the same."
        },
        {
            atribute: "Use of the Website",
            description:
                "You promise not to abuse the website or take any actions that could impede or interfere with its operation. You are in charge of keeping your account credentials secure. Account Registration: You might need to create an account in order to use any of our VTC services' features. You promise to fill out the registration form completely and accurately and to maintain the accuracy of the information associated with your account. Account Security: You are in charge of keeping your login information secure. All actions taken using your account are also your responsibility. Tell us right away if you think someone else may have accessed your account without authorization."
        },
        {
            atribute: "User Content",
            description:
                "Your submissions, posts, and sharing of content on our platform are entirely your responsibility. You provide us with a worldwide, royalty-free, non-exclusive license to use, edit, and display your content in connection with our services when you submit content. Prohibited Behavior: You consent to refrain from partaking in any of the following actions that are forbidden: breaking any rules or laws that may be in force. pretending to be someone or something else. intimidating, harassing, or acting harmfully toward other people. publishing, disseminating, or uploading offensive, illicit, or other people's intellectual property. use our services for profit without obtaining our prior authorization in writing. attempting to access user accounts or our systems without authorization."
        },
        {
            atribute: "Reservation of Rights",
            description:
                "We reserve the right at any time and in its sole discretion to request that you remove all links or any particular link to our website. You agree to immediately remove all links to our website upon such request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuing to link to our website, you agree to be bound to and abide by these linking terms and conditions."
        },
        {
            atribute: "Change of Terms",
            description:
                "These Terms of Service are subject to change at any moment. Any modifications will have a new *Last updated* date and be published on this page. By using our services going forward, you agree to the revised conditions."
        },
        {
            atribute: "License",
            description:
                "Unless otherwise stated, Kerala Roadrunners and/or it's licensors own the intellectual property rights for all material on Kerala Roadrunners. All intellectual property rights are reserved. You"
        },
        {
            atribute: "Removal of links from our Services",
            description:
                "If you find any link on our website or any linked website objectionable for any reason, you may contact us about this. We will consider requests to remove links but will have no obligation to do so or to respond directly to you. Whilst we endeavour to ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we commit to ensuring that the website remains available or that the material on the website is kept up to date."
        },
        {
            atribute: "Contact Us",
            description:
                "Please email us at: keralaroadrunners@gmail.com with any queries, worries, or requests pertaining to these Terms of Service. © KERALA ROADRUNNERS"
        }
    ];

    const TermsCard = (id, atribute, description) => {
        return (
            <div
                key={id}
                className={`flex flex-col ${themeTatailwind.secundary.main} max-w-lg rounded-lg border-2 border-transparent ${themeTatailwind.primary.border_color} shadow-2xl gap-3 m-4 p-4`}
            >
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
                    return TermsCard(
                        index,
                        atribute.atribute,
                        atribute.description
                    );
                })}
            </div>
        );
    };

    const renderAttributesP2 = () => {
        const divAtributes = Atributes.slice(3, 8);
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2">
                {divAtributes.map((atribute, index) => {
                    return TermsCard(
                        index,
                        atribute.atribute,
                        atribute.description
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

export default TermsCard;
