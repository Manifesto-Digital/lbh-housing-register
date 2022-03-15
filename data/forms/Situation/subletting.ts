import { MultiStepForm } from '../../../lib/types/form';
import { FormID } from '../../../lib/utils/form-data';

const subletting: MultiStepForm = {
  id: FormID.SUBLETTING,
  eligibility: [
    {
      field: 'subletting',
      is: 'yes',
      reasoning: 'haveSubletAccomodation',
    },
  ],
  steps: [
    {
      fields: [
        {
          as: 'radios',
          label: 'Have you sublet without permission?',
          name: 'subletting',
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
      fieldId: 'subletting',
      value: 'yes',
      nextFormId: 'exit',
    },
    {
      fieldId: 'subletting',
      value: 'no',
      nextFormId: 'exit',
    },
  ],
};

export default subletting;
