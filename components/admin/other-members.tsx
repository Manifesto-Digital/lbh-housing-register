import { Applicant } from '../../domain/HousingApi';
import { ButtonLink } from '../button';
import { formatDob, getAgeInYears } from '../../lib/utils/dateOfBirth';
import React, { useState } from 'react';
import { HeadingThree } from '../content/headings';
import { getGenderName } from '../../lib/utils/gender';
import capitalize from '../../lib/utils/capitalize';
import Dialog from '../dialog';
import Paragraph from '../content/paragraph';

interface SummaryProps {
  heading: string;
  others: Applicant[];
  applicationId: string;
  canEdit: boolean;
  handleDelete: (applicant: Applicant) => void;
}

export default function OtherMembers({
  heading,
  others,
  applicationId,
  canEdit,
  handleDelete,
}: SummaryProps): JSX.Element {
  const [showDeleteWarningDialog, setShowDeleteWarningDialog] = useState(false);
  const [applicantToDelete, setApplicantToDelete] = useState({} as Applicant);

  const handleDeleteDialog = (applicant: Applicant): void => {
    setApplicantToDelete(applicant);
    setShowDeleteWarningDialog(true);
  };

  return (
    <>
      <HeadingThree content={heading} />
      <table className="govuk-table lbh-table" style={{ marginTop: '1em' }}>
        <tbody className="govuk-table__body">
          {others.map((applicant, index) => (
            <tr key={index} className="govuk-table__row">
              <td className="govuk-table__cell">
                <ul className="lbh-list lbh-list--compressed">
                  <li>
                    <strong>
                      {applicant.person?.title} {applicant.person?.firstName}{' '}
                      {applicant.person?.surname}
                    </strong>{' '}
                    {getGenderName(applicant) !== ''
                      ? `(${getGenderName(applicant)})`
                      : ''}
                  </li>
                  <li>
                    {applicant.person?.relationshipType &&
                      capitalize(applicant.person?.relationshipType)}
                  </li>
                  <li>
                    {applicant.person?.dateOfBirth &&
                      formatDob(new Date(applicant.person?.dateOfBirth))}{' '}
                    {applicant.person?.dateOfBirth &&
                      `(age ${getAgeInYears(applicant)})`}
                  </li>
                </ul>

                <button
                  onClick={() => handleDeleteDialog(applicant)}
                  className="lbh-body-s lbh-link lbh-link--no-visited-state lbh-delete-link"
                >
                  Remove household member
                </button>

                <Dialog
                  isOpen={showDeleteWarningDialog}
                  title="Confirm delete"
                  onConfirmation={() => handleDelete(applicantToDelete)}
                  onCancel={() => setShowDeleteWarningDialog(false)}
                >
                  <Paragraph>
                    Are you sure you want to remove{' '}
                    {applicantToDelete.person?.title}{' '}
                    {applicantToDelete.person?.firstName}{' '}
                    {applicantToDelete.person?.surname}?
                  </Paragraph>
                </Dialog>
              </td>
              <td className="govuk-table__cell govuk-table__cell--numeric">
                {canEdit && (
                  <ButtonLink
                    additionalCssClasses="govuk-secondary lbh-button--secondary lbh-button--inline"
                    href={`/applications/edit/${applicationId}/${applicant.person?.id}/edit-household-member`}
                  >
                    Edit
                  </ButtonLink>
                )}
                <ButtonLink
                  additionalCssClasses="lbh-button--inline"
                  href={`/applications/view/${applicationId}/${applicant.person?.id}`}
                >
                  View
                </ButtonLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
