export const userDTO = {
    id: '',
    username: '',
    email: '',
    password: '',
    role: '',
    roleName: '',
    isAdmin: '',
    createdOn: Date.now(),
    updatedOn: Date.now(),
    createdBy: '',
    modifiedBy: ''
}

export const buildUserDTO = (obj) => {
    const userDTOObj = {...userDTO};
    userDTOObj.id = obj?.id;
    userDTOObj.username = obj?.username;
    userDTOObj.email = obj?.email;
    userDTOObj.password = obj?.password;
    userDTOObj.role = obj?.role;
    userDTOObj.roleName = obj?.role?.roleName;
    userDTOObj.isAdmin = obj?.role?.isAdmin;
    userDTOObj.createdOn = obj?.createdOn;
    userDTOObj.updatedOn = obj?.updatedOn;
    userDTOObj.createdBy = obj?.createdBy;
    userDTOObj.modifiedBy = obj?.modifiedBy;

    return userDTOObj;
}