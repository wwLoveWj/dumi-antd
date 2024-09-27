import { WjLayout } from 'magical-components';
import React from 'react';
export default function Index() {
  return (
    <div>
      <WjLayout
        projectName="667ww"
        home="/"
        routes={[
          {
            key: 'components',
            title: '组件',
            path: '/components/wj-layout',
            // icon: SendOutlined,
            component: '@/pages/docs/components',
          },
          {
            key: 'start',
            title: '开始',
            path: '/start',
            // icon: OpenAIOutlined,
            component: '@/pages/docs/start',
          },
          {
            key: 'demo',
            title: '示例',
            path: '/demo',
            // icon: OpenAIOutlined,
            component: './demo/index',
          },
        ]}
      >
        我们的天下
      </WjLayout>
    </div>
  );
}
