import { MultiStepForm } from '../../../lib/types/form';
import { FormID } from '../../../lib/utils/form-data';

const currentAccommodation: MultiStepForm = {
  id: FormID.CURRENT_ACCOMMODATION,
  heading: 'Current accommodation',
  steps: [
    {
      fields: [
        {
          as: 'radios',
          label: 'What best describes your current living situation?',
          name: 'living-situation',
          options: [
            {
              label: 'Owner occupier',
              value: 'owner-occupier',
            },
            {
              label: 'Private rental',
              value: 'private-rental',
            },
            {
              label: 'Council tenant',
              value: 'council-tenant',
            },
            {
              label: 'Housing Association tenant',
              value: 'housing-association-tenant',
            },
            {
              label: 'B&B, Hotel or Hostel',
              value: 'b&b-hotel-hostel',
            },
            {
              label: 'Tied accommodation',
              value: 'tied-accommodation',
            },
            {
              label: 'Temporary accommodation',
              value: 'temp-accomodation',
            },
            {
              label: 'Living with parents',
              value: 'living-with-parents',
            },
            {
              label: 'Living with relatives',
              value: 'living-with-relatives',
            },
            {
              label: 'Living with friends',
              value: 'living-with-friends',
            },
            {
              label: 'Lodger',
              value: 'lodger',
            },
            {
              label: 'Squatter',
              value: 'squatter',
            },
            {
              label: 'Unauthorised occupant',
              value: 'unauthorised-occupant',
            },
            {
              label: 'No fixed abode',
              value: 'no-fixed-abode',
            },
          ],
          validation: {
            required: true,
          },
        },
      ],
    },
    {
      fields: [
        {
          as: 'radios',
          label: 'What best describes your home?',
          name: 'home',
          options: [
            {
              label: 'House',
              value: 'house',
            },
            {
              label: 'Flat',
              value: 'flat',
            },
            {
              label: 'Flat above a shop',
              value: 'flat-above-shop',
            },
            {
              label: 'Maisonnette',
              value: 'maisonnette',
            },
            {
              label: 'Bungalow',
              value: 'bungalow',
            },
            {
              label: 'Hotel or hostel',
              value: 'hotel-hostel',
            },
            {
              label: 'Boat',
              value: 'boat',
            },
            {
              label: 'Caravan',
              value: 'caravan',
            },
            {
              label: 'Studio',
              value: 'studio',
            },
            {
              label: 'Other',
              value: 'other',
            },
          ],
          validation: {
            required: true,
          },
        },
      ],
    },
    {
      fields: [
        {
          label: 'What floor is your home on?',
          name: 'home-floor',
          hint: 'For example, ground floor, or ground and first floor’',
          validation: {
            required: true,
          },
        },
        {
          type: 'number',
          min: 0,
          label: 'How many people do you share your home with?',
          name: 'home-how-many-people-share',
          hint: 'For example, 1',
          validation: {
            required: true,
          },
        },
        {
          type: 'number',
          min: 0,
          label:
            'How many bedrooms do you and the people in your application have access to?',
          name: 'home-how-many-bedrooms',
          hint: 'For example, 1',
          validation: {
            required: true,
          },
        },
        {
          type: 'number',
          min: 0,
          label:
            'How many living rooms do you and the people in your application have access to?',
          name: 'home-how-many-livingrooms',
          hint: 'For example, 1',
          validation: {
            required: true,
          },
        },
        {
          type: 'number',
          min: 0,
          label:
            'How many dining rooms do you and the people in your application have access to?',
          name: 'home-how-many-diningrooms',
          hint: 'For example, 1',
          validation: {
            required: true,
          },
        },
        {
          type: 'number',
          min: 0,
          label: 'How many bathrooms do you have access to?',
          name: 'home-how-many-bathrooms',
          hint: 'For example, 1',
          validation: {
            required: true,
          },
        },
        {
          type: 'number',
          min: 0,
          label: 'How many kitchens do you have access to?',
          name: 'home-how-many-kitchens',
          hint: 'For example, 1',
          validation: {
            required: true,
          },
        },
        {
          label: 'What other rooms do you have access to?',
          name: 'home-how-many-other-rooms',
          hint: 'Please specify any other rooms you have access to, for example: play room, office',
          validation: {
            required: true,
          },
        },
      ],
    },
    {
      fields: [
        {
          as: 'textarea',
          label: 'Please describe why your current home is unsuitable',
          name: 'why-home-unsuitable',
          validation: {
            required: true,
          },
        },
      ],
    },
  ],
  conditionals: [
    {
      fieldId: 'living-situation',
      value: 'tied-accommodation',
      nextFormId: FormID.CURRENT_ACCOMMODATION_LANDLORD_DETAILS,
    },
    {
      fieldId: 'living-situation',
      value: 'b&b-hotel-hostel',
      nextFormId: FormID.CURRENT_ACCOMMODATION_LANDLORD_DETAILS,
    },
    {
      fieldId: 'living-situation',
      value: 'private-rental',
      nextFormId: FormID.CURRENT_ACCOMMODATION_LANDLORD_DETAILS,
    },
    {
      fieldId: 'living-situation',
      value: 'squatter',
      nextFormId: FormID.CURRENT_ACCOMMODATION_LANDLORD_DETAILS,
    },
    {
      fieldId: 'living-situation',
      value: 'unauthorised-occupant',
      nextFormId: FormID.CURRENT_ACCOMMODATION_LANDLORD_DETAILS,
    },
    {
      fieldId: 'living-situation',
      value: 'temp-accomodation',
      nextFormId: FormID.CURRENT_ACCOMMODATION_LANDLORD_DETAILS,
    },
    {
      fieldId: 'living-situation',
      value: 'owner-occupier',
      nextFormId: FormID.CURRENT_ACCOMMODATION_LANDLORD_DETAILS,
    },
    {
      fieldId: 'living-situation',
      value: 'lodger',
      nextFormId: FormID.CURRENT_ACCOMMODATION_HOST_DETAILS,
    },
    {
      fieldId: 'living-situation',
      value: 'living-with-parents',
      nextFormId: FormID.CURRENT_ACCOMMODATION_HOST_DETAILS,
    },
    {
      fieldId: 'living-situation',
      value: 'living-with-friends',
      nextFormId: FormID.CURRENT_ACCOMMODATION_HOST_DETAILS,
    },
    {
      fieldId: 'living-situation',
      value: 'living-with-relatives',
      nextFormId: FormID.CURRENT_ACCOMMODATION_HOST_DETAILS,
    },
    {
      fieldId: 'living-situation',
      value: 'no-fixed-abode',
      nextFormId: FormID.CURRENT_ACCOMMODATION_HOST_DETAILS,
    },
  ],
};
export default currentAccommodation;
