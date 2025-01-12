import { Field, FieldArray, FieldInputProps, FieldMetaProps } from 'formik';
import {
  BaseFormField,
  CheckboxesFormField,
  FormFieldOption,
} from '../../lib/types/form';
import Details from '../details';
import ErrorMessage from './error-message';
import FormGroup from './form-group';
import Hint from './hint';
import Label from './label';

interface CheckboxProps extends BaseFormField {
  index?: number;
  value: string;
}

export function Checkbox({
  hint,
  index,
  label,
  name,
  value,
}: CheckboxProps): JSX.Element {
  let id = name;

  if (index) {
    id += `.${index}`;
  }

  return (
    <div className="govuk-checkboxes__item">
      <Field
        className="govuk-checkboxes__input"
        type="checkbox"
        id={id}
        name={name}
        value={value}
        data-testid={`test-checkbox-${name}-${index}`}
      />
      <Label
        className="govuk-checkboxes__label"
        content={label || value}
        htmlFor={id}
      />

      {hint && <Hint className="govuk-checkboxes__hint" content={hint} />}
    </div>
  );
}

export interface CheckboxesProps extends CheckboxesFormField {
  value: string;
}

export default function Checkboxes({
  hint,
  details,
  label,
  options,
  name,
  value,
  hideLabel,
}: CheckboxesProps): JSX.Element {
  const checkboxes: FormFieldOption[] = options || [{ hint, label, value }];
  const hasMultipleOptions: boolean = checkboxes.length > 1;

  return (
    <Field name={name}>
      {({
        field,
        meta,
      }: {
        field: FieldInputProps<string>;
        meta: FieldMetaProps<string>;
      }) => (
        <FormGroup error={!!meta.touched && !!meta.error}>
          {hasMultipleOptions && label && (
            <Label content={label} strong={true} hideLabel={hideLabel} />
          )}
          {hasMultipleOptions && hint && <Hint content={hint} />}
          {hasMultipleOptions && details && (
            <Details summary={details.title ?? 'Help with this question'}>
              {details.content}
            </Details>
          )}
          {meta.touched && meta.error && <ErrorMessage message={meta.error} />}

          <div
            className="govuk-checkboxes lbh-checkboxes"
            role="group"
            aria-labelledby="checkbox-group"
          >
            <FieldArray
              name={field.name}
              render={() => (
                <>
                  {checkboxes.map((checkbox, index) => (
                    <Checkbox
                      key={index}
                      index={index}
                      hint={checkbox.hint}
                      label={checkbox.label!}
                      name={field.name}
                      value={checkbox.value}
                      hideLabel={hideLabel}
                    />
                  ))}
                </>
              )}
            />
          </div>
        </FormGroup>
      )}
    </Field>
  );
}
