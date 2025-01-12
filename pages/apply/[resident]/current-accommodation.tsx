import { FormikValues, getIn } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HeadingOne } from '../../../components/content/headings';
import Form from '../../../components/form/form';
import Layout from '../../../components/layout/resident-layout';
import withApplication from '../../../lib/hoc/withApplication';
import {
  applicantHasId,
  selectApplicant,
  updateWithFormValues,
  getQuestionsForFormAsValues,
} from '../../../lib/store/applicant';
import { useAppDispatch, useAppSelector } from '../../../lib/store/hooks';
import { FormID, getFormData } from '../../../lib/utils/form-data';
import Custom404 from '../../404';
import { Applicant } from '../../../domain/HousingApi';
import {
  ApiCallStatusCode,
  selectSaveApplicationStatus,
} from 'lib/store/apiCallsStatus';
import { scrollToError } from 'lib/utils/scroll';
import ErrorSummary from 'components/errors/error-summary';

const CurrentAccommodation = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { resident } = router.query as { resident: string };

  const applicant = useAppSelector(selectApplicant(resident)) as Applicant;
  const [activeStepID, setActiveStepId] = useState(
    FormID.CURRENT_ACCOMMODATION
  );

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [userError, setUserError] = useState<string | null>(null);
  const saveApplicationStatus = useAppSelector(selectSaveApplicationStatus);
  const [isLastFormPageSubmit, setIsLastFormPageSubmit] = useState<boolean>(
    false
  );

  useEffect(() => {
    if (saveApplicationStatus?.callStatus === ApiCallStatusCode.FULFILLED) {
      setIsSaving(false);
      if (isLastFormPageSubmit) {
        router.push(baseHref);
      }
    }
    if (saveApplicationStatus?.callStatus === ApiCallStatusCode.REJECTED) {
      setIsSaving(false);
      setUserError('Unable to save application');
      scrollToError();
    }
  }, [saveApplicationStatus?.callStatus]);

  if (!applicantHasId(applicant)) {
    return <Custom404 />;
  }

  const initialValues: FormikValues = getQuestionsForFormAsValues(
    activeStepID,
    applicant
  );

  const formData = getFormData(activeStepID);

  const baseHref = `/apply/${applicant.person?.id}`;
  const returnHref = '/apply/overview';

  const breadcrumbs = [
    {
      id: 'apply-overview',
      href: returnHref,
      name: 'Application',
    },
    {
      id: 'apply-person',
      href: baseHref,
      name: applicant.person?.firstName || '',
    },
    {
      id: 'apply-person-current-accommodation',
      href: `${baseHref}/current-accommodation`,
      name: `Current accommodation`,
    },
  ];

  const nextStep = (values: FormikValues) => {
    const { nextFormId } = formData.conditionals?.find(
      (element) => getIn(values, element.fieldId) === element.value
    ) ?? { nextFormId: 'exit' };

    if (nextFormId === 'exit') {
      setIsLastFormPageSubmit(true);
      return;
    }

    setActiveStepId(nextFormId);
  };

  const onSave = (values: FormikValues) => {
    setIsSaving(true);
    dispatch(
      updateWithFormValues({
        formID: activeStepID,
        personID: applicant.person!.id!,
        values,
        markAsComplete: true,
      })
    );
  };

  return (
    <Layout pageName="Current accommodation" breadcrumbs={breadcrumbs}>
      <HeadingOne content="Current accommodation" />
      {userError && (
        <ErrorSummary dataTestId="test-agree-terms-error-summary">
          {userError}
        </ErrorSummary>
      )}
      <Form
        // Intentional key outside of an array. Force a fresh form component when we change steps to avoid values persisting between forms.
        initialValues={initialValues}
        key={activeStepID}
        buttonText="Save and continue"
        formData={formData}
        onSave={onSave}
        onSubmit={nextStep}
        isSavingToDatabase={isSaving}
      />
    </Layout>
  );
};

export default withApplication(CurrentAccommodation);
