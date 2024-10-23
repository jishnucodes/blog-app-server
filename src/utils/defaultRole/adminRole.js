// seedRoles.js

import mongoose from 'mongoose';
import Role from '../../models/roleModel.js';

export const checkAndCreateDefaultRoles = async () => {
    try {
        
        const defaultRoles = [
            { roleName: 'admin', isAdmin: true },
            { roleName: 'user', isAdmin: false },
        ];

        for (const role of defaultRoles) {
            const existingRole = await Role.findOne({ roleName: role.roleName });
            if (!existingRole) {
                await Role.create(role);
                console.log(`Created role: ${role.roleName}`);
            }
        }
    } catch (error) {
        console.error('Error seeding roles:', error);
    } 
};

