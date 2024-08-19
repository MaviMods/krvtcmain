import { Typography } from "@mui/material";
import { useDarkMode } from "../hooks/contex/DarkModeContex";
import Divider from "@mui/material/Divider";

// icons
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";

const PolicyCard = () => {
    const { themeTatailwind } = useDarkMode();
    const Atributes = [
        {
            atribute: "Privacy Policy",
            description:
                "Greetings from Kerala RoadRunners!(referred to as *us,* *we,* or *our*). We are dedicated to safeguarding your personal information since we value your privacy. This privacy statement explains how we gather, use, disclose, and protect your personal information when you visit our website or make use of our services. You accept the practices outlined in this Privacy Policy by visiting or using our website. Please do not use our website or services if you disagree with the terms stated in this policy. Data That We Gather",
        },
        {
            atribute: "What type of Information do we collect?",
            description:
                "While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (*Personal Data*). Personally identifiable information may include, but is not limited to: Email address, Cookies and Usage Data, Country & Timezone, Age. We may also ask for: Steam, Discord, TruckersMP, Usage Data. We may also collect information on how the Service is accessed and used (*Usage Data*). This Usage Data may include information such as your computer's browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data. ",
        },
        {
            atribute: "Tracking & Cookies Data",
            description:
                "We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service. Examples of Cookies we use: Session Cookies. We use Session Cookies to operate our Service, Preference Cookies. We use Preference Cookies to remember your preferences and various settings, Security Cookies. We use Security Cookies for security purposes.",
        },
        {
            atribute: "Use of Data",
            description:
                "Kerala Roadrunners uses the collected data for various purposes: To provide and maintain the Service, To notify you about changes to our Service, To allow you to participate in interactive features of our Service when you choose to do so, To provide customer care and support, To provide analysis or valuable information so that we can improve the Service, To monitor the usage of the Service, To detect, prevent and address technical issues.",
        },
        {
            atribute: "Transfer Of Data",
            description:
                "Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those from your jurisdiction. If you are located outside the United Kingdom and choose to provide information to us, please note that we transfer the data, including Personal Data, to the United Kingdom and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer. Kerala Roadrunners will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organisation or a country unless there are adequate controls in place including the security of your data and other personal information.",
        },
        {
            atribute: "Disclosure Of Data",
            description:
                "We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service. Examples of Cookies we use: Session Cookies. We use Session Cookies to operate our Service. Preference Cookies. We use Preference Cookies to remember your preferences and various settings. Security Cookies. We use Security Cookies for security purposes.",
        },
        {
            atribute: "Your Rights To Your Personal Data",
            description:
                "GDPR: Under the GDPR Laws we are required to allow the following: Access to all your personal information. (Can be accessed via a data dump) Correction and deletion of data. Restriction of processing and objection. Lodging a complaint with the Information Commissioner's Office. If you wish to do any of the above, please contact us. Contact Email: keralaroadrunners@gmail.com",
        },
        {
            atribute: "Security Of Data",
            description:
                "The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security. Service Providers: We may employ third party companies and individuals to facilitate our Service (*Service Providers*), to provide the Service on our behalf, to perform Service-related services or to assist us in analysing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose. Analytics: We may use third-party Service Providers to monitor and analyse the use of our Service. Google Analytics: Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualise and personalise the ads of its own advertising network.",
        },
        {
            atribute: "Changes To This Privacy Policy",
            description:
                "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email or a prominent notice on our Service, prior to the change becoming effective and update the *effective date* at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page. © KERALA ROADRUNNERS",
        }
    ];

    const PolicyCard = (id, atribute, description) => {
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
                    return PolicyCard(
                        index,
                        atribute.atribute,
                        atribute.description
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
                    return PolicyCard(
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

export default PolicyCard;
