import { UsersTable } from './users.table';
import { PermissionsTable } from './permissions.table';
import { RolesTable } from './roles.table';
import { CoursesTable } from './courses.table';

// Wrapper class
export class AuthDataContext {
  public static users: any = UsersTable.users;
  public static roles: any = RolesTable.roles;
  public static permissions = PermissionsTable.permissions;
  public static courses: any = CoursesTable.courses
}
