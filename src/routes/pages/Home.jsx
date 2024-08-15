import { TITLE } from "../../helpers/configs";
import Slider from "../../components/Slider";
import JoinCard from "../../components/JoinCard";
import Statistics from "../../components/Statistics";
import AttributesCard from "../../components/AttributesCard";

const Home = () => {
    document.title = TITLE + " | Home";
    return (
        <div>
            <Slider />
            <JoinCard />
            <AttributesCard />
            <Statistics />
        </div>
    );
};

export default Home;
