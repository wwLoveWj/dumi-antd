import { useMemoizedFn, useUpdate, useUpdateEffect } from 'ahooks';
import { parse, stringify } from 'qs';

import type { IParseOptions, IStringifyOptions } from 'qs';
import type * as React from 'react';
import { useMemo, useRef } from 'react';
import * as tmp from 'react-router';

// ignore waring `"export 'useNavigate' (imported as 'rc') was not found in 'react-router'`
const rc = tmp as any;

export interface Options {
  navigateMode?: 'push' | 'replace';
  parseOptions?: IParseOptions;
  stringifyOptions?: IStringifyOptions;
}

const baseParseConfig: IParseOptions = {
  ignoreQueryPrefix: true,
  strictNullHandling: true,
};

const baseStringifyConfig: IStringifyOptions = {
  encodeValuesOnly: true,
  skipNulls: false,
  strictNullHandling: true,
  filter(prefix, value) {
    if (prefix) {
      if (value === '') {
        return undefined;
      }
    }
    return value;
  },
};

type UrlState = Record<string, any>;

const useLinkParams = <S extends UrlState = UrlState>(
  initialState?: S | (() => S),
  options?: Options,
) => {
  type State = Partial<{ [key in keyof S]: any }>;
  const {
    navigateMode = 'push',
    parseOptions,
    stringifyOptions,
  } = options || {};

  const mergedParseOptions = { ...baseParseConfig, ...parseOptions };
  const mergedStringifyOptions = {
    ...baseStringifyConfig,
    ...stringifyOptions,
  };

  const location = rc.useLocation();

  // react-router v5
  const history = rc.useHistory?.();
  // react-router v6
  const navigate = rc.useNavigate?.();

  const update = useUpdate();

  /**
   * initialStateRef 修改两次，一次是在 setState 中，另一次是useUpdateEffect
   * useUpdateEffect 是兜底，有些依赖版本
   * 问题是初始化带参数，点击重置url更新正确，setUrlState 也正常，但是 targetState 不正常，因为没有触发 firstUpdateRef，还继承了 initialStateRef.current
   */
  const initialStateRef = useRef(
    typeof initialState === 'function'
      ? (initialState as () => S)()
      : initialState || {},
  );

  const queryFromUrl = useMemo(() => {
    return parse(location.search, mergedParseOptions);
  }, [location.search]);

  const firstUpdateRef = useRef(false);

  useUpdateEffect(() => {
    firstUpdateRef.current = true;
  }, [location.search]);

  const targetState: State = useMemo(() => {
    if (firstUpdateRef.current) {
      return queryFromUrl as State;
    } else {
      return {
        ...initialStateRef.current,
        ...queryFromUrl,
      };
    }
  }, [queryFromUrl]);

  const setState = (s: React.SetStateAction<State>) => {
    const newState = typeof s === 'function' ? s(targetState) : s;

    // 1. 如果 setState 后，search 没变化，就需要 update 来触发一次更新。比如 demo1 直接点击 clear，就需要 update 来触发更新。
    // 2. update 和 history 的更新会合并，不会造成多次更新
    update();
    if (history) {
      history[navigateMode](
        {
          hash: location.hash,
          search:
            stringify(
              { ...queryFromUrl, ...newState },
              mergedStringifyOptions,
            ) || '?',
        },
        location.state,
      );
    }
    if (navigate) {
      navigate(
        {
          hash: location.hash,
          search:
            stringify(
              { ...queryFromUrl, ...newState },
              mergedStringifyOptions,
            ) || '?',
        },
        {
          replace: navigateMode === 'replace',
          state: location.state,
        },
      );
    }
    firstUpdateRef.current = true;
  };

  return [targetState, useMemoizedFn(setState)] as const;
};

export default useLinkParams;
