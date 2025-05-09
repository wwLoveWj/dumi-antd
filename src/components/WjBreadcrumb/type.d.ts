export interface TagTypes {
  path: string;
  title: string;
  routes?: TagTypes;
}

export interface TabTypes {
  label: string | React.ReactNode;
  key: string;
}

export interface FixedRouteConfigTypes {
  tabName: string;
  name: string;
  id: string | number;
  maxOpenTags: number;
}
