import { MultiStepForm } from '../../lib/types/form';
import { FormID } from '../../lib/utils/form-data';

const _testForm: MultiStepForm = {
  id: FormID._TEST_FORM,
  heading: 'Test data',
  steps: [
    {
      heading: 'Standard fields',
      copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam gravida, est eget imperdiet ornare, ipsum turpis interdum leo, ut eleifend purus justo nec sapien.',
      fields: [
        {
          hint: 'Is required, must be 2-10 characters',
          initialValue: 'something',
          label: 'Field 1 - Standard text input',
          name: 'step-1__1',
          placeholder: 'I have a placeholder',
          validation: {
            required: true,
            min: 2,
            max: 10,
          },
        },
        {
          hint: 'Must be a valid email',
          label: 'Field 2 - Email field',
          name: 'step-1__2',
          type: 'email',
        },
        {
          hint: 'Must be a valid number, less than or equal to 10',
          label: 'Field 3 - Number field',
          name: 'step-1__3',
          type: 'number',
          validation: {
            max: 10,
          },
        },
        {
          as: 'checkbox',
          hint: 'Required checkbox - must be selected',
          initialValue: true,
          label: 'Field 4 - Checkbox',
          name: 'step-1__4',
          validation: {
            required: true,
          },
        },
        {
          as: 'checkboxes',
          hint: 'Checkbox group - at least one must be selected, and no more than two',
          initialValue: ['item-2'],
          label: 'Field 5 - Checkboxes',
          name: 'step-1__5',
          options: [
            {
              value: 'item-1',
            },
            {
              hint: 'Item 2 has a hint also',
              label: 'Item 2 - with custom label',
              value: 'item-2',
            },
            {
              value: 'item-3',
            },
          ],
          validation: {
            required: true,
            min: 1,
            max: 2,
          },
        },
        {
          hint: 'Date field - required, and must be a valid date within January 2021',
          initialValue: '2021-01-01',
          label: 'Field 6 - Date field',
          name: 'step-1__6',
          as: 'dateinput',
          validation: {
            required: true,
            min: '2021-01-01',
            max: '2021-01-31',
          },
        },
        {
          as: 'radios',
          hint: 'Radio button group - required',
          initialValue: 'item-1',
          label: 'Field 7 - Radio buttons',
          name: 'step-1__7',
          options: [
            {
              value: 'item-1',
            },
            {
              hint: 'Item 2 has a hint also',
              label: 'Item 2 - with custom label',
              value: 'item-2',
            },
            {
              value: 'item-3',
            },
          ],
          validation: {
            required: true,
          },
        },
        {
          as: 'select',
          hint: 'Required select field',
          initialValue: 'item-3',
          label: 'Field 8 - Select',
          name: 'step-1__8',
          options: [
            {
              label: 'Default',
              value: '',
            },
            {
              value: 'item-1',
            },
            {
              value: 'item-2',
            },
            {
              label: 'item-3 - with custom label',
              value: 'item-3',
            },
          ],
          validation: {
            required: true,
          },
        },
        {
          as: 'textarea',
          hint: 'Textarea - required, must be between 10-200 characters',
          initialValue: 'Default value',
          label: 'Field 9 - Textarea',
          name: 'step-1__9',
          placeholder: 'I have a placeholder',
          validation: {
            required: true,
            min: 10,
            max: 200,
          },
        },
      ],
    },
    {
      heading: 'Conditional fields',
      copy: 'In hac habitasse platea dictumst. Proin gravida ligula vel tellus semper, sed aliquet libero aliquet. Nulla sit amet dui eget erat scelerisque vulputate vel vitae lacus.',
      fields: [
        {
          as: 'checkbox',
          initialValue: true,
          hint: "Will show 'Field 2' if selected",
          label: 'Field 1',
          name: 'step-2__1',
        },
        {
          conditionalDisplay: [
            {
              field: 'step-2__1',
              is: true,
            },
          ],
          hint: "Will only display if 'Field 1' is selected",
          label: 'Field 2',
          name: 'step-2__2',
        },
        {
          as: 'radios',
          hint: "Will show 'Field 4' when 'item-3' is not selected",
          initialValue: 'item-1',
          label: 'Field 3',
          name: 'step-2__3',
          options: [
            {
              value: 'item-1',
            },
            {
              value: 'item-2',
            },
            {
              value: 'item-3',
            },
          ],
        },
        {
          conditionalDisplay: [
            {
              field: 'step-2__3',
              isNot: 'item-3',
            },
          ],
          hint: "Will only show if 'Field 3' is not 'item-3'",
          label: 'Field 4',
          name: 'step-2__4',
        },
        {
          hint: "Shows 'Field 6' when populated",
          label: 'Field 5',
          name: 'step-2__5',
        },
        {
          conditionalDisplay: [
            {
              field: 'step-2__5',
              isNot: '',
            },
          ],
          hint: "Will only show when 'Field 5' has a value",
          label: 'Field 6',
          name: 'step-2__6',
        },
        {
          as: 'checkbox',
          hint: "If 'Field 7' and 'Field 8' have both been ticked, then 'Field 9' will be shown",
          label: 'Field 7',
          name: 'step-2__7',
        },
        {
          as: 'checkbox',
          hint: "If 'Field 7' and 'Field 8' have both been ticked, then 'Field 9' will be shown",
          label: 'Field 8',
          name: 'step-2__8',
        },
        {
          conditionalDisplay: [
            {
              field: 'step-2__7',
              is: true,
            },
            {
              field: 'step-2__8',
              is: true,
            },
          ],
          hint: "Shows when both 'Field 7' and 'Field 8' have been selected",
          label: 'Field 9',
          name: 'step-2__9',
        },
      ],
    },
  ],
};

export default _testForm;
