import { UserRole } from './user.role';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const UserRoles = (...roles: UserRole[]) =>
  SetMetadata(ROLES_KEY, roles);
