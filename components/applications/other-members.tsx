import { Applicant } from '../../domain/HousingApi';
import Collapsible from '../collapsible';

interface SummaryProps {
  heading: string;
  others: Applicant[];
}

export default function OtherMembers({
  heading,
  others,
}: SummaryProps): JSX.Element {
  return (
    <Collapsible heading={heading}>
      <dl className="govuk-summary-list lbh-summary-list">
        {others.map((applicant, index) => (
          <div key={index} className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Person {index + 1}</dt>
            <dd className="govuk-summary-list__value">
              <a className="govuk-link" href="#">
                {applicant.person?.title} {applicant.person?.firstName}{' '}
                {applicant.person?.surname}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </Collapsible>
  );
}
