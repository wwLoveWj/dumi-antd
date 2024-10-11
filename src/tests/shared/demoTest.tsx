import { render, waitFor } from '@testing-library/react';
import { globSync } from 'glob';
import { basename, join, sep } from 'path';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
/**
 * 根据demos批量生成快照测试用例
 * @param component 组件名
 */
export default function demoTest(
  component: string,
  config?: {
    /** 部分react组件原生测试会他提示`not wrapper in act(...)`， 需要通过waitFor来消除警告 */
    needWaitFor?: boolean;
  },
) {
  describe(`${component} 组件 demo 测试`, () => {
    const files = globSync(`**/components/${component}/__demo__/*.tsx`, {
      ignore: 'node_modules/**',
    });
    files.forEach(async (f) => {
      const file = join(process.cwd(), f.split(sep).join('/'));
      const fileName = basename(file);
      if (fileName === 'debug.tsx') return;

      test(`正确渲染 ${component} ${fileName}`, async () => {
        const Dom = require(file).default;

        const { container } = render(
          <BrowserRouter>
            <Dom />
          </BrowserRouter>,
        );

        if (config?.needWaitFor) {
          await waitFor(() => {
            expect(container).toMatchSnapshot();
          });
        } else {
          expect(container).toMatchSnapshot();
        }
      });
    });
  });
}
