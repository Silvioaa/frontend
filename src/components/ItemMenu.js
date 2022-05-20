import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProject } from "../redux/actions";

const ItemMenu = ({
    menu, 
    showModal, 
    setShowModal,
    filteredProjects,
    setFilteredProjects
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [idToDelete, setIdToDelete] = useState();
    

    function handleEditClick(e){
        const id = parseInt(e.target.parentElement.id);
        navigate(`/edit/${id}`);
        menu.current.style.display = "none";
    }

    function handleDeleteClick(e){
        setIdToDelete(parseInt(e.target.parentElement.id));
        setShowModal(true);
        menu.current.style.display = "none";
    }

    function handleDeleteFinal(){
        dispatch(deleteProject(idToDelete));
        let deleteIndex;
        const projectToDeleteFiltered = filteredProjects.filter((item, index) =>{ 
            if(item.id===idToDelete){
                deleteIndex = index;
                return true;
            }
            return false;
        })
        if(projectToDeleteFiltered.length!==0){
            let filteredProjectsValue = filteredProjects;
            filteredProjectsValue.splice(deleteIndex,1);
            setFilteredProjects(filteredProjectsValue)
        }
        setShowModal(false);
    }

    useEffect(() => {
        function handleClickOut(e){
            if(menu.current && !menu.current.contains(e.target))
              menu.current.style.display = "none";
        }
        document.addEventListener("mousedown",handleClickOut)
        return () => {
          document.removeEventListener("mousedown",handleClickOut)
        }
      }, [menu])

    return(
        <>
            {showModal &&
                <div className="modal">
                    <p>Are you sure you want to delete the project?</p>
                    <div className="modalButtons">
                        <button onClick={handleDeleteFinal}>Yes</button>
                        <button onClick={()=>setShowModal(false)}>No</button>
                    </div>
                    
                </div>
            }
            <div className="menu" ref={menu}>
                <div className="menuTriangle"></div>
                <div className="menuOption" onClick={handleEditClick}><div className="editIcon"></div>Edit</div>
                <div className="menuOption" onClick={handleDeleteClick}><div className="deleteIcon"></div>Delete</div>
            </div>
        </>
    )
}

export default ItemMenu;