import { MultiStepForm } from '../../lib/types/form';
import { FormID } from '../../lib/utils/form-data';

const employment: MultiStepForm = {
  id: FormID.EMPLOYMENT,
  heading: 'Employment',
  steps: [
    {
      fields: [
        {
          as: 'radios',
          label: 'Which describes your employment status?',
          hint: 'If more than one applies, select the option that applies the most',
          name: 'employment',
          options: [
            {
              label: 'Employed',
              value: 'employed',
            },
            {
              label: 'Self-employed',
              value: 'selfemployed',
            },
            {
              label: 'Full time student',
              value: 'fulltimestudent',
            },
            {
              label: 'Unemployed',
              value: 'unemployed',
            },
            {
              label: 'Retired',
              value: 'retired',
            },
          ],
          validation: {
            required: true,
          },
        },
        {
          title: 'Accommodation address',
          label: 'Postcode',
          name: 'address-finder',
          validation: {
            required: false,
          },
          conditionalDisplay: [
            {
              field: 'employment',
              is: 'fulltimestudent',
            },
          ],
        },
        {
          as: 'dateinput',
          label: 'When will you complete your course?',
          name: 'course-completion-date',
          hint: 'For example, 3 2023',
          showDay: false,
          options: [
            {
              label: 'Month',
              value: 'month',
            },
            {
              label: 'Year',
              value: 'year',
            },
          ],
          validation: {
            required: false,
          },
          conditionalDisplay: [
            {
              field: 'employment',
              is: 'fulltimestudent',
            },
          ],
        },
        {
          name: 'proof-of-income-employeed',
          as: 'announcement',
          label: '',
          title: 'Proof of income required',
          content:
            'After submitting yor application, you will be asked to upload copies of the following documents:',
          list: [
            'If you get paid weekly, we will need your last 5 pay slips',
            'If you get paid monthly, we will need your last 2 pay slips',
          ],
          validation: {
            required: false,
          },
          conditionalDisplay: [
            {
              field: 'employment',
              is: 'employed',
            },
          ],
        },
        {
          name: 'proof-of-income-self-employeed',
          as: 'announcement',
          label: '',
          title: 'Proof of income required',
          content:
            'After submitting your application, you will be asked to upload the following documents:',
          list: [
            "Self-assessment or company accounts from HMRC showing your last 12 months' income",
          ],
          validation: {
            required: false,
          },
          conditionalDisplay: [
            {
              field: 'employment',
              is: 'selfemployed',
            },
          ],
        },
        {
          name: 'proof-of-income-retired',
          as: 'announcement',
          label: '',
          title: 'Proof of income required',
          content:
            'After submitting your application, you will be asked to upload the following documents:',
          list: [
            'Your state pension statement for the last year',
            'Any private pension statements for the last year',
          ],
          validation: {
            required: false,
          },
          conditionalDisplay: [
            {
              field: 'employment',
              is: 'retired',
            },
          ],
        },
      ],
    },
  ],
};

export default employment;
