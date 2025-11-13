const sleep = (time = 500) =>
  new Promise((resolve) => setTimeout(resolve, time));

const request = async (params: any) => {
  console.log('请求参数：', params);
  await sleep();
  const list = [
    {
      id: 1,
      title: 'DAM-autoname-1667722950291',
      createTime: '2024-09-08 12:30:09',
      progress: 33,
      status: 'running',
      evaluate: 5,
    },
    {
      id: 2,
      title: 'DAM-autoname-1667722068292',
      createTime: '2024-09-08 12:30:09',
      progress: 2,
      status: 'success',
      evaluate: 1,
    },
    {
      id: 3,
      title: 'DAM-autoname-1667722068293',
      createTime: '2025-06-08 09:36:09',
      progress: 55,
      status: 'fail',
      evaluate: 2.5,
    },
  ];

  return {
    list,
    pageNo: 1,
    pageSize: 20,
    total: list.length,
  };
};

export default request;
