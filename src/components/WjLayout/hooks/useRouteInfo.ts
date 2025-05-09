import { useLocation } from 'react-router-dom';
import { TagTypes } from '../type';

export const useRouteInfo = (routes: TagTypes[]) => {
  const location = useLocation();
  // 递归查找路由信息
  const findRouteInfo = (
    path: string,
    routeList: TagTypes[],
  ): TagTypes | undefined => {
    for (const route of routeList) {
      if (route.path === path) {
        return route;
      }
      if (route.routes) {
        const found = findRouteInfo(path, route.routes);
        if (found) return found;
      }
    }
    return undefined;
  };

  // 获取当前路由信息
  const currentRoute = findRouteInfo(location.pathname, routes);

  return {
    path: location.pathname,
    title: currentRoute?.title || '未知页面',
    id: currentRoute?.id || location.pathname,
  };
};
