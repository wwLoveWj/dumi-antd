import { DownOutlined, EllipsisOutlined } from '@ant-design/icons';
import type { ButtonProps, MenuProps, PopoverProps } from 'antd';
import { Button, Divider, Dropdown, Space } from 'antd';
import cls from 'classnames';
import { isArray } from 'lodash-es';
import toArray from 'rc-util/lib/Children/toArray';
import React from 'react';
// import MsDropdown from '../MsDropdown';
import WjActionButton from '../WjActionButton';
import './style.less';
import type { ItemsProps, RenderItemsProps, WjActionsProps } from './type.d';

const Actions: React.FC<WjActionsProps> = (props) => {
  const {
    children,
    lint = 2,
    limit,
    size = 0,
    items,
    actionsType = 'link',
    ellipsis,
  } = props;

  if (children) {
    console.warn('请使用items传入，获得更高性能，此api在未来版本即将废弃');
  }

  let initShow: RenderItemsProps[] = [],
    mornShow: RenderItemsProps[] = [];
  const limitNumber = limit ?? lint;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderItem = () => {};

  const childNodes: RenderItemsProps[] = Array.isArray(items)
    ? items
        .filter((o) => o)
        .map((_item, index) => {
          const item = _item as ItemsProps;
          let [disabled, content, popover, _actionsType]: [
            boolean | undefined,
            string | undefined,
            PopoverProps | undefined,
            ButtonProps['type'] | 'button',
          ] = [false, '', {}, actionsType];
          if (actionsType === 'button') {
            if (index >= limitNumber) {
              _actionsType = 'text';
            } else {
              _actionsType = 'default';
            }
          }
          if (Array.isArray(item?.disabled)) {
            const vItem = item?.disabled?.find((o) => o.disabled);
            if (vItem) {
              disabled = vItem.disabled;
              content = vItem.content;
              popover = vItem?.popover;
            }
          } else {
            disabled = item?.disabled;
            content = item?.content;
            popover = item?.popover;
          }
          return {
            ...item,
            label: (
              <WjActionButton
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                actionsType={_actionsType as ButtonProps['type']}
                {...item}
                className={cls(item.className, {
                  'ms-action-last-ellipsis':
                    limitNumber && ellipsis && index === limitNumber - 1,
                })}
                content={content}
                disabled={disabled}
                popover={{
                  placement: index >= limitNumber ? 'left' : 'top',
                  ...popover,
                }}
              >
                {item.label}
              </WjActionButton>
            ),
          };
        })
    : toArray(children);

  if (limitNumber < 0) {
    initShow = childNodes;
  } else {
    initShow = childNodes.slice(0, limitNumber);
    mornShow = childNodes.slice(limitNumber);
  }

  const innerSize = actionsType === 'link' ? size : size + 10;

  return (
    <Space
      size={innerSize}
      split={actionsType === 'link' && <Divider type="vertical" />}
    >
      {initShow.map((o: RenderItemsProps) => {
        if (typeof o === 'object' && o !== null) {
          if ('label' in o) {
            return o.label;
          } else {
            return o;
          }
        }
      })}
      {mornShow.length > 0 && (
        <Dropdown
          menu={{
            rootClassName: 'ms-actions-menu-root',
            items: mornShow.map((item: RenderItemsProps, index: number) => {
              if (typeof item === 'object' && item !== null) {
                if ('label' in item) {
                  let disabled = item.disabled;
                  // 如果 disabled 是数组形式进行处理
                  if (isArray(item.disabled)) {
                    disabled = item.disabled.some((i) => i.disabled);
                  }

                  return {
                    key: String(index),
                    label: item.label,
                    disabled: disabled,
                    children: item.items,
                  };
                } else {
                  return {
                    key: String(index),
                    label: item,
                  };
                }
              }
            }) as MenuProps['items'],
          }}
          placement="bottom"
        >
          {actionsType === 'link' ? (
            <a>
              <EllipsisOutlined />
            </a>
          ) : ellipsis ? (
            <div
              className="ms-actions-ellipsis-btn"
              style={{ marginLeft: -innerSize }}
            >
              <EllipsisOutlined />
            </div>
          ) : (
            <Button>
              更多
              <DownOutlined />
            </Button>
          )}
        </Dropdown>
      )}
    </Space>
  );
};

export default Actions;
