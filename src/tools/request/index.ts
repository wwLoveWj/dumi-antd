import WjRequest from './requestClass';

const whiteList: string[] = ['/wj/web/v1/check'];

const request = new WjRequest({
  whiteList,
});
export default request;
