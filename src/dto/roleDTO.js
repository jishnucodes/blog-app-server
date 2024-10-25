export const roleDTO = {
    id: '',
    roleName: '',
    isAdmin: '',
    createdOn: Date.now,
    updatedOn: Date.now,
    createdBy: '',
    modifiedBy: ''
}

export const buildRoleDTO = (obj) => {
    const roleDTOObj = {...roleDTO};
    roleDTOObj.id = obj?.id;
    roleDTOObj.roleName = obj?.roleName;
    roleDTOObj.isAdmin = obj?.isAdmin;
    roleDTOObj.createdOn = obj?.createdOn;
    roleDTOObj.updatedOn= obj?.updatedOn;
    roleDTOObj.createdBy = obj?.createdBy;
    roleDTOObj.modifiedBy = obj?.modifiedBy;

    return roleDTOObj;
}