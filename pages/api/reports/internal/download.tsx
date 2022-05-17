import { StatusCodes } from 'http-status-codes';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { downloadInternalReport } from '../../../../lib/gateways/applications-api';
import { getAuth, getSession } from '../../../../lib/utils/googleAuth';
import { withSentry } from '@sentry/nextjs';

const endpoint: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'POST':
      const user = getSession(req);

      const auth = getAuth(
        process.env.AUTHORISED_MANAGER_GROUP as string,
        user
      );

      if (!('user' in auth)) {
        res.status(StatusCodes.FORBIDDEN).json({ message: 'access denied' });
        return;
      }

      try {
        const file = await downloadInternalReport(
          {
            StartDate: new Date(req.body.StartDate).toISOString().split('T')[0],
            EndDate: new Date(req.body.EndDate).toISOString().split('T')[0],
            ReportType: parseInt(req.body.ReportType),
          },
          req
        );

        if (file) {
          res.status(file.status);
          res.setHeader('Content-Type', file.headers['content-type']);
          res.setHeader('Content-Length', file.headers['content-length']);
          res.setHeader(
            'Content-Disposition',
            file.headers['content-disposition']
          );
          res.send(file.data);
        } else {
          res.status(404);
          res.send({
            message: 'Unable to download report',
          });
        }
      } catch (error) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: 'Request error: Unable to download report' });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default withSentry(endpoint);
