import { useSelector } from "react-redux";
import { useRef, Fragment, useState, useEffect } from "react";
import ItemMenu from "./ItemMenu";

const ListResults = () => {
    const projects = useSelector(state => state.projects);
    const menu = useRef();
    const ITEMS_PER_PAGE = 3;
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [inputFilter, setInputFilter] = useState("");
    const [itemsToShow, setItemsToShow] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);

    function handleActionClick(e, id){
        menu.current.id = id;
        menu.current.style.display = "block";
        menu.current.style.position = "absolute";
        menu.current.style.top = e.clientY.toString() + "px";
        menu.current.style.left = (e.clientX - 133).toString() + "px";    
    }

    function getItemsToShow(){
        const firstIndex = (currentPage-1)*ITEMS_PER_PAGE;
        let itemsToShowValue = [];
        for(let i=firstIndex;i<firstIndex+ITEMS_PER_PAGE&&filteredProjects[i]!==undefined;++i){
            itemsToShowValue.push(filteredProjects[i]);
        }
        return itemsToShowValue;
    }

    function getPages(){
        let pagesToShow = [];
        const last = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
        for(let i=1;i<=last;++i){
            pagesToShow.push(i);
        }
        return pagesToShow;
    }

    function handlePrev(){
        if(currentPage>1) setCurrentPage(prevState => --prevState);
    }

    function handleNext(){
        if(currentPage<getPages().length) setCurrentPage(prevState => ++prevState);
    }

    function handlePage(e){
        const numberPage = parseInt(e.target.id.slice(1))
        setCurrentPage(numberPage)
    }

    function handleFilterChange(e){
        setInputFilter(e.target.value);
        const regFilter = new RegExp("\\b"+e.target.value)
        setFilteredProjects(projects.filter(item =>{if(regFilter.test(item.projectName))return true;return false}))
    }

    function getInitials(string){
        const words = string.split(" ");
        const initialsArray = words.map(word => word.charAt(0));
        let initials = "";
        initialsArray.forEach(initial=> initials += initial)
        return initials;
    }

    useEffect(() => {
      setItemsToShow(getItemsToShow())
    },[currentPage, filteredProjects, projects])

    useEffect(() => {
      if(getItemsToShow().length===0&&filteredProjects.length!==0) handlePrev();
    })

    return(
        <>
            <ItemMenu 
                menu={menu} 
                showModal={showModal} 
                setShowModal={setShowModal}
                filteredProjects={filteredProjects}
                setFilteredProjects={setFilteredProjects}
                />
            <div className="searchContainer">
                <input placeholder="Search by name" value={inputFilter} onChange={handleFilterChange}/>
            </div>
            <div className="searchResultsTitle">
                <div>Project info</div>
                <div>Project Manager</div>
                <div>Assigned to</div>
                <div>Status</div>
                <div>Action</div>
            </div>
            {itemsToShow.map((item)=>{
                let date = item.creationDate.getDate();
                let month = item.creationDate.getMonth()+1;
                const year = item.creationDate.getFullYear();
                let hours = item.creationDate.getHours();
                let amOrPm;
                if(hours>12){
                    hours -= 12;
                    amOrPm="pm";
                }else{
                    amOrPm="am"
                }
                let minutes = item.creationDate.getMinutes();
                if(date<10) date = "0" + date.toString();
                if(month<10) month = "0" + month.toString();
                if(minutes<10) minutes = "0" + minutes.toString();
                const dateString = `${date}/${month}/${year} ${hours}:${minutes} ${amOrPm}`
                return(
                    <Fragment key={item.id}>  
                        <div className="itemContainer" >
                            <div className="itemSubContainer">
                                <div className="projectInfo">
                                    <div className="projectName">{item.projectName}</div>
                                    <div className="creationDate">{dateString}</div>
                                </div>
                                <div className="projectManager">
                                    <div className="pmInitials">{getInitials(item.projectManager)}</div>
                                    {item.projectManager}
                                </div>
                                <div className="assignedTo">
                                    <img src={require(String.raw`${item.assignedToImage}`)}/>
                                    {item.assignedTo}
                                </div>
                                <div className="status">{item.status}</div>
                            </div>
                            <div onClick={(e)=>handleActionClick(e,item.id)} className="action"></div>
                        </div>
                    </Fragment>
                )
            })}
            {
                projects.length>ITEMS_PER_PAGE && 
                <div className="pagination">
                    <div onClick={handlePrev}>«</div>
                    {
                        getPages().map(page => 
                            <div key={page} onClick={handlePage} id={"p"+page.toString()}>{page}</div>
                        )
                    }
                    <div onClick={handleNext}>»</div>
                </div>
            }
        </>
    )
}

export default ListResults;