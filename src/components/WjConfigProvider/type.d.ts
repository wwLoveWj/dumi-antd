// import type { BrowserOptions } from '@sentry/react';

// export interface SentryInterface extends BrowserOptions {
//   /**
//    * dev环境启用
//    * @default false
//    */
//   devEnable?: boolean;
//   /** 马上云方式  */
//   dsns?: {
//     'online-sentry-dsn': string;
//     'offline-sentry-dsn': string;
//   } & Record<string, string>;
// }
export interface MsConfigType {
  /**
   * 额外的icon资源
   */
  iconScriptUrl?: string | string[];

  /**
   * Sentry配置
   */
  sentryInfo?: SentryInterface;
}

export interface MsConfigPropsType extends MsConfigType {
  children: React.ReactNode;
}
