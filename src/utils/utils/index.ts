import { ComponentClass, FunctionComponent } from 'react';

export interface TagTypes {
  title?: string;
  key?: string;
  path?: string;
  icon?: string | FunctionComponent<any> | ComponentClass<any, any>;
  routes?: TagTypes[];
  component?: any;
  exact?: boolean;
  redirect?: string;
  hidden?: boolean;
}
// 获取所有路由节点
export const getAllNodes = (data: any) => {
  const nodes: TagTypes[] = [];
  function traverseTree(node: TagTypes | TagTypes[]) {
    if (Array.isArray(node)) {
      node.forEach(traverseTree);
    } else {
      nodes.push(node);
      if (node?.routes) {
        traverseTree(node.routes);
      }
    }
  }
  traverseTree(data); // 从根节点开始遍历整个树形结构
  return nodes;
};
// 获取path路由的title
export const getTagTitle = (path: string, routes: TagTypes[]) => {
  let newTitle: string = '';
  const newAllRoutes = getAllNodes(routes);
  newAllRoutes?.map((routeItem: TagTypes) => {
    if (routeItem?.path === path) {
      newTitle = routeItem?.title || '';
      return newTitle;
    }
    return '';
  });
  return newTitle;
};

// 只有一位数字时添加“0”
const checkTime = function (i: number) {
  if (i < 10) {
    if (i < 0) {
      i = '00';
    } else {
      i = '0' + i;
    }
  }

  return i;
};
//毫秒数转换成时间
export const getCurrentTime = function () {
  let myDate = new Date();
  let year = myDate.getFullYear();
  let month = myDate.getMonth() + 1;
  let day = myDate.getDate();
  let hour = myDate.getHours();
  let minute = myDate.getMinutes();
  let second = myDate.getSeconds();

  month = checkTime(month).toString();
  day = checkTime(day).toString();
  hour = checkTime(hour).toString();
  minute = checkTime(minute).toString();
  second = checkTime(second).toString();

  return (
    year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  );
};
