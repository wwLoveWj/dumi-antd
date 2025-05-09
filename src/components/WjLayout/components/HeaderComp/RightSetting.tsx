import { Avatar, Badge, Popover } from 'antd';
import React, { useState } from 'react';
// 头部设置
export const RightSetting = ({
  style = {},
  avatarItems,
  unreadMsgcount,
}: {
  style?: object;
  /**
   * 头像处的下拉设置菜单
   */
  avatarItems?: {
    key: string;
    icon: React.ReactNode;
    label: React.ReactNode;
  }[];
  /**
   * 未读消息数量
   */
  unreadMsgcount?: number;
}) => {
  const [timeView] = useState<any>(null); // 倒计时显示
  console.log('干啥呢？我又被渲染了~');
  return (
    <>
      <div style={style}>{timeView}</div>
      {/* 个人设置 */}
      <Popover
        trigger={'hover'}
        content={
          <ul className="avatar-settings">
            {avatarItems?.map((item) => (
              <li key={item?.key}>
                <i>{item?.icon}</i>
                <span>{item?.label}</span>
              </li>
            ))}
          </ul>
        }
        title={
          <div className="avatar-title">
            <Avatar
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
              style={{
                backgroundColor: '#f56a00',
                cursor: 'pointer',
                margin: '0 12px 0 0',
              }}
            />
            <span>json brower</span>
          </div>
        }
        placement="bottomRight"
      >
        <Badge count={unreadMsgcount}>
          <Avatar
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
            style={{
              backgroundColor: '#f56a00',
              marginLeft: '12px',
              cursor: 'pointer',
            }}
          />
        </Badge>
      </Popover>
      {/* <Dropdown menu={{ items: avatarItems }} placement="bottomRight" arrow>
        <Badge count={unreadMsgcount}>
          <Avatar
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
            style={{
              backgroundColor: '#f56a00',
              marginLeft: '12px',
              cursor: 'pointer',
            }}
          />
        </Badge>
      </Dropdown> */}
    </>
  );
};
