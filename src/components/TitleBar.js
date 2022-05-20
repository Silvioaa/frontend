import { useNavigate } from "react-router-dom";

const TitleBar = ({pathName}) => {
    const navigate = useNavigate();

    function handleAddProject(e){
        e.preventDefault();
        navigate("/add");
    }

    return(
        <div className="titleBar">
            <div className="titleLogo">LOGO</div>
            <div className="title">
                {
                    (pathName==="/add" ||pathName.slice(0,5)==="/edit") &&
                    <div className="backButton" onClick={()=>navigate("/")}><div className="backArrow"></div>Back</div>
                }
                <div className="titleText">
                    {pathName==="/" && "My Projects"}
                    {pathName==="/add" && "Add Project"}
                    {pathName.slice(0,5)==="/edit" && "Edit Project"}
                </div>
                {
                    pathName==="/" &&
                    <button className="strongButton" onClick={handleAddProject}>+ Add Project</button>
                }
            </div>
            
        </div>
    )
}

export default TitleBar;