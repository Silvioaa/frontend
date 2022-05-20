import { useLocation, useParams } from "react-router-dom";
import ListResults from "./components/ListResults";
import Form from "./components/Form";
import TitleBar from "./components/TitleBar";

const Page = () => {
    const pathName = useLocation().pathname;
    const id = parseInt(useParams().id);

    return(
        <>
            <div className="header">
                <div className="logo"></div>
                <TitleBar pathName={pathName}/>
            </div>
            <div className="content">
                {
                    pathName==="/" && <ListResults/>
                }
                {
                    pathName.slice(0,5)==="/edit" && <Form isEdit={true} id={id}/>
                }
                {
                    pathName==="/add" && <Form isEdit={false}/>
                }
            </div>
        </>
    )
}

export default Page;