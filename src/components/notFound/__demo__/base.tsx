import { NotFound } from '@wj/magical-components';
import React, { useState } from 'react';
import './styles.less';

const Index = () => {
  const [placeholder, setPlaceholder] = useState('LOGIN');
  const [screenDom, setScreenDom] = useState<React.JSX.Element>(); //存放电视开机后的页面
  const handleOpenLogin = () => {
    let screen = document.getElementById('screen') as HTMLDivElement;
    screen.style.display = 'none';
    let screenOpen = document.getElementById('screenOpen') as HTMLDivElement;
    screenOpen.style.display = 'block';
    // screenOpen.style.background = 'red';
    // TODO：开机动画，可以打开注释试一试，样式自己调整哦，哈哈哈
    // let mainTv = document.getElementById('mainTv') as HTMLDivElement;
    // mainTv.style.transform = 'scale(3)';
    // mainTv.style.transition = '3s';
    // mainTv.style.position = 'absolute';
    // mainTv.style.right = '-7px';
    // mainTv.style.top = '-30px';
    let screenDom1 = () => {
      return (
        <div className={'tvGif'}>
          <img src={require('../../../assets/imgs/tv.gif')} alt="" />
        </div>
      );
    };
    setScreenDom(screenDom1);
    setPlaceholder('欢迎登录！');
  };
  return (
    <div className="login">
      <NotFound
        placeholder={placeholder}
        handleOpenLogin={handleOpenLogin}
        screen={screenDom}
      />
    </div>
  );
};

export default Index;
