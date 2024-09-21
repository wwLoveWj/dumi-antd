import { startSakura } from 'dumi-umi-ww';
import React, { useEffect } from 'react';
const App: React.FC = () => {
  useEffect(() => {
    startSakura();
  }, []);

  return <>樱花飘落</>;
};

export default App;
