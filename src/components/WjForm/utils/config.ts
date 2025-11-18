import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Space,
  TimePicker,
} from 'antd';
import WjBtnConfigForm from '../../WjBtnConfigForm/index';
import WjRichText from '../../WjRichText';
import WjUserPopover, { WjUserPopoverProps } from '../../WjUserPopover';

/** 组件库内置类型，不要暴露给用户 */
export type InnerComponentMap = {
  space: typeof Space;
  col: typeof Col;
  row: typeof Row;
  button: typeof Button;
  formItem: typeof Form.Item;
  form: typeof Form;
};

/** 懒加载类型 */
export type LazyComponentMap = {
  // richText: typeof WjRichTextLazy;
};
export type ListComponentMap = {
  //
};

export type ComponentsType = {
  card: typeof Card;
  space: typeof Space;
  col: typeof Col;
  row: typeof Row;
  button: typeof Button;
  formitem: typeof Form.Item;
  wjfrom: typeof Form;
  search: typeof Input.Search;
  select: typeof Select;
  textarea: typeof Input.TextArea;
  input: typeof Input;
  number: typeof InputNumber;
  password: typeof Input.Password;
  date: typeof DatePicker;
  time: typeof TimePicker;
  searchForm: typeof WjBtnConfigForm;
  radio: typeof Radio.Group;
  slider: typeof Slider;
  rate: typeof Rate;
  userPopover: WjUserPopoverProps;
  richText: typeof WjRichText;
};

const components: ComponentsType = {
  card: Card,
  space: Space,
  col: Col,
  row: Row,
  button: Button,
  formitem: Form.Item,
  wjfrom: Form,
  search: Input,
  select: Select,
  textarea: Input.TextArea,
  input: Input,
  number: InputNumber,
  password: Input.Password,
  date: DatePicker,
  time: TimePicker,
  searchForm: WjBtnConfigForm,
  radio: Radio.Group,
  slider: Slider,
  rate: Rate,
  userPopover: WjUserPopover,
  richText: WjRichText,
};

export default components;
