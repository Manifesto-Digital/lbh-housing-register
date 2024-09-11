import { faker } from '@faker-js/faker';

import { ApplicationStatus } from '../../../lib/types/application-status';
import { generateApplication } from '../../../testUtils/applicationHelper';
import ViewApplicationPage from '../../pages/viewApplication';

describe.skip('View a resident application', () => {
  it('does not show the assessment area for read only users', () => {
    cy.task('clearNock');

    const applicationId = faker.string.uuid();
    const personId = faker.string.uuid();
    const application = generateApplication(applicationId, personId);
    //ensure application requires assessment
    application.status = ApplicationStatus.SUBMITTED;

    cy.clearAllCookies();
    cy.loginAsUser('readOnly');

    ViewApplicationPage.mockActivityHistoryApi(applicationId);
    ViewApplicationPage.mockHousingRegisterApiGetApplications(
      applicationId,
      application
    );

    ViewApplicationPage.visit(applicationId);
    ViewApplicationPage.getAssessmentNavLink().should('not.exist');
  });
});
