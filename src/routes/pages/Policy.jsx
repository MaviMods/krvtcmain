import { TITLE } from "../../helpers/configs";
import Slider from "../../components/Slider";
import AttributesCard from "../../components/AttributesCard";
import PolicyCard from "../../components/PolicyCard";

const Policy = () => {
    document.title = TITLE + " | Policy";
    return (
        <div>
            <Slider />
            <PolicyCard />
        </div>
    );
};

export default Policy;
