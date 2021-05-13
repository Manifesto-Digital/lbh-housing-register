import { Store as ReduxStore } from "../store"
import { updateFormDataForResident } from "../store/additionalResidents"
import { MAIN_RESIDENT_KEY, updateFormData } from "../store/resident"
import { ApplicationStep, ApplicationSteps } from "../types/application"
import { FormData } from "../types/form"
import { Resident } from "../types/resident"
import { Store } from "redux"
import { IMMIGRATION_STATUS, PERSONAL_DETAILS, YOUR_SITUATION } from "./form-data"

/**
 * Generate a slug from an input
 * @param {string} input The input value we wish to modify
 * @returns {string} The modified value
 */
export const generateSlug = (input: string): string => {
  return encodeURI(input.toLowerCase().replaceAll(' ', '-'))
}

/**
 * Get the resident
 * @param {string} slug The ID/slug of the resident
 * @param {Store} store The redux store
 * @returns {Resident | undefined} The resident (if found)
 */
export const getResident = (slug: string, store: ReduxStore): Resident | undefined => {
  if (slug == MAIN_RESIDENT_KEY) {
    return store.resident
  }
  else {
    const matches = store.additionalResidents.filter(resident => resident.slug == slug)
    if (matches.length > 0) {
      return matches[0]
    }
  }
}

export const getApplicationStepsForResident = (resident: Resident): ApplicationSteps[] => {
  if (isMainResident(resident)) {
    return [
      {
        heading: "Identity",
        steps: [
          {
            heading: "Immigration status",
            id: IMMIGRATION_STATUS
          },
          {
            heading: "Personal details",
            id: PERSONAL_DETAILS
          }
        ]
      },
      {
        heading: "Test",
        steps: [
          {
            heading: "Your situation",
            id: YOUR_SITUATION
          }
        ]
      }
    ]
  }
  else {
    return [
      {
        heading: "Identity",
        steps: [
          {
            heading: "Immigration status",
            id: IMMIGRATION_STATUS
          },
          {
            heading: "Personal details",
            id: PERSONAL_DETAILS
          }
        ]
      }
    ]
  }
}

/**
 * Check to see if the resident is the main applicant
 * @param {Resident} resident The resident we are interrogating
 * @returns {boolean}
 */
export const isMainResident = (resident: Resident): boolean => {
  return resident.slug == MAIN_RESIDENT_KEY
}

/**
 * Update the form data for the given resident
 * @param {Store} store The redux store
 * @param {Resident} resident The resident we wish to update
 * @param {FormData} data The data we are updating
 */
export const updateResidentsFormData = (store: Store, resident: Resident, data: FormData): void => {
  if (isMainResident(resident)) {
    store.dispatch(updateFormData(data))
  }
  else {
    resident = { ...resident }
    resident.formData = { ... resident.formData, data }
    store.dispatch(updateFormDataForResident(resident))
  }
}