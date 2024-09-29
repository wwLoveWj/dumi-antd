import { WjLayout } from 'magical-antd-ui';
import React from 'react';
export default function Index() {
  return (
    <div>
      <WjLayout
        projectName="667ww"
        isRawData={true}
        routes={[
          {
            path: '/',
            component: '@/layouts/SecurityLayout', // 主页加载layout公共组件
            layout: false,
            routes: [
              {
                path: '/',
                exact: true,
                hidden: true,
                redirect: '/home',
              },
              {
                key: 'components',
                title: '组件',
                path: '/components/wj-layout',
                // icon: SendOutlined,
                component: '@/pages/docs/components',
                routes: [
                  {
                    key: 'start1',
                    title: '开始',
                    path: '/components/wj-layout/start1',
                    routes: [
                      {
                        key: 'start2',
                        title: '开始',
                        hidden: true,
                        path: '/components/wj-layout/start1/start2',
                      },
                    ],
                    // icon: OpenAIOutlined,
                    component: '@/pages/docs/start',
                  },
                ],
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
            ],
          },
        ]}
      >
        我们的天下
      </WjLayout>
    </div>
  );
}
