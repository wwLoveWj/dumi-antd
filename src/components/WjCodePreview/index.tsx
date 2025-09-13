import { Button, message } from 'antd';
import classNames from 'classnames';
import copy from 'copy-to-clipboard';
import { formatJSON, parseJson } from 'magical-antd-ui';
import { useState } from 'react';
import './style.less';

export default function WjCodePreview({
  code,
  title = 'JavaScript',
}: {
  code: string;
  title: string;
}) {
  const [isCopying, setIsCopying] = useState(false);
  const copyCode = () => {
    try {
      copy(code);
      setIsCopying(true);
      setTimeout(() => {
        setIsCopying(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      message.error('复制出错了，' + err);
    }
  };
  return (
    <div className="codeContainer">
      <div className="languageLabel">{title}</div>
      <pre style={{ minWidth: 500, minHeight: 500, paddingTop: 50 }}>
        <code>
          {typeof parseJson(code, '') === 'object' ? formatJSON(code) : code}
        </code>
      </pre>
      {isCopying ? (
        <Button className={classNames('copyBtn', 'copied')} onClick={copyCode}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 13l4 4L19 7"></path>
          </svg>
          已复制
        </Button>
      ) : (
        <Button className="copyBtn" onClick={copyCode}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
          复制
        </Button>
      )}
    </div>
  );
}
