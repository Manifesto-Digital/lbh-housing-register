import { MultiStepForm } from '../../lib/types/form';
import { FormID } from '../../lib/utils/form-data';

const yourSituation: MultiStepForm = {
  id: FormID.YOUR_SITUATION,
  heading: 'Your situation',
  copy: 'Help us determine if you need alternative support from the Council',
  steps: [
    {
      fields: [
        {
          as: 'checkboxes',
          hint: 'Select all that apply',
          label: 'Are you in danger from any of the following?',
          name: 'your-situation',
          options: [
            {
              label: 'Domestic violence',
              value: 'domestic-violence',
            },
            {
              label: 'Harassment',
              value: 'harassment',
            },
            {
              label: 'Homelessness',
              value: 'homelessness',
            },
            {
              label: 'Something else',
              value: 'other',
            },
            {
              label: 'None of the above apply to me',
              value: 'none',
            },
          ],
          validation: {
            required: true,
          },
        },
      ],
    },
  ],
};
export default yourSituation;
