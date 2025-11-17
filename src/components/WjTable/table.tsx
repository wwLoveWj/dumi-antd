import { useRequest } from 'ahooks';
import type { FormInstance } from 'antd';
import { Alert, Space, Spin, Table } from 'antd';
import { isObject } from 'lodash-es';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { WjForm, WjFormColumnsPropsType } from '../WjForm';
import TableFooterRender from './components/TableFooterRender';
import useTableSelection from './hooks/useTableSelection';
import './style.less';
import { WjTableProps } from './type';

// ForwardedRef<HTMLDivElement>
const WjTable = forwardRef<any, WjTableProps>((props, ref) => {
  const {
    selectedRowLens = 0,
    title,
    request,
    params,
    columns,
    dataSource,
    // batchOpertions,
    // noCard,
    actionRef,
    createBtnOperations,
    onSubmit,
    footer,
    selectionButtonsRender,
    pagination = {},
    paginationType = 'page',
    ...restProps
  } = props;
  const formRef = useRef<FormInstance>();
  // ============================表单配置相关==============================
  const getCurrent = () => {
    if (paginationType === 'cursor') return;
    if (isObject(pagination))
      return pagination.defaultCurrent ?? pagination.current ?? 1;
  };

  const getPageSize = () => {
    if (isObject(pagination))
      return pagination.defaultPageSize ?? pagination.pageSize ?? 10;
  };

  const getPageType = () => {
    if (paginationType === 'cursor') return 'next';
  };
  // 默认的表单查询参数
  const defaultQuery: {
    current?: number;
    pageSize?: number;
    pageStart?: string;
    pageType?: 'next' | 'prev';
  } = {
    current: getCurrent(),
    pageSize: getPageSize(),
    pageType: getPageType(),
    pageStart: undefined,
  };
  // 游标分页配置
  const [queryState, setQueryState] = useState({
    total: 0,
    // 游标分页，存在下一页
    hasNext: true,
    hasPrev: false,
  });
  /** 表格及表单状态 */
  const [query, setQuery] = useState<{
    current?: number;
    pageNo?: number;
    pageSize?: number;
    pageStart?: string;
    pageType?: 'next' | 'prev';
  }>({ ...defaultQuery, pageSize: 10, pageNo: 1 });

  // ==========================================================
  const hasSelected = selectedRowLens > 0;
  // 表格的请求方法
  const { data, run, loading } = useRequest(async (query?: any) => {
    const res = request
      ? await request({
          ...formRef.current!.getFieldsValue(),
          ...params,
          pageSize: 10,
          pageNo: 1,
          ...query,
        })
      : new Promise((res) => res({ data: null }));
    setQueryState({
      total: res?.total,
      hasNext: res?.hasNext,
      hasPrev: res?.hasPrev,
    });
    return res;
  });
  /**
   * 页码切换
   * @param current 当前页码
   * @param pageSize 每页多少个
   * @param pageStart 游标翻页起点
   * @param pageType 游标翻页方向(前一页|后一页)
   */
  const handlePaginationChange = (
    current?: number,
    pageSize?: number,
    pageStart?: string,
    pageType?: 'prev' | 'next',
  ) => {
    // contentLoadingRef.current = true;
    const newQuery = {
      ...query,
      pageNo: current,
      current,
      pageSize,
      pageStart,
      pageType,
    };
    setQuery(newQuery);
    onSubmit?.();
    run(newQuery);
    if (pagination) {
      if (pagination.frontPagination) {
        pagination?.afterChange?.(current, pageSize, pageStart, pageType);
      }
    }
  };
  const tableSelectionProps = useTableSelection(props, {
    ...props,
    res: data,
    dataSource: data?.list,
  });
  const { rowSelection, clearSelected } = tableSelectionProps;
  useImperativeHandle(actionRef, () => {
    return {
      reload: () => run(),
      clearSelected,
    };
  });
  const tableSearchColumns =
    columns?.filter((column: any) => column.search) || [];

  return (
    <div className="tableContainer">
      {tableSearchColumns?.length === 0 ? (
        <></>
      ) : (
        <div style={{ marginBottom: 12 }}>
          <WjForm
            formConfigList={columns as WjFormColumnsPropsType[]}
            onFinish={(param: any) => run(param)}
            successNotify={false}
            formRef={formRef}
          />
        </div>
      )}
      <div className={'tableLayout'}>
        <Spin spinning={loading}>
          <div className={'tableOperations'}>
            {createBtnOperations && createBtnOperations?.length > 0 && (
              <Space style={{ marginRight: 12 }}>
                {createBtnOperations?.map((item) => item)}
              </Space>
            )}
            {hasSelected && (
              <Alert
                message={
                  hasSelected ? `选中项 ${selectedRowLens} ${title}` : ''
                }
                type="success"
                showIcon
                style={{ width: 200 }}
              />
            )}
          </div>
          <Table
            {...restProps}
            ref={ref}
            rowSelection={rowSelection}
            columns={columns?.filter((item) => !item.hideInTable)}
            pagination={false}
            scroll={{ y: 'auto-content' }}
            dataSource={
              dataSource && Array.isArray(dataSource)
                ? dataSource
                : (data?.list as []) || []
            }
          />
          {/* 分页处理 */}
          <TableFooterRender
            tableProps={props}
            res={data}
            queryState={queryState}
            data={dataSource || data?.list}
            handlePaginationChange={handlePaginationChange}
            pagination={{ ...pagination, total: data?.total }}
            selectionButtonsRender={selectionButtonsRender}
            footer={footer}
            request={request}
            query={query}
          />
          {/* <div>
            <Space>
              {(batchOpertions || [])?.map((item) => (
                <Button
                  type={item?.type}
                  onClick={() =>
                    item?.onClick &&
                    item?.onClick(rowSelection?.selectedRowKeys)
                  }
                >
                  {item?.label}
                </Button>
              ))}
            </Space>
          </div> */}
        </Spin>
      </div>
    </div>
  );
});

export default WjTable;
