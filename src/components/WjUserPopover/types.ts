export type MsFormTableContextType = {
  inContext?: boolean;
  popupMountRef?: React.RefObject<HTMLDivElement>;
};

/** 编辑/只读模式 */
export type ModeType = 'edit' | 'read' | 'clickEdit';
/** 只读/编辑模式Context类型 */
export type MsFormModeContextType = {
  mode: ModeType;
  /** 枚举请求样式，tags 适用于筛选标签样式，default 默认样式 */
  enumLoadingType?: 'tags' | 'default';
  /** 空值时的显示，不设置时显示 '-' */
  emptyText?: ReactNode;
};
/**
 * 支持 Map 和 Record<string,any>
 *
 * @name ValueEnum 的类型
 */
export type SchemaValueEnumMap = Map<
  React.ReactText,
  SchemaValueEnumType | React.ReactNode
>;

export type SchemaValueEnumObj = Record<
  string,
  SchemaValueEnumType | React.ReactNode
>;

export type SchemaValueEnumArray = Record<string, any>[] | string[];

export type FieldValueEnumType =
  | SchemaValueEnumMap
  | SchemaValueEnumObj
  | SchemaValueEnumArray;

export type ValueEnumFieldNames = {
  label?: string;
  value?: string;
  children?: string;
};

import type { PopoverProps, TooltipProps } from 'antd';
import type React from 'react';
import type { CSSProperties, ReactNode, Ref } from 'react';
/** 单个数组元素的 option */
export type RequestArrayType = {
  label?: React.ReactNode;
  value?: React.ReactText;
  optionType?: 'optGroup' | 'option';
  options?: Omit<RequestArrayType, 'children' | 'optionType'>[];
  [key: string]: any;
};

/** request 的类型 */
export type MsFieldRequest<P = any> = (params?: P) => Promise<any>;

/** 远程请求组件属性 */
export type MsFiledRequestProps<P = any> = Omit<
  MsFiledRequestColumnType<P>,
  'params'
> & {
  params?: P extends any ? Record<string, any> : P;
} & Record<string, any>;

/** 远程请求column公共属性 */
export type MsFiledRequestColumnType<P = any> = {
  /** 是否初始化请求 */
  initialRequest?: boolean;
  /** 聚焦请求 */
  focusRequest?: boolean;
  /** 缓存请求 */
  cacheRequest?: boolean;
  /** 远程请求 valueEnum */
  request?: MsFieldRequest<P>;
  /** 是否跳过请求，初始化和params值变更都会发起请求 */
  skipRequest?: (
    params: P extends any ? Record<string, any> : P,
  ) => boolean | undefined;
  /** 请求参数 */
  params?:
    | (P extends any ? Record<string, any> : P)
    | ((form: FormInstance) => P extends any ? Record<string, any> : P);
  /** 处理响应体 */
  postRes?: (res: any) => RequestArrayType[] | Record<string, any>;
  /** 请求防抖时间 */
  debounceTime?: number;
  /** 枚举映射 */
  valueEnumFiledNames?: ValueEnumFieldNames;
  /** 支持 object 和 Map，Map 是支持其他基础类型作为 key */
  valueEnum?: FieldValueEnumType;
};
/** request 的类型 */

export type DataType = Record<string, any>;

export type EnumFiledNamesType = ValueEnumFieldNames & {
  fullName?: string;
  fullCode?: string;
};

export type UserPopoverProps = {
  type?: 'form' | 'table';
  value?: DataType[];
  defaultValue?: DataType[];
  style?: CSSProperties;
  onChange?: (selectRows?: any) => void;
  searchRequest?: MsFieldRequest<any>;
  searchPostRes?: (data: DataType) => DataType[];
  /* value或者defaultValue是否转义 */
  valueEnumFiledNames?: EnumFiledNamesType;
  // 防抖时间
  searchDebounceTime?: number;
  searchEnum?: DataType[];
  searchEnumFiledNames?: EnumFiledNamesType;
  /* 搜索时，对应搜索的字段 */
  searchCode?: string[];
  // 限制可以选择的个数
  optionalLimit?: number;
  // 不可删除人员的配置
  unDeleteValues?: string[];
  // 已选择的人员是否显示在一行里面
  showInOneLine?: boolean;
  //是否显示toolTip
  showToolTip?: boolean;
  //自定义tooltip
  tooltipTitleRender?: ReactNode | ((data?: DataType) => ReactNode);
  addToolTip?: boolean | ((data?: DataType) => ReactNode);
  // 是否显示常用联系人
  showFrequentContacts?: boolean;
  //储存常用联系人的key
  frequentContactsKey?: string;
  /* 常用联系人最多保存多少条 */
  maxFrequentContacts?: number;
  /* 常用联系人的有效期 */
  frequentContactsExpired?: number | 'infinite';
  placement?: TooltipProps['placement'];
  // 详情的方向
  detailPlacement?: TooltipProps['placement'];
  // 折叠人员的详情方向
  foldDetailPlacement?: TooltipProps['placement'];
  // 折叠人员列表的最大高度， 默认320px
  foldHeight?: string | number;
  // 配置名称大小，16 14 12像素
  fontSize?: number;
  //只读时，鼠标悬浮在名字上远程请求
  hoverRequest?: MsFieldRequest<any>;
  hoverPostRes?: (data: DataType) => DataType;
  hoverEnumFiledNames?: EnumFiledNamesType;
  // 添加Popover组件属性
  addPopoverProps?: PopoverProps;
};

export type WjUserPopoverProps =
  MsFieldBasePropsWithRequest<UserPopoverProps> & {
    dataIndex?: string;
  };

export type MsUserPopoverRef = Ref<HTMLDivElement>;

export type UserPopoverContextType = {
  selectedList: DataType[];
  setSelectedList: React.Dispatch<React.SetStateAction<any>>;
  foldList: DataType[];
  setFoldList: React.Dispatch<React.SetStateAction<any>>;
  userPopoverRef: React.MutableRefObject<HTMLDivElement | null>;
  deleteUser: (user?: DataType) => void;
};
