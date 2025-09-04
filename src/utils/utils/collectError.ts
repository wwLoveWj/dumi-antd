export const collectError = ({
  tag,
  err,
  data,
}: {
  tag: string;
  err: Error | string;
  data: any;
}) => {
  console.log(tag, err, data);
  return '上报异常';
};
