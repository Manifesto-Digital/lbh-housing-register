import { useRouter } from 'next/router';
import { useMemo } from 'react';
import Button, { ButtonLink } from '../../components/button';
import { HeadingOne } from '../../components/content/headings';
import Paragraph from '../../components/content/paragraph';
import Layout from '../../components/layout/resident-layout';
import SummaryList, {
  SummaryListActions as Actions,
  SummaryListKey as Key,
  SummaryListRow as Row,
} from '../../components/summary-list';
import Tag from '../../components/tag';
import ApplicantName from '../../components/application/ApplicantName';
import { Applicant } from '../../domain/HousingApi';
import whenAgreed from '../../lib/hoc/whenAgreed';
import { useAppSelector } from '../../lib/store/hooks';
import { checkEligible } from '../../lib/utils/form';
import { applicationStepsRemaining } from '../../lib/utils/resident';

const ApplicationPersonsOverview = (): JSX.Element => {
  const router = useRouter();

  const applicants = useAppSelector((store) =>
    [store.application.mainApplicant, store.application.otherMembers]
      .filter((v): v is Applicant | Applicant[] => v !== undefined)
      .flat()
  );
  const eligibilityMap = useMemo(
    () =>
      new Map(
        applicants.map((applicant) => [applicant, checkEligible(applicant)[0]])
      ),
    [applicants]
  );

  const mainApplicant = useAppSelector(
    (store) => store.application.mainApplicant
  );

  const breadcrumbs = [
    {
      href: '/apply/overview',
      name: 'Application',
    },
  ];

  const submitApplication = async () => {
    // TODO: perform update on application

    router.push('/apply/confirmation');
  };

  return (
    <Layout pageName="Application overview" breadcrumbs={breadcrumbs}>
      <HeadingOne content="Application tasks" />

      <SummaryList>
        {applicants.map((applicant, index) => {
          const tasksRemaining = applicationStepsRemaining(
            applicant,
            applicant === mainApplicant
          );
          const isEligible = eligibilityMap.get(applicant);
          return (
            <Row key={index} verticalAlign="middle">
              <Key>
                <ApplicantName
                  applicant={applicant}
                  isMainApplicant={applicant === mainApplicant} />
              </Key>
              <Actions>
                {!isEligible ? (
                  <Tag content="Not eligible" variant="red" />
                ) : tasksRemaining == 0 ? (
                  <Tag content="Completed" variant="green" />
                ) : (
                  <Tag content=
                    {`${tasksRemaining} task${tasksRemaining > 1 ? 's' : ''} to do`}
                  />
                )}
              </Actions>
            </Row>
          );
        })}
      </SummaryList>

      <ButtonLink href="/apply/household" secondary={true}>
        Edit my household
      </ButtonLink>

      {applicants.every(
        (applicant) =>
          applicationStepsRemaining(applicant, applicant === mainApplicant) == 0
      ) && (
          <>
            <Paragraph>
              Please make sure you have checked your answers for each applicant.
            </Paragraph>
            <Button onClick={submitApplication}>Submit application</Button>
          </>
        )}
    </Layout>
  );
};

export default whenAgreed(ApplicationPersonsOverview);
