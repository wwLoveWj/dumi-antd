/**
 * title: 选项卡标签页(一级)
 * description: 通常在两种情况下使用 1、标签页多; 2、有新增、删除选项需求时使用
 */

import { WjTabs } from 'magical-antd-ui';
import { useState } from 'react';

const items = ['创世纪', 'iam', '锦城悦听', 'yyds'].map((i) => ({
  label: i,
  key: i,
}));

let index = 1;

export default () => {
  const [editableItems, setEditableItems] = useState(items);

  const handleEdit = (targetKey: any, action: 'add' | 'remove') => {
    if (action === 'add') {
      index = index + 1;
      const v = String(index);
      setEditableItems((p) => [...p, { label: v, key: v }]);
    } else {
      setEditableItems((p) => p.filter((i) => i.key !== targetKey));
    }
  };

  return (
    <div style={{ height: 200 }}>
      <WjTabs
        syncToUrl
        tabKeyName="card1"
        syncIncludeKeys={[]}
        type="card"
        items={items}
        style={{ marginBottom: 20 }}
      />
      <WjTabs
        syncToUrl
        tabKeyName="card2"
        syncExcludeKeys={['layout']}
        type="editable-card"
        items={editableItems}
        onEdit={handleEdit}
      />
    </div>
  );
};
