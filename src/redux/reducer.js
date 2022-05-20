import { CREATE_PROJECT,EDIT_PROJECT, DELETE_PROJECT, CHANGE_PROJECT_FIELDS } from "./actions";

const blankFields = {
    creationDate:"",
    projectName:"",
    description:"",
    projectManager:"",
    assignedTo:"",
    status:"Enabled",
    assignedToImage:'./images/Ellipse46.png'
}

const initialState = {
    projects:[
        {
            id:1,
            creationDate:new Date("Wed Sep 9 2020 10:30:00 GMT-0300 (hora estándar de Argentina)"),
            projectName:"Landing Page",
            description:"Some description",
            projectManager:"Walt Cosani",
            assignedTo:"Ignacio Truffa",
            status:"Enabled",
            assignedToImage:'./images/Ellipse46.png'
        }
    ],
    fieldsToModify: blankFields,
    projectManagers: ["Walt Cosani", "John Smith", "Mary Perez"],
    employeesToAssign: ["Ignacio Truffa", "Javier Sotomayor", "Clara Calcagno"],
    statuses:["Enabled", "Disabled"]
}

export function reducer(state=initialState, action){
    switch(action.type){
        case CREATE_PROJECT:
            let projectsValue = new Array(...state.projects);
            projectsValue.push(action.newProject);
            return Object.assign({},state,{projects:projectsValue});
        case EDIT_PROJECT:
            let projectsToEdit = new Array(...state.projects);
            let editIndex
            projectsToEdit.forEach((item, index)=>{
                if(item.id===action.id) editIndex = index;
            });
            projectsToEdit[editIndex] = {...action.editedProject};
            return Object.assign({},state,{projects:projectsToEdit});
        case DELETE_PROJECT:
            let projectsToDeleteFrom = new Array(...state.projects);
            let deleteIndex;
            projectsToDeleteFrom.forEach((item, index)=>{
                if(item.id===action.id) deleteIndex = index;
            })
            projectsToDeleteFrom.splice(deleteIndex,1);
            return Object.assign({},state,{projects:projectsToDeleteFrom})
        default:
            return state; 
    }
}