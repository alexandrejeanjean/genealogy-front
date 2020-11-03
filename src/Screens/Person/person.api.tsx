import GenerationModel from "../../models/generation.model";
import { ErrorHandler } from "../../helpers";
import apiClient from "../../api";

/**
 * post new person for the given generation
 * @param {Function} setToastVisible - function to load modal
 * @param {Object} datas - new person's data
 * @param {Number} familyId - id of the family to create a new person
 * @param {Number} generationId - id of the generation to create a new person
 * @param {Number} roleId - id of the person's role selected
 * @returns return 201 if new generation created successfully
 */

export async function apiCreatePerson(
  setToastVisible: Function,
  datas: {
    firstname: string;
    lastname: string;
    role: string;
  },
  familyId: number,
  generationId: number,
  roleId: string
) {
  try {
    const response = await apiClient.post(
      `/families/${familyId}/generations/${generationId}/peoples`,
      {
        firstname: datas.firstname,
        lastname: datas.lastname,
        roleId,
      }
    );
    if (response) return response;
  } catch (err) {
    ErrorHandler(err, setToastVisible, "We can't create this new person.");
  }
}

/**
 * delete a person for the given generation by id
 * @param {Function} setToastVisible - function to load modal
 * @param {Number} familyId - id of the family
 * @param {Number} generationId - id of the generation's person to delete
 * @param {Number} personId - id of the person to delete
 * @returns return 204 if person deleted successfully
 */

export async function apiDeletePerson(
  setToastVisible: Function,
  familyId: number,
  generationId: number,
  personId: number
) {
  try {
    const response = await apiClient.delete(
      `/families/${familyId}/generations/${generationId}/peoples/${personId}`
    );

    if (response) return response;
  } catch (err) {
    ErrorHandler(err, setToastVisible, "We can't delete this person.");
  }
}
