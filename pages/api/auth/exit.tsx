import { StatusCodes } from 'http-status-codes';
import { withSentry } from '@sentry/nextjs';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { removeHackneyToken, getSession } from '../../../lib/utils/googleAuth';
import { removeAuthCookie } from '../../../lib/utils/users';

const endpoint: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const isAdminUser = !!getSession(req);

  switch (req.method) {
    case 'GET':
      try {
        if (isAdminUser) {
          removeHackneyToken(res);
        } else {
          removeAuthCookie(res);
        }
        res.status(StatusCodes.OK).json({ message: 'Sign out' });
      } catch (error) {
        console.error(error);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: 'Unable to sign out' });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default withSentry(endpoint);
