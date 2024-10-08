import { SearchOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Input, Row, Space, Tag, Typography } from 'antd';
import { Link, useIntl, useSidebarData } from 'dumi';
import React, { memo, useMemo, useState } from 'react';
import { isUndefined } from 'lodash-es';
const { Title } = Typography;

const Overview: React.FC = () => {
  const data = useSidebarData();
debugger
  const { locale } = useIntl();

  const [search, setSearch] = useState<string>('');

  const sectionRef = React.useRef<HTMLElement>(null);

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.keyCode === 13 && search.trim().length) {
      sectionRef.current?.querySelector<HTMLElement>('.components-overview-card')?.click();
    }
  };

  const groups = useMemo<{ title: string; children: any[] }[]>(
    () =>
      data
        .filter((item) => item?.title && item?.title!='组件总览')
              .map<{ title: string; children: any[] }>((item) => 
                 
              ({                 
                      title: item?.title as string,
                  children: item.children.map((child: any) => {
                      return ({
                          title: child.frontmatter?.title,
                          subtitle: child.frontmatter.subtitle,
                          cover: !isUndefined(child?.frontmatter?.cover) ? child?.frontmatter?.cover :
                              "https://cdn.jsdelivr.net/gh/wwLoveWj/Picture-bed@imgs/images/202409251651190.jfif",
                          link: child.link,
                      })
                  }),
        })
              )
        ,
    [data, locale],
  );

  return (
    <section  ref={sectionRef}>
      <Divider />
      <Input
        value={search}
        placeholder='搜索组件'
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyDown={onKeyDown}
        autoFocus // eslint-disable-line jsx-a11y/no-autofocus
        suffix={<SearchOutlined />}
      />
      <Divider />
      {groups
        .filter((i) => i?.title)
        .map((group) => {
          const components = group?.children?.filter(
            (component) =>
              !search.trim() ||
              component?.title?.toLowerCase()?.includes(search.trim().toLowerCase()) ||
              (component?.subtitle || '').toLowerCase().includes(search.trim().toLowerCase()),
          );
          return components?.length ? (
            <div key={group?.title}>
              <Title level={2}>
                <Space align="center">
                  <span style={{ fontSize: 24 }}>{group?.title}</span>
                  <Tag style={{ display: 'block' }}>{components.length}</Tag>
                </Space>
              </Title>
              <Row gutter={[24, 24]}>
                {components.map((component) => {
                  const url = `${component.link}/`;

                  /** Link 不能跳转到外链 */
                  const ComponentLink = !url.startsWith('http') ? Link : 'a';

                  return (
                    <Col xs={24} sm={12} lg={8} xl={6} key={component?.title}>
                      <ComponentLink to={url} href={url}>
                        <Card
                          bodyStyle={{
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'bottom right',
                            backgroundImage: `url(${component?.tag || ''})`,
                          }}
                          size="small"
                          title={
                            <div>
                              {component?.title} {component.subtitle}
                            </div>
                          }
                        >
                          <div>
                            <img src={component.cover} alt={component?.title} style={{maxHeight:105}} />
                          </div>
                        </Card>
                      </ComponentLink>
                    </Col>
                  );
                })}
              </Row>
            </div>
          ) : null;
        })}
    </section>
  );
};

export default memo(Overview);
