import type {
  FieldValueEnumType,
  ValueEnumFieldNames,
} from '@msxf/antd-ms/utils';
import type {
  ButtonProps,
  ColProps,
  FormInstance,
  FormItemProps,
  FormProps,
  StepProps,
  StepsProps,
} from 'antd';
import type { ArgsProps } from 'antd/lib/notification';
import type { ColumnType } from 'antd/lib/table';
import type { EllipsisConfig } from 'antd/lib/typography/Base';
import type {
  NamePath,
  ValidateErrorEntity,
} from 'rc-field-form/lib/interface';
import type React from 'react';
import type { ReactNode } from 'react';
import type { MsDrawerProps } from '../MsDrawer';
import type { MsFiledRequestColumnType } from '../MsField/hooks/useFieldRequest/types';
import type { MsModalProps } from '../MsModal';
import { ComponentsType } from './utils/config';
/**
 * 表单的配置类型
 */
export type WjFormColumnsPropsType<D = any> = {
  dataIndex?: string;
  title?: string;
  valueType?: keyof ComponentsType | string;
  width?: number | string;
  fieldProps?:
    | Record<string, any>
    | ((form: FormInstance) => Record<string, any>);
  formItemProps?: FormItemProps<D> | ((form: FormInstance) => FormItemProps<D>);
  colProps?: { span?: number; style?: object };
};

/** 缓存枚举Context类型 */
export type MsFormCacheValueEnumContextType = {
  /**
   * 获取缓存枚举
   * @param key 缓存的key
   * @returns
   */
  getValueEnum: (key: string) => FieldValueEnumType | undefined;
  /**
   * 获取缓存枚举
   * @param key 缓存dataIndex 和 dataIndex + params 两种键，dataIndex用于列获取（不知道params）
   * @param valueEnum
   */
  setValueEnum: (key: string, valueEnum?: FieldValueEnumType) => void;
};

/** 折叠状态Context类型 */
export type CollapseContextContextType = {
  get: (key: string) => boolean;
  set: (key: string, open: boolean) => void;
  /** 打开所有 */
  openAll: () => void;
  /** 关闭所有 */
  closeAll: () => void;
};

/** 只读/编辑模式Context类型 */
export type MsFormModeContextType = {
  mode: ModeType;
  fieldLoading?: boolean;
  changeMode?: (mode: ModeType) => void;
};

export type MsFormInstance = FormInstance;

/** 表单组件类型 */
export type MsFormProps<DataType = any> = Omit<
  FormProps,
  'title' | 'onFinish'
> & {
  /** 初始值 */
  initialValues?: DataType;
  /** 表单配置项 */
  columns?: MsFormColumnType<DataType>[];
  /** 表单提交配置项 */
  submitter?: SubmitterType;
  /** 编辑模式 */
  mode?: ModeType;
  /** 完成事件 */
  onFinish?: (values: DataType) => Promise<void>;
  onStepChangeFailed?: (errorInfo: ValidateErrorEntity<DataType>) => void;
  /** 剔除 null 和 undefined */
  omitNilValues?: boolean;
  /** 剔除空元素 */
  omitEmptyValues?: boolean;
  /** 剔除私有属性 */
  omitPrivateValues?: boolean;
  /** 去两边空格 */
  trimValues?: boolean;
  /** 关闭Card组件包裹 */
  noCard?: boolean;
  children?: React.ReactNode;
  /** 表单布局模式 */
  formType?:
    | 'Form'
    | 'ModalForm'
    | 'DrawerForm'
    | 'StepsForm'
    | 'ModalStepsForm'
    | 'DrawerStepsForm'
    | 'QueryForm'
    | 'SearchForm'
    | 'CriteriaForm';
  /** 标题 */
  title?: React.ReactNode;
  /** 子容器的标题样式类型 */
  titleType?: 'gradient' | 'flag' | 'common' | 'block';
  /** 弹窗和抽屉的宽度 */
  width?: number | string;
  /** 远程请求方法 */
  request?: any;
  /** 远程请求方法的参数 */
  params?: Record<string, any>;
  /** 处理远程请求的响应体 */
  postRes?: (res: any) => object;
  /** 远程请求防抖 */
  debounceTime?: number;
  /** 窗口聚焦重新发起远程请求 */
  refreshOnWindowFocus?: boolean;
  /** 一行展示几列 */
  column?: number;
  /** 通知 */
  successNotify?: boolean;
  successNotifyProps?: ArgsProps;
  /** 透传弹窗属性 */
  modalProps?: MsModalProps;
  /** 透传抽屉属性 */
  drawerProps?: MsDrawerProps;
  /** 分步表单配置 */
  steps?: MsFormStepItemType[];
  /** 透传分步属性 */
  stepsProps?: StepsProps & {
    validateNextStep?: (
      stepValues: DataType,
      next: number,
      steps: MsFormStepItemType[],
    ) => Promise<boolean>;
    afterChange?: (current: number, steps: MsFormStepItemType[]) => void;
    defaultCurrent?: number;
  };
  actionRef?: React.Ref<MsFormActionType>;
  /** 子容器之间分割线 */
  divider?: boolean | 'line';
  /** 直传数据源，给 MsDescriptions 用的，MsForm用不到 */
  dataSource?: DataType;
  /** 关闭枚举缓存，组件内部使用 */
  disabledFieldCache?: boolean;
  /** 内容的 className */
  contentClassName?: string;
  /** trigger 打开弹窗用法
   * @deprecated 已经弃用，弹窗/抽屉打开建议使用 MsModal.open 的方式
   */
  trigger?: React.ReactNode;
  onReset?: () => void;
};

