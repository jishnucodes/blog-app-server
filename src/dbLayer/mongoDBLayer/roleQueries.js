import { buildRoleDTO } from "../../dto/roleDTO.js";
import Role from "../../models/roleModel.js"

const findRoleById_Mongo = async (roleId) => {
   const role = await Role.findById(roleId).exec();
   if (role) {
    const response = buildRoleDTO(role);
    return response;
   }else{
    return;
   }
}

export {findRoleById_Mongo}