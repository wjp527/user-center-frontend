import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl } from '@umijs/max';
import React from 'react';

const Admin: React.FC = () => {
  const intl = useIntl();
  return (
    <PageHeaderWrapper
      content={intl.formatMessage({
        id: 'pages.admin.subPage.title',
        defaultMessage: 'This is page title',
      })}
    ></PageHeaderWrapper>
  );
};

export default Admin;
