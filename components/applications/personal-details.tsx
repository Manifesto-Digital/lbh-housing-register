import { Applicant } from '../../domain/HousingApi';
import { formatDob } from '../../lib/utils/dateOfBirth';
import { getGenderName } from '../../lib/utils/gender';
import Collapsible from '../collapsible';

interface SummaryProps {
  heading: string;
  applicant: Applicant;
}

export default function PersonalDetails({
  heading,
  applicant,
}: SummaryProps): JSX.Element {
  return (
    <Collapsible heading={heading}>
      <dl className="govuk-summary-list lbh-summary-list">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Name</dt>
          <dd className="govuk-summary-list__value">
            {applicant.person?.title} {applicant.person?.firstName}{' '}
            {applicant.person?.surname}
          </dd>
          <dd className="govuk-summary-list__actions">
            <ul className="govuk-summary-list__actions-list">
              <li className="govuk-summary-list__actions-list-item">
                <a className="govuk-link" href="#">
                  Edit<span className="govuk-visually-hidden"> name</span>
                </a>
              </li>
            </ul>
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Gender</dt>
          <dd className="govuk-summary-list__value">
            {getGenderName(applicant)}
          </dd>
          <span className="govuk-summary-list__actions"></span>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Date of birth</dt>
          <dd className="govuk-summary-list__value">
            {applicant.person?.dateOfBirth && formatDob(new Date(applicant.person?.dateOfBirth))}
          </dd>
          <span className="govuk-summary-list__actions"></span>
        </div>
      </dl>
    </Collapsible>
  );
}
