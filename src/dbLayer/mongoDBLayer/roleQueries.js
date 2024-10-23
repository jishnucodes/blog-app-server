import Role from "../../models/roleModel.js"

const findRoleById = async (roleId) => {
  return await Role.findById(roleId).exec()
}

export {findRoleById}