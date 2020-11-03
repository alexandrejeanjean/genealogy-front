import FamilyModel from "../../models/family.model";
import { ErrorHandler } from "../../helpers";
import apiClient from "../../api";

/**
 * get list of families for the given user
 * @returns {Array<Family>} - return list of families
 */

export async function apiGetFamilies(setToastVisible: Function) {
  try {
    const response = await apiClient.get("/families");
    const families = response.data;
    if (families) {
      return families.map((Family: any) => new FamilyModel(Family));
    }
  } catch (err) {
    ErrorHandler(err, setToastVisible, "We can't access to your families.");
  }
}

/**
 * post new family for the given user
 * @param {Function} setToastVisible - function to load modal
 * @param {Object} family - family datas
 * @returns return 201 if new family created successfully
 */

export async function apiCreateFamily(
  setToastVisible: Function,
  family: { name: string }
) {
  try {
    const response = await apiClient.post("/families", { name: family.name });
    if (response) {
      return response;
    }
  } catch (err) {
    ErrorHandler(err, setToastVisible, "We can't create your family.");
  }
}

/**
 * delete a family for the given user by id
 * @param {Function} setToastVisible - function to load modal
 * @param {number}  - "family id to delete"
 * @returns return 204 if family deleted successfully
 */

export async function apiDeleteFamily(
  setToastVisible: Function,
  familyId: number
) {
  try {
    const response = await apiClient.delete(`/families/${familyId}`);
    if (response) {
      return response;
    }
  } catch (err) {
    ErrorHandler(err, setToastVisible, "We can't delete this family.");
  }
}
