import { Fragment, useState } from 'react';
import Link from 'next/link';
import { ButtonLink } from '../../components/button';
import { HeadingOne } from '../../components/content/headings';
import Paragraph from '../../components/content/paragraph';
import Layout from '../../components/layout/resident-layout';
import SummaryList, {
  SummaryListActions as Actions,
  SummaryListKey as Key,
  SummaryListRow as Row,
} from '../../components/summary-list';
// import Tag from '../../components/tag';

import ApplicantSummary from '../../components/application/ApplicantSummary';
import { Applicant } from '../../domain/HousingApi';
import { useAppSelector } from '../../lib/store/hooks';
import { applicationSteps } from '../../lib/utils/resident';
import withApplication from '../../lib/hoc/withApplication';

const ApplicationPersonsOverview = (): JSX.Element => {
  const [applicantsCompleted, setApplicantsCompleted] = useState(0);
  const breadcrumbs = [
    {
      href: '/apply/overview',
      name: 'Application',
    },
  ];

  const mainResident = useAppSelector((s) => s.application.mainApplicant);
  if (!mainResident) {
    return <Fragment />;
  }

  const application = useAppSelector((store) => store.application);
  const applicants = useAppSelector((store) =>
    [store.application.mainApplicant, store.application.otherMembers]
      .filter((v): v is Applicant | Applicant[] => v !== undefined)
      .flat()
  );

  return (
    <Layout pageName="Application overview" breadcrumbs={breadcrumbs}>
      <HeadingOne content="Provide information about your household" />
      <Paragraph>
        You’ve completed information for {applicantsCompleted} of{' '}
        {applicants.length} people.
      </Paragraph>

      <SummaryList>
        {applicants.map((applicant, index) => {
          const tasks = applicationSteps(
            applicant,
            applicant === application.mainApplicant
          );
          return (
            <Row key={index} verticalAlign="middle">
              <Key>
                <ApplicantSummary
                  applicant={applicant}
                  isMainApplicant={applicant === application.mainApplicant}
                  mainApplicantCompleted={
                    applicationSteps(mainResident, true).remaining === 0
                  }
                  applicantNumber={index + 1}
                  tasks={tasks}
                />
              </Key>
              {/* <Actions>
                {tasksRemaining == 0 ? (
                  <Tag content="Completed" variant="green" />
                ) : (
                  <Tag
                    content={`${tasksRemaining} task${
                      tasksRemaining > 1 ? 's' : ''
                    } to do`}
                  />
                )}
              </Actions> */}
            </Row>
          );
        })}
      </SummaryList>

      <Paragraph>
        <Link href="/apply/household">
          <a className="lbh-body-s lbh-link lbh-link--no-visited-state ">
            Edit my household
          </a>
        </Link>
      </Paragraph>

      {applicants.every(
        (applicant) =>
          applicationSteps(applicant, applicant === application.mainApplicant)
            .remaining == 0
      ) && (
        <>
          <Paragraph>
            Please make sure you have checked your answers for each applicant.
          </Paragraph>
          <ButtonLink href="/apply/submit/additional-questions">
            Save and continue
          </ButtonLink>
        </>
      )}
    </Layout>
  );
};

export default withApplication(ApplicationPersonsOverview);
