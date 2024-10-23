export const user = {
    id: '',
    username: '',
    email: '',
    password: '',
    role: '',
    createdBy: '',
    modifiedBy: ''
}

export const buildUserDTO = (obj) => {
    const userDTO = {...user};
    userDTO.id = obj?.id;
    userDTO.username = obj?.username;
    userDTO.email = obj?.email;
    userDTO.password = obj?.password;
    userDTO.role = obj?.role;
    userDTO.createdBy = obj?.createdBy;
    userDTO.modifiedBy = obj?.modifiedBy;

    return userDTO;
}