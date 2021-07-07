import { HeadingOne, HeadingTwo } from '../content/headings';
import Paragraph from '../content/paragraph';
import Form from '../form/form';
import { Store } from '../../lib/store';
import { ApplicationSteps } from '../../lib/types/application';
import { FormData } from '../../lib/types/form';
import { Resident } from '../../lib/types/resident';
import { getFormIdsFromApplicationSteps } from '../../lib/utils/application-forms';
import { getFormData } from '../../lib/utils/form-data';
import {
  hasResidentAnsweredForm,
  updateResidentsFormData,
} from '../../lib/utils/resident';
import SummaryList, {
  SummaryListActions,
  SummaryListRow,
  SummaryListValue,
} from '../summary-list';
import Tag from '../tag';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useStore } from 'react-redux';
import Details from '../../components/form/details';
import { lookUpAddress } from '../../lib/gateways/internal-api';
import AddressSelector from '../../components/form/selectaddress';
import ShowAddress from '../../components/form/showaddress';
import dataInput from '../../data/forms/date-input.json';
import { getResident } from '../../lib/utils/resident';


interface ApplicationFormsProps {
  activeStep?: string;
  baseHref: string;
  onCompletion: (values: FormData) => void;
  onExit?: () => void;
  resident: Resident;
  steps: ApplicationSteps[];
}

/**
 * Application form component is made up of multiple forms
 * The idea being that we can offer an overview of the application from this component,
 * as well as a clear journey from the first form to the next, and so on...
 * @param {ApplicationFormsProps} param0 - Property object of the application
 * @returns {JSX.Element}
 */
export default function ApplicationForms({
  activeStep,
  baseHref,
  onCompletion,
  onExit,
  resident,
  steps,
}: ApplicationFormsProps): JSX.Element {
  const router = useRouter();
  const store = useStore<Store>();
  let thisResident = router.query.resident;
  thisResident = thisResident as string;
  const currentResident = getResident(thisResident, store.getState());

  const [applicationData, setApplicationData] = useState({});

  const [spinner, setSpinner] = useState(false);

  const [addresses, setAddresses] = useState();

  const [currentAddress, setCurrentAddress] = useState();

  const [previousAddress, setPreviousAddress] = useState([]);

  const [showInputField, setShowInputField] = useState(false);

  const [timeAtAddressMonths, setTimeAtAddressMonths] = useState({});
  const [timeAtAddressYears, setTimeAtAddressYears] = useState({});

  const [disableSubmitButton, setDisableButton] = useState(true);



  const formSteps = getFormIdsFromApplicationSteps(steps);

  if (formSteps.includes(activeStep!)) {
    const next = () => {
      let index = formSteps.indexOf(activeStep!) + 1;
      if (index < formSteps.length) {
        activeStep = formSteps[index];
        router.replace(`${baseHref}/${activeStep}`);
      }
    };

    const onSave = (values: FormData) => {
      const data: { [key: string]: FormData } = { ...applicationData };
      data[activeStep!] = values;

      setApplicationData(data);
      updateResidentsFormData(store, resident, data);

      const index = formSteps.indexOf(activeStep!) + 1;
      if (index == formSteps.length) {
        onCompletion(data);
      }
    };

    const onAddressLookup = async (postcode: string) => {
      try {
        setSpinner(true)
        lookUpAddress(postcode)
          .then(data => {
            setSpinner(false)
            setAddresses(data.address)
            setShowInputField(true)
          });
      } catch (err) {
        // TODO: error handling
      }
    }

    const addressSelectorHandler = (e:any) => {
      setCurrentAddress(e.target.value);
      setAddresses(undefined)
    }

    const timeAtAddress = (value:string, name:string) => {
      name === 'years' ? setTimeAtAddressYears({'years': value}) : setTimeAtAddressMonths({'months': value})
    }

    const calculateTotalStay = () => {
      // calculate total stay at all addresses combined
    }

    const etiquette = () => {
      let addressBy = 'Do'
      if (currentResident?.slug !== 'you') {
        addressBy = 'Does'
      }
      return addressBy;
    }

    return (
      <>
        {formSteps.map((step, index) => {
          if (step == activeStep) {
            const formData = getFormData(step);
            if (formData['heading']?.includes("Medical Needs") || formData['heading']?.includes("medical needs")) {
              formData['heading'] = `${etiquette()} ${currentResident?.slug} have any significant medical needs that affect your housing requirements?`
            }
            if(showInputField && formData['heading'] === 'Address history' && formData['steps'][0]['fields'].length === 1) {
              formData['steps'][0]['fields'].push(dataInput)
            }
            const residentsPreviousAnswers = resident.formData[step];

            return (
              <div key={index}>
                {formData.heading && <HeadingOne content={formData.heading} />}
                {formData.copy && <Paragraph><strong>{formData.copy}</strong></Paragraph>}
                {activeStep === 'address-history' && <Details />}
                {currentAddress && activeStep === 'address-history' && <ShowAddress currentAddress={currentAddress} duration={[timeAtAddressYears, timeAtAddressMonths]} />}
                {addresses && <AddressSelector addresses={addresses} addressSelectorHandler={addressSelectorHandler} /> }


                <Form
                  buttonText="Save and continue"
                  formData={formData}
                  onExit={onExit}
                  onSave={onSave}
                  onSubmit={next}
                  onAddressLookup={onAddressLookup}
                  timeAtAddress={timeAtAddress}
                  activeStep={activeStep}
                  residentsPreviousAnswers={residentsPreviousAnswers}
                />

              </div>
            );
          }
        })}
      </>
    );
  } else {
    return (
      <>
        {steps.map((step, index) => (
          <div key={index}>
            <HeadingTwo content={step.heading} />
            <SummaryList>
              {step.steps.map((formStep, i) => (
                <SummaryListRow key={i}>
                  <SummaryListValue>
                    <Link href={`${baseHref}/${formStep.id}`}>
                      {formStep.heading}
                    </Link>
                  </SummaryListValue>
                  <SummaryListActions>
                    {hasResidentAnsweredForm(resident, formStep.id) ? (
                      <Tag content="Check answers" />
                    ) : (
                      <Tag content="Todo" variant="grey" />
                    )}
                  </SummaryListActions>
                </SummaryListRow>
              ))}
            </SummaryList>
          </div>
        ))}
      </>
    );
  }
}
