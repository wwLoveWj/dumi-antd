import {
  InsertRowLeftOutlined,
  LoginOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { WjLayout } from 'magical-antd-ui';
export default function Index() {
  // settings的菜单
  const avatarItems = [
    {
      key: '1',
      label: (
        <span
          onClick={() => {
            // history.push('/login');
          }}
        >
          退出登录
        </span>
      ),
      icon: <LoginOutlined />,
    },
    {
      key: '2',
      label: (
        <span
          // target="_blank"
          // rel="noopener noreferrer"
          onClick={() => {
            // history.push('/center');
          }}
        >
          个人中心
        </span>
      ),
      icon: <UserOutlined />,
    },
  ];

  return (
    <div>
      <WjLayout
        isRawData={true}
        avatarItems={avatarItems}
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
                icon: InsertRowLeftOutlined,
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
                path: '/components/wj-layout',
                // icon: OpenAIOutlined,
                component: '@/pages/docs/start',
              },
              {
                key: 'demo',
                title: '示例',
                path: '/components/primary-button',
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
