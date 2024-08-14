import { TITLE } from "../../helpers/configs";
import EmptyData from "../../components/EmptyData";

const Notfound = () => {
    document.title = TITLE + " | 404";
    return <EmptyData msj={"The page you are looking for was not found"} />;
};

export default Notfound;
