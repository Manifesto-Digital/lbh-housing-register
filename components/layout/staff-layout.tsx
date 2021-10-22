import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { useUser } from '../../lib/contexts/user-context';
import { signOut } from '../../lib/utils/googleAuth';
import { hasPhaseBanner } from '../../lib/utils/phase-banner';
import Header from '../header';
import PhaseBanner from '../phase-banner';
import Seo from '../seo';
import SkipLink from '../skip-link';

interface StaffLayoutProps {
  pageName?: string;
  children: ReactNode;
}

export default function StaffLayout({
  pageName,
  children,
}: StaffLayoutProps): JSX.Element {
  const { user } = useUser();
  const router = useRouter();
  const { id, person } = router.query as {
    id: string;
    person: string;
  };

  return (
    <>
      {pageName && <Seo title={pageName} />}
      <SkipLink />
      <Header
        username={user?.name}
        logoLink="/applications"
        serviceName="Housing Register admin"
        signOutText="Sign out"
        onSignOut={signOut}
      />
      {hasPhaseBanner() && <PhaseBanner />}

      {id && !person && (
        <div className="lbh-container">
          <nav>
            <strong className="lbh-heading-h5">
              <Link href={`/applications/`}>
                <a className="lbh-link lbh-link--no-visited-state">
                  Back to dashboard
                </a>
              </Link>
            </strong>
          </nav>
        </div>
      )}
      {id && person && (
        <div className="lbh-container">
          <nav>
            <strong className="lbh-heading-h5">
              <Link href={`/applications/view/${id}`}>
                <a className="lbh-link">Back to household overview</a>
              </Link>
            </strong>
          </nav>
        </div>
      )}

      <main id="main-content" className="lbh-main-wrapper">
        <div className="lbh-container">{children}</div>
      </main>
    </>
  );
}
