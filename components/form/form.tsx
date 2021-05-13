import Button from "../button"
import DynamicField from "./dynamic-field"
import { HeadingTwo } from "../content/headings"
import { FormData, FormStep, MultiStepForm } from "../../lib/types/form"
import { getDisplayStateOfField, getInitialValuesFromMultiStepForm } from "../../lib/utils/form"
import { buildValidationSchema } from "../../lib/utils/validation"
import { Form as FormikForm, Formik } from "formik"
import { useState } from "react"
import Paragraph from "../content/paragraph"

interface FormProps {
  buttonText?: string
  formData: MultiStepForm
  onSave?: (values: FormData) => void
  onSubmit: (values: FormData, bag: any) => void
}

export default function Form({ buttonText, formData, onSave, onSubmit }: FormProps): JSX.Element {
  const [formDataSnapshot] = useState(formData)
  const [stepNumber, setStepNumber] = useState(0)
  const [snapshot, setSnapshot] = useState(getInitialValuesFromMultiStepForm(formDataSnapshot))

  const step: FormStep = formDataSnapshot.steps[stepNumber]
  const totalSteps: number = formDataSnapshot.steps.length
  const isLastStep: boolean = stepNumber === totalSteps - 1

  const next = (values: FormData): void => {
    // TODO: Scroll to top + set focus to first field
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = (values: FormData): void => {
    // TODO: Scroll to top + set focus to first field
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values: FormData, bag: any) => {
    if (onSave) {
      onSave(values);
    }

    if (isLastStep) {
      return onSubmit(values, bag);
    }
    else {
      bag.setTouched({});
      next(values);
    }
  };

  return (
    <>
      <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={buildValidationSchema(step.fields)}
      >
        {({ isSubmitting, values }) => (
          <FormikForm>
            {step.heading && <HeadingTwo content={step.heading} />}
            {step.copy && <Paragraph>{step.copy}</Paragraph>}
            
            {step.fields.map((field, index) => {
                const display: boolean = getDisplayStateOfField(field, values)
                if (display) {
                  return <DynamicField key={index} field={field} />
                }
            })}

            <div className="c-flex lbh-simple-pagination">
              {stepNumber > 0 && (
                <div className="c-flex__1">
                  <Button onClick={() => previous(values)} secondary={true} type="button">
                    Previous step
                  </Button>
                </div>
              )}

              <div className="c-flex__1 text-right">
                <Button disabled={isSubmitting} type="submit">
                  {buttonText ? buttonText : "Save"}
                </Button>
              </div>
            </div>
          </FormikForm>
        )}
      </Formik>
    </>
  )
}