/** 分步表单项类型 */
export type MsFormStepItemType = {
  title: React.ReactNode;
  columns: MsFormColumns;
} & StepProps;

/** 表单提交栏的配置 */
export type SubmitterType = {
  /** fixed 固定在底部 */
  type?: 'default' | 'fixed';
  /** 额外的渲染 */
  extraRender?: React.ReactNode;
  /** 在提交按钮组之前渲染 */
  beforeButtonRender?: React.ReactNode;
  /** 在提交按钮组之后渲染 */
  afterButtonRender?: React.ReactNode;
  /** 重写整个提交 */
  render?: (form: FormInstance) => React.ReactNode;
  /** 提交按钮属性 */
  submitBtnProps?: ButtonProps;
  /** 重置按钮属性 */
  resetBtnProps?: ButtonProps;
  /** 弹窗抽屉表单，取消按钮属性 */
  cancelBtnProps?: ButtonProps;
  /** 提交按钮文案 */
  submitText?: React.ReactNode;
  /** 重置按钮文案 */
  resetText?: React.ReactNode;
  /** 弹窗抽屉表单，取消按钮文案 */
  cancelText?: React.ReactNode;
  /** 分步表单，上一步按钮属性 */
  nextBtnProps?: ButtonProps;
  /** 分步表单，下一步按钮属性 */
  prevBtnProps?: ButtonProps;
  /** 分步表单，上一步按钮文案 */
  prevText?: (currentStep: number) => React.ReactNode;
  /** 分步表单，下一步按钮文案 */
  nextText?: (currentStep: number) => React.ReactNode;
};

/** ref 方法 */
export type MsFormActionType = {
  reload: (loading?: boolean) => Promise<void>;
};

/** 表单 Columns 类型 */
export type MsFormColumns<D = any> = MsFormColumnType<D>[];

/** 单个表单项类型 */
export type MsFormColumnType<D = any> = MsBaseFormColumnType<D> &
  MsFormColumnActionType & {
    /** 子表单项 */
    columns?:
      | MsFormColumns
      | ((baseNamePath: NamePath, index: number) => MsFormColumns);
    // 内置属性
    _colProps?: (colProps: ColProps) => ColProps;
    _formItemProps?: (formItemProps: FormItemProps<D>) => FormItemProps<D>;
    _fieldProps?: (fieldProps: any) => any;
  };

/** 表单项操作相关配置 */
export type MsFormColumnActionType = {
  /** 模式，编辑/只读模式 */ mode?: ModeType;
  /** 可复制 */
  copyable?: boolean | CopyConfig;
  /** 可编辑 */
  editable?: boolean | EditConfig;
  /** 超长省略  */
  ellipsis?: boolean | EllipsisConfig;
  /** 自定义操作按钮 */
  actions?: ({ label?: ReactNode; title?: string } & ButtonProps)[];
};

