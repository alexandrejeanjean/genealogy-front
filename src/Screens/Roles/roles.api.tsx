import RoleModel from "../../models/role.model";
import { ErrorHandler } from "../../helpers";
import apiClient from "../../api";

/**
 * get list of family roles
 * @returns {Array<Roles>} - return list of family roles
 */
export async function apiGetRoles(setToastVisible: Function) {
  try {
    const response = await apiClient.get(`/roles`);
    const roles = response.data;
    if (roles) {
      return roles.map((role: any) => new RoleModel(role));
    }
  } catch (err) {
    ErrorHandler(err, setToastVisible, "We can't access the role's list.");
  }
}
