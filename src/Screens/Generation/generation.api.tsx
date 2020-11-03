import GenerationModel from "../../models/generation.model";
import { ErrorHandler } from "../../helpers";
import apiClient from "../../api";

/**
 * get list of generations for the given user
 * @returns {Array<Generations>} - return list of generation with peoples
 */
export async function apiGetGenerations(
  setToastVisible: Function,
  familyId: number
) {
  try {
    const response = await apiClient.get(`/families/${familyId}/generations`);
    const generations = response.data;
    if (generations) {
      return generations.map(
        (Generation: any) => new GenerationModel(Generation)
      );
    }
  } catch (err) {
    ErrorHandler(
      err,
      setToastVisible,
      "We can't access the generation's list."
    );
  }
}

/**
 * post new generation for the given user
 * @param {Function} setToastVisible - function to load modal
 * @param {Object} gen - generation's data
 * @param {Number} familyId - id of the family to create a new generation
 * @returns return 201 if new generation created successfully
 */

export async function apiCreateGeneration(
  setToastVisible: Function,
  gen: { position: number },
  familyId: number
) {
  try {
    const response = await apiClient.post(`/families/${familyId}/generations`, {
      position: gen.position,
    });

    if (response) {
      return response;
    }
  } catch (err) {
    ErrorHandler(err, setToastVisible, "We can't create a new generation.");
  }
}

/**
 * delete a generation for the given user by id
 * @param {Function} setToastVisible - function to load modal
 * @param {Number} familyId - id of the family
 * @param {Number} generationId - id of the generation to delete
 * @returns return 204 if generation deleted successfully
 */

export async function apiDeleteGeneration(
  setToastVisible: Function,
  familyId: number,
  generationId: number
) {
  try {
    const response = await apiClient.delete(
      `/families/${familyId}/generations/${generationId}`
    );

    if (response) return response.data;
  } catch (err) {
    ErrorHandler(err, setToastVisible, "We can't delete this generation.");
  }
}
