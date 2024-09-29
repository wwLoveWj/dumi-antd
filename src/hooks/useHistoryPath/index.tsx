import * as tmp from 'react-router-dom';

let historyPath = tmp as any;
// 兼容v5、v6的history跳转
const useHistoryToPath = () => {
  // react-router v5
  const history = historyPath.useHistory?.();
  // react-router v6
  const navigate = historyPath.useNavigate?.();

  const routeChgLink = (url: string) => {
    if (history) {
      history.push(url);
    }
    if (navigate) {
      navigate?.(url);
    }
  };
  return { routeChgLink };
};

export default useHistoryToPath;
