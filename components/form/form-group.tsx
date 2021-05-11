import { ReactNodeArray } from "react";

interface FormGroupProps {
  children: ReactNodeArray
  error?: boolean
}

export default function FormGroup({ children, error }: FormGroupProps): JSX.Element {
  return (
    <div className={`${error && "govuk-form-group--error"} govuk-form-group lbh-form-group`}>
      {children}
    </div>
  )
}