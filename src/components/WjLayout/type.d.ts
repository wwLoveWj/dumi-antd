export type MenuType = 'light' | 'dark';

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
  id?: string;
}

export interface Iprops {
  /**
   * 是否隐藏头部布局，只显示面包屑简易模式
   * @default false
   */
  isShowHeader?: boolean;
  /**
   * 头像处的下拉设置菜单
   */
  avatarItems: {
    key: string;
    icon: React.ReactNode;
    label: React.ReactNode;
  }[];
  /**
   * 项目名
   * @default "项目模板"
   */
  projectName: string;
  /**
   * 路由配置
   * @default []
   */
  routes: TagTypes[];
  /**
   * 路由首页路径
   * @default "/"
   */
  home?: string;
  /**
   * 未读消息数量
   */
  unreadMsgcount: number;
  children?: any;
  /**
   * 是否直接传入原始路由数据
   * true 为原始，内部直接处理
   * false 为路由配置，需外部处理成目标路由配置后传入
   * @default false
   */
  isRawData?: boolean;
  extraRender?: any;
  themeMenu?: MenuType;
  headerStyle?: any; //头部样式
  themeColor?: string;
}

// 头部的props类型
export interface HeaderPropsType {
  isShowHeader: boolean; //是否显示头部配置
  themeColor: string;
  extraRender: React.ReactNode; //右侧额外的操作区域
  headerStyle: React.CSSProperties;
  breadcrumbItems: any[];
  /**
   * 头像处的下拉设置菜单
   */
  avatarItems: {
    key: string;
    icon: React.ReactNode;
    label: React.ReactNode;
  }[];
  /**
   * 未读消息数量
   */
  unreadMsgcount: number;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
