import { setComponents } from 'react-schema-render';
import config from './utils/config';
setComponents(config);

export { default as WjForm } from './form';
export type {
  MsFormColumns,
  MsFormProps,
  WjFormColumnsPropsType,
} from './type';
