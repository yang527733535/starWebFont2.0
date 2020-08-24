import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';



const CodePreview: React.FC<{}> = ({ children }) => (
  // <pre className={styles.pre}>
  <code>
    <Typography.Text copyable>{children}</Typography.Text>
  </code>

);

export default (): React.ReactNode => (
  <PageContainer>

    <Card>


      <CodePreview>yarn add @ant-design/pro-layout</CodePreview>
    </Card>
  </PageContainer>
);
