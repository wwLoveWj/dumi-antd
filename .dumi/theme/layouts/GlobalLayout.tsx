import {useOutlet} from 'dumi';
import {ConfigProvider} from "antd";
import {MsConfigProvider} from "magical-antd-ui"
import zhCN from 'antd/es/locale/zh_CN';
// import moment from 'moment';
// import 'moment/locale/zh-cn';
import React from "react"
import { useMount } from 'ahooks';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// moment.locale('zh-cn');

function GlobalLayout(){
  const outlet = useOutlet();
  const location = useLocation();

  // 设计按钮要跳转新标签页
  useMount(()=>{
    setTimeout(()=>{
      const designLink = document.querySelector(".dumi-default-navbar > li:nth-child(1) > a:nth-child(1)");
      designLink?.addEventListener("click",(event)=>{
        event.preventDefault();
        window.open("/design");
      })
    },500)
  })

  // 跳转到 MsField 原子组件
  useEffect(()=>{
    let el:Element | null;
    const linkTo = (event:any)=>{
      event.preventDefault();
      window.open("/fields");
    }
    setTimeout(()=>{
      el = document.querySelector(".dumi-default-sidebar-group a[title='MsField - 表单项']");
      el?.removeEventListener("click", linkTo);
      el?.addEventListener("click",linkTo)
    },100)
    return ()=>{
      el?.removeEventListener("click", linkTo);
    }
  },[location.pathname])

  return <MsConfigProvider>
        <ConfigProvider locale={zhCN}>{outlet}</ConfigProvider>
    </MsConfigProvider>
}


export default GlobalLayout;
