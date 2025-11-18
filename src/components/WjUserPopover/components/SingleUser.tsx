import { useState } from 'react';
import UserAvatar from './UserAvatar';
import UserDetailPopover from './UserDetailPopover';

const SingleUser = (props: any) => {
  const { userData, showDelete } = props;

  // 控制详情popover的显隐
  const [detailOpen, setDetailOpen] = useState(false);
  return (
    <UserDetailPopover
      userData={userData}
      {...props}
      detailOpen={detailOpen}
      setDetailOpen={setDetailOpen}
    >
      <UserAvatar
        icon={userData?.label}
        {...props}
        userData={userData}
        showDelete={showDelete}
        setDetailOpen={setDetailOpen}
      />
    </UserDetailPopover>
  );
};

export default SingleUser;
