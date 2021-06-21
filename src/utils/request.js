/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { message } from 'antd';
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '修改数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * @zh-CN 异常处理程序
 * @en-US Exception handler
 */

const errorHandler = async(error) => {
  const { response } = error;

  

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    const result = await response.json();

    // 处理422
    if( status === 422 ) {
      let err = '';
      for ( const key in result.errors ) {
        err += result.errors[key][0];
      };
      errorText += `[ ${err} ]`
    }

    // 处理400
    if( status === 400 ){
      errorText += `[ ${result.message} ]`
    }

    message.error(errorText);
  } else if (!response) {
    message.error('Network anomaly');
  }

  return response;
};
/**
 * @en-US Configure the default parameters for request
 * @zh-CN 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // default error handling
  credentials: 'include', // Does the default request bring cookies
  prefix: '/api',
});

// 请求头添加token
request.interceptors.request.use((url, options) => {

  const token = 'hello';

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return {
    url,
    options: { ...options, headers },
  };
});

export default request;