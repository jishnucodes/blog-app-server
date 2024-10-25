 import bcrypt from 'bcrypt'
 
 export const passwordHashing = async (password) => {
    return await bcrypt.hash(password, 10);
}

export const hashedPasswordComparing = async (password, existingPassword) => {
    return await bcrypt.compare(password, existingPassword);
}