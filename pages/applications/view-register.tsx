import Link from 'next/link';
import { GetServerSideProps } from 'next';
import React, { SyntheticEvent, useState } from 'react';
import { HackneyGoogleUser } from '../../domain/HackneyGoogleUser';
import { getRedirect, getSession } from '../../lib/utils/googleAuth';
import { UserContext } from '../../lib/contexts/user-context';
import { PaginatedApplicationListResponse } from '../../domain/HousingApi';
import {
  searchApplications,
  getApplications,
} from '../../lib/gateways/applications-api';
import Layout from '../../components/layout/staff-layout';
import SearchBox from '../../components/admin/search-box';
import Sidebar from '../../components/admin/sidebar';
import ApplicationTable from '../../components/admin/application-table';
import { HeadingOne } from '../../components/content/headings';
import {
  HorizontalNav,
  HorizontalNavItem,
} from '../../components/admin/HorizontalNav';
import { useRouter } from 'next/router';
import { ApplicationStatus } from '../../lib/types/application-status';
import Button from '../../components/button';
import Details from '../../components/details';
import { Checkbox } from '../../components/form/checkboxes';

interface PageProps {
  user: HackneyGoogleUser;
  applications: PaginatedApplicationListResponse | null;
  pageUrl: string;
  page: string;
  reference: string;
}

export default function ViewAllApplicationsPage({
  user,
  applications,
  pageUrl,
  page = '1',
  reference = '',
}: PageProps): JSX.Element {
  const router = useRouter();
  const parameters = new URLSearchParams();

  if (reference !== '') {
    parameters.append('reference', reference);
  }

  const parsedPage = parseInt(page);

  const [activeNavItem, setActiveNavItem] = useState('');

  const handleClick = async (event: SyntheticEvent) => {
    event.preventDefault();

    const { name } = event.target as HTMLButtonElement;

    router.push({
      pathname: '/applications/view-register',
      query: { status: name },
    });

    setActiveNavItem(name);
  };

  const addCase = async () => {
    router.push({
      pathname: '/applications/add-case',
    });
  };

  return (
    <UserContext.Provider value={{ user }}>
      <Layout pageName="All applications">
        <SearchBox
          title="Housing Register"
          buttonTitle="Search"
          watermark="Search application reference"
        />

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-quarter">
            <Sidebar />
          </div>
          <div className="govuk-grid-column-three-quarters">
            <HeadingOne content="Housing Register" />

            <Button secondary={true} onClick={() => addCase()}>
              + Add new case
            </Button>

            <hr />

            <Details summary="Filter by status">
              <div
                className="govuk-checkboxes lbh-checkboxes"
                role="group"
                aria-labelledby="checkbox-group"
              >
                <div className="govuk-checkboxes__item">
                  <input
                    className="govuk-checkboxes__input"
                    name="manualDraft"
                    type="checkbox"
                  />
                  <label
                    className="govuk-checkboxes__label"
                    htmlFor="manualDraft"
                  >
                    Manual draft
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input
                    className="govuk-checkboxes__input"
                    name="incomplete"
                    type="checkbox"
                  />
                  <label
                    className="govuk-checkboxes__label"
                    htmlFor="incomplete"
                  >
                    Incomplete
                  </label>
                </div>
              </div>
              {/* <Checkbox name="Manual draft" label="" value="" /> */}
              {/* <Checkbox name="Manual draft" label="" value="" />
              <Checkbox name="Manual draft" label="" value="" /> */}
            </Details>

            {/* <HorizontalNav>
              <HorizontalNavItem
                handleClick={handleClick}
                itemName=""
                isActive={activeNavItem === ''}
              >
                All applications
              </HorizontalNavItem>
              <HorizontalNavItem
                handleClick={handleClick}
                itemName={ApplicationStatus.MANUAL_DRAFT}
                isActive={activeNavItem === ApplicationStatus.MANUAL_DRAFT}
              >
                Manually added
              </HorizontalNavItem>
            </HorizontalNav> */}
            <ApplicationTable
              caption="Applications"
              applications={applications}
              currentPage={parsedPage}
              parameters={parameters}
              pageUrl={pageUrl}
              showStatus={true}
            />
          </div>
        </div>
      </Layout>
    </UserContext.Provider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = getSession(context.req);
  const redirect = getRedirect(user);
  if (redirect) {
    return {
      props: {},
      redirect: {
        destination: redirect,
      },
    };
  }

  const {
    page = '1',
    reference = '',
    orderby = '',
    status = '',
  } = context.query as {
    page: string;
    reference: string;
    orderby: string;
    status: string;
  };

  const pageUrl = `${process.env.APP_URL}/applications/view-register`;

  const applications =
    reference === '' && status === ''
      ? await getApplications(page)
      : await searchApplications(page, reference, status);

  return {
    props: { user, applications, pageUrl, page, reference },
  };
};
