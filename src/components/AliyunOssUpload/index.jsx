/*
 * @Author: your name
 * @Date: 2021-06-24 14:39:11
 * @LastEditTime: 2021-06-27 23:26:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \antd\src\components\AliyunOssUpload\index.js
 */
import React from 'react';
import { Upload, message } from 'antd';
import { OssConfig } from '@/services/common';

export default class AliyunOSSUpload extends React.Component {
  state = {
    OSSData: {},
  };


  async componentDidMount() {
    await this.init();
  }

  // 初始化，获取OSS签名
  init = async () => {
    try {
      const OSSData = await OssConfig();

      this.setState({
        OSSData,
      });
    } catch (error) {
      message.error(error);
    }
  };

  
  /**
   * @description: 上传的回调函数，直到文件上传结束
   * @param {*} fileList
   * @return {*}
   */
  onChange = ({ file }) => {
    if ( file.status === 'done' ){
      if (this.props.setCoverKey){
        this.props.setCoverKey(file.key);
      }
      if (this.props.insertImage){
        this.props.insertImage(file.url);
      }
      message.success('上传成功');
    }

  };

  /**
   * @description: 移除文件的回调函数
   * @param {*} fileList
   * @return {*}
   */
  /* onRemove = file => {
    const { value, onChange } = this.props;

    const files = value.filter(v => v.url !== file.url);

    if (onChange) {
      onChange(files);
    }
  }; */

  /**
   * @description:上传额外数据 
   * @param {*} file
   * @return {*}
   */  
  getExtraData = file => {
    const { OSSData } = this.state;

    return {
      key: file.key,
      OSSAccessKeyId: OSSData.accessid,
      policy: OSSData.policy,
      Signature: OSSData.signature,
    };
  };

  /**
   * @description: 选中文件，上传文件前的回调函数
   * @param {*} async
   * @return {*}
   */  
  beforeUpload = async file => {
    const { OSSData } = this.state;
    const expire = OSSData.expire * 1000;

    // 签名过期后重新上传
    if (expire < Date.now()) {
      await this.init();
    }

    const dir = 'react/yz/';

    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    file.key =  OSSData.dir+ dir + filename; // 用于上传文件，云存储中的key
    file.url = OSSData.host + OSSData.dir + dir + filename; // 上传后用于显示

    return file;
  };

  render() {
    const { value, accept, showUploadList } = this.props;
    const props = {
      accept: accept || '',
      name: 'file',
      fileList: value,
      action: this.state.OSSData.host,
      onChange: this.onChange,
      // onRemove: this.onRemove,
      data: this.getExtraData,
      beforeUpload: this.beforeUpload,
      listType: 'picture',
      maxCount: 1,
      showUploadList,
    };
    return (
      <Upload {...props}>
        {this.props.children}
      </Upload>
    );
  }
}
