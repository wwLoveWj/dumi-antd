import { ComponentClass, FunctionComponent } from 'react';

/**
 * 菜单的配置项，用于动态渲染：
 *  key: 唯一标志
 *  title: 菜单项值（国际化已开启）
 *  path：用于路由跳转
 *  layout： 是否是布局组件，如果不是，则不会渲染菜单
 *  component：组件所在路径，从pages路径下开始
 *  icon：菜单图标
 *  hidden: 是否隐藏该菜单项
 *  routes：子级菜单项
 */
export interface TagTypes {
  title?: string;
  key?: string;
  path?: string;
  layout?: boolean;
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


