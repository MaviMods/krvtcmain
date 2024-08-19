import { TITLE } from "../../helpers/configs";
import Slider from "../../components/Slider";
import AttributesCard from "../../components/AttributesCard";
import TermsCard from "../../components/TermsCard";

const Terms = () => {
    document.title = TITLE + " | Terms of Use";
    return (
        <div>
            <Slider />
            <TermsCard />
        </div>
    );
};

export default Terms;
