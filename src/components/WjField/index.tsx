import { setComponent, setComponents } from 'react-schema-render';
import config from '../WjForm/utils/config';
import WjField from './field';

setComponents(config);

export const setField = setComponent;

export default WjField;

export type {
  MsFieldComponentType,
  MsFieldExtendComponentType,
  WjFieldProps,
} from './types';