/** 表单项编辑相关属性 */
export type EditConfig = {
  /** 弹窗，抽屉，不显示编辑 */
  type?: 'modal' | 'drawer' | 'none';
  /** 编辑文案 */
  editText?: ReactNode;
  /** 编辑 tooltip */
  editTooltip?: ReactNode;
  /** 编辑图标 */
  editIcon?: ReactNode;
  /** 编辑按钮打开字段 */
  openFields?: NamePath[];
  /** 编辑表单是否本字段 */
  openSelfField?: boolean;
  /** 弹窗属性 */
  modalProps?: MsFormProps['modalProps'];
  /** 抽屉属性 */
  drawerProps?: MsFormProps['drawerProps'];
  /** 提交按钮 */
  submitter?: Omit<MsFormProps['submitter'], 'type'>;
  /** formItemProps 可能是函数，函数不能进行属性合并，所以 formItemProps 是全量覆盖 column.formItemProps */
  formItemProps?: MsFormColumnType['formItemProps'];
  /** fieldProps 可能是函数，函数不能进行属性合并，所以 fieldProps 是全量覆盖 column.fieldProps */
  fieldProps?: MsFormColumnType['fieldProps'];
  /** 打开弹窗事件，主要用于埋点事件上报 */
  onClick?: () => void;
  /** 弹窗提交事件，主要用于埋点事件上报 */
  onFinishSuccess?: () => void;
};

/** 表单项复制相关属性 */
export type CopyConfig = {
  onCopy?: (text?: string) => void;
};

/** 编辑/只读模式 */
export type ModeType = 'edit' | 'read';

/** 通用表单 Column 类型 */
export type MsBaseFormColumnType<D = any> = MsFiledRequestColumnType<D> & {
  key?: React.Key;
  /**  与实体映射的 key，数组会被转化 [a,b] => Entity.a.b */
  dataIndex?: ColumnType<D>['dataIndex'];
  /** 标题的内容，在 form 中是 label */
  title?: string;
  /** 数据的渲渲染方式，自带了一部分 */
  valueType?: keyof ComponentsType | string;
  /** 数据类型转换 */
  valuePrimitiveType?: 'number' | 'boolean';
  /** 自动创建一个 "下划线+dataIndex" 的隐藏字段，当选中之后会将整个option设置到这个隐藏字段 */
  valueEnumSyncToForm?: boolean;
  /** 会在 title 旁边展示一个 icon，鼠标浮动之后展示 */
  tooltip?: ReactNode;
  /** 表单初始值 */
  initialValue?: FormItemProps<D>['initialValue'];
  /** 声明依赖项NamePath */
  dependencies?: FormItemProps<D>['dependencies'];
  /** dependencies的增强，可自由控制重新运行 */
  shouldUpdate?: FormItemProps<D>['shouldUpdate'];
  /** Form.List 依赖项 */
  dependenciesList?: FormItemProps<D>['dependencies'];
  /** Form.List 的列自我依赖 */
  dependenciesListSelf?: boolean;
  /** 枚举映射 */
  valueEnumFiledNames?: ValueEnumFieldNames;
  /** 透传给 Col 组件的参数 */
  colProps?: ColProps;
  /** 支持 object 和 Map，Map 是支持其他基础类型作为 key */
  valueEnum?: FieldValueEnumType;
  /** 透传给渲染的组件的 props，自定义的时候也会传递 */
  fieldProps?:
    | Record<string, any>
    | ((form: FormInstance) => Record<string, any>);
  /** 透传给 Form.Item 的配置 */
  formItemProps?: FormItemProps<D> | ((form: FormInstance) => FormItemProps<D>);
  /** 编辑渲染 */
  fieldRender?: React.ReactNode | ((form: FormInstance) => React.ReactNode);
  /** 只读渲染 */
  fieldReadRender?: React.ReactNode | ((form: FormInstance) => React.ReactNode);
  /** 样式隐藏该表单项 */
  hideInForm?: boolean | ((form: FormInstance) => boolean);
  /** 该表单项元素占用几个 column 宽度  */
  colSize?: number;

  /** formTable的列宽度 */
  width?: string | number;
};
