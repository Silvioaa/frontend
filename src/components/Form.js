import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { editProject, createProject } from "../redux/actions";


const Form = ({isEdit, id}) => {
    const [fieldsToModify, setFieldsToModify] = useState( 
        {   
            id:null,
            creationDate:null,
            projectName:"",
            description:"",
            projectManager:"",
            assignedTo:"",
            status:"Enabled",
            assignedToImage:'./images/Ellipse46.png'
        }
    );
    const [submitted, setSubmitted] = useState(false);
    const projects = useSelector(state => state.projects);
    const projectManagers = useSelector(state => state.projectManagers);
    const employeesToAssign = useSelector(state => state.employeesToAssign);
    const statuses = useSelector(state => state.statuses);
    const dispatch = useDispatch();

    function handleChange(e){
        setFieldsToModify({...fieldsToModify,[e.target.id]:e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault();
        for(const field in fieldsToModify){
            if(fieldsToModify[field]===""){
                alert(`All fields must be filled to ${isEdit ? "edit" : "create"} the project.`);
                return;
            }
        }
        if(isEdit) dispatch(editProject(id,fieldsToModify));
        else{
            let maxId = 0;
            projects.forEach((item) => {
                if(item.id>maxId) maxId = item.id
            })
            const fieldsToModifyValue = {...fieldsToModify, creationDate: new Date(), id:maxId + 1};
            setFieldsToModify(fieldsToModifyValue);
            dispatch(createProject(fieldsToModifyValue))
        }
        setSubmitted(true);
    }

    useEffect(()=>{
        if(isEdit){
            const fieldsToEdit = projects.filter((item)=>item.id===id);
            setFieldsToModify(fieldsToEdit[0]);
        }
    },[]);

    useEffect(() => {
      if(submitted){
        const projectChanged = projects.filter(item => item.id===fieldsToModify.id)[0];
        if(fieldsToModify.projectName===projectChanged.projectName &&
           fieldsToModify.description===projectChanged.description && 
           fieldsToModify.projectManager===projectChanged.projectManager &&
           fieldsToModify.assignedTo===projectChanged.assignedTo &&
           fieldsToModify.status===projectChanged.status &&
           fieldsToModify.id===projectChanged.id &&
           fieldsToModify.creationDate===projectChanged.creationDate)
            alert(`The project was ${isEdit ? "edited" : "created"} successfully.`);
        else alert(`An error occurred. The project was not ${isEdit ? "edited" : "created"} correctly.`)
        setSubmitted(false);
      }
    })
    

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="projectName">Project Name</label>
                <input id="projectName" value={fieldsToModify.projectName} onChange={handleChange} type="text"/>
                <label htmlFor="description">Description</label>
                <input id="description" value={fieldsToModify.description} onChange={handleChange} type="text"/>
                <label htmlFor="projectManager">Project Manager</label>
                <div className="selectWrapper">
                    <div className="selectArrow"></div>
                    <select id="projectManager" value={fieldsToModify.projectManager} onChange={handleChange}>
                    <option value="">Select a person</option>
                    {
                        projectManagers.map((item) => {
                            return(<option key={item} value={item}>{item}</option>)
                        })
                    }
                    </select>
                </div>
                <label htmlFor="assignedTo">Assigned To</label>
                <div className="selectWrapper">
                    <div className="selectArrow"></div>
                    <select id="assignedTo" value={fieldsToModify.assignedTo} onChange={handleChange}>
                    <option value="">Select a person</option>
                    {
                        employeesToAssign.map((item) => {
                            return(<option key={item} value={item}>{item}</option>)
                        })
                    }
                    </select>
                </div>
                
                <label htmlFor="status">Assigned To</label>
                <div className="selectWrapper">
                    <div className="selectArrow"></div>
                    <select id="status" value={fieldsToModify.status} onChange={handleChange}>
                    {
                        statuses.map((item) => {
                            return(<option key={item} value={item}>{item}</option>)
                        })
                    }
                    </select>
                </div>
                
                <input className="strongButton" type="submit" value={isEdit ?"Save Changes" : "Create Project"}/>
            </form>
            
        </>
    )
}

export default Form;