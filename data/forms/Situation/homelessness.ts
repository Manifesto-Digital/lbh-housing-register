import { MultiStepForm } from '../../../lib/types/form';
import { FormID } from '../../../lib/utils/form-data';

const homelessness: MultiStepForm = {
  id: FormID.HOMELESSNESS,
  eligibility: [
    {
      field: 'homelessness',
      is: 'yes',
      reasoning: 'intentionallyHomeless',
    },
  ],
  steps: [
    {
      fields: [
        {
          as: 'radios',
          label:
            'Have you been found to be intentionally homeless by any local housing authority (in accordance with the Housing Act 1996 Section 184) within the last two years?',
          name: 'homelessness',
          options: [
            {
              label: 'Yes',
              value: 'yes',
            },
            {
              label: 'No',
              value: 'no',
            },
          ],
          validation: {
            required: true,
          },
        },
      ],
    },
  ],
  conditionals: [
    {
      fieldId: 'homelessness',
      value: 'yes',
      nextFormId: 'exit',
    },
    {
      fieldId: 'homelessness',
      value: 'no',
      nextFormId: FormID.PROPERTY_OWNERSHIP,
    },
  ],
};

export default homelessness;
