export const CREATE_PROJECT = "CREATE_PROJECT";
export const EDIT_PROJECT = "EDIT_PROJECT";
export const DELETE_PROJECT = "DELETE_PROJECT";

export const createProject = (newProject) => {
    return {
        type: CREATE_PROJECT,
        newProject
    }
}

export const editProject = (id, editedProject) => {
    return {
        type: EDIT_PROJECT,
        id,
        editedProject
    }
}

export const deleteProject = (id) => {
    return {
        type: DELETE_PROJECT,
        id
    }
}