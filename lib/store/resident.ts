import { checkEligible } from "../utils/form"
import { MainResident } from "../types/resident"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { generateSlug } from "../utils/resident"
import { MAIN_RESIDENT_KEY } from "../utils/constants"
import ApplicationAgreement from "../../components/application/agreement"


const initialState: MainResident = {
  hasAgreed: false,
  formData: {},
  isLoggedIn: false,
  username: "",
  name: "You",
  slug: MAIN_RESIDENT_KEY,
  applicationId: ""
}

const slice = createSlice({
  name: 'resident',
  initialState,
  reducers: {
    /**
     * Agree to terms and conditions
     * @param {MainResident} state The current state
     * @param {PayloadAction<boolean>} action The agreement state
     * @returns {MainResident} Updated resident state
     */
    agree: (state: MainResident, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasAgreed: action.payload,
      };
    },

    /**
     * Register the resident
     * @param {MainResident} state The current state
     * @param {PayloadAction<string>} action The residents name
     * @returns {MainResident} Updated resident state
     */
    createUser: (state: MainResident, action: any): any => {
      const resident: MainResident = {
        hasAgreed: false,
        isLoggedIn: false,
        username: action.payload.emailAddress, 
        formData: {
          "personal-details": action.payload
        },
        name: action.payload.firstName,
        slug: generateSlug(action.payload.firstName)
      }

      return {
        ...state,
        username: action.payload.emailAddress, 
        formData: resident
      }
    },

    /**
     * Log the resident in
     * @param {MainResident} state The current state
     * @param {PayloadAction<string>} action The residents name
     * @returns {MainResident} Updated resident state
     */
    logIn: (
      state: MainResident,
      action: PayloadAction<string>
    ): MainResident => {
      return {
        ...state,
        username: action.payload,
        isLoggedIn: true,
      };
    },

    /**
     * Log the resident out
     * @returns {MainResident} Initial resident state
     */
    logOut: (): MainResident => {
      return initialState;
    },

    /**
     * Update resident's form data
     * @param {MainResident} state The current state
     * @param {PayloadAction<{[key: string]: FormData}>} action The form data
     * @returns {MainResident} Updated resident state
     */
    updateFormData: (
      state: MainResident,
      action: PayloadAction<{ [key: string]: FormData }>
    ): MainResident => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };

      const eligibility = checkEligible(state.formData);
      state.isEligible = eligibility[0];
      state.ineligibilityReasons = eligibility[1];

      // Update name to reflect on the main overview page
      state.name = (state.formData.firstName && state.formData.lastName) ? state.formData.firstName + ' ' + state.formData.lastName : 'You'

      return state
    },

    startApplication: (state: MainResident, action: PayloadAction<{ [key: string]: FormData }>): any => {
      return {
        ...state, 
        applicationId: action.payload
      }
    },
  },
})

export default slice
export const { agree, createUser, logIn, logOut, updateFormData, startApplication } = slice.actions