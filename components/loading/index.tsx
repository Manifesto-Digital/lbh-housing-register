import { ReactElement } from 'react';

import Paragraph from '../content/paragraph';

export default function Loading({ text = 'Loading…' }): ReactElement {
  return (
    <div className="lbh-loading">
      <div className="lbh-loading__spinner" />
      <Paragraph>{text}</Paragraph>
    </div>
  );
}
