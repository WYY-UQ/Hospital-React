import React, { Component } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { baseUrl } from '@/utils/config';
import { v4 as uuidv4 } from 'uuid';

export default class Dragger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: props.value?.length
        ? props.value?.map((item) => {
            return {
              status: item.status,
              percent: 100,
              url: item.url,
              uid: uuidv4(),
              name: item.name,
            };
          })
        : [],
    };
  }

  onChange = (info) => {
    const { onChange } = this.props;
    const { fileList } = this.state;
    const tmpFileList = info.fileList;
    tmpFileList.forEach((file) => {
      const exitFile = fileList.find((item) => item.uid === file.uid);
      if (exitFile) {
        exitFile.status = file.status;
        exitFile.url = file?.response?.data?.fileUrl || file.url;
        exitFile.percent = file.percent;
      } else {
        fileList.push({
          status: file.status,
          percent: file.percent,
          url: file.url,
          uid: file.uid,
          name: file.name,
        });
      }
    });
    this.setState({
      fileList,
    });
    onChange?.(
      fileList.map((item) => {
        return {
          fileUrl: item.url,
          fileName: item.name,
        };
      }),
    );
  };

  static getDerivedStateFromProps(props, state) {
    const { fileList } = state;
    const notDoneList = fileList.map((item) => item.status !== 'done');
    if (notDoneList.length) {
      return {};
    }
    const fileUrlList = fileList.map((item) => item.url);
    const propsFileUrlList = props.value?.filter((item) => item).map((item) => item.fileUrl);
    if (
      propsFileUrlList &&
      propsFileUrlList.length &&
      JSON.stringify(fileUrlList) !== JSON.stringify(propsFileUrlList)
    ) {
      return {
        fileList: props.value?.length
          ? props.value?.map((item) => {
              return {
                status: 'done',
                percent: 100,
                url: item.fileUrl,
                uid: uuidv4(),
                name: item.fileName,
              };
            })
          : [],
      };
    }
    return {};
  }

  render() {
    const { fileList } = this.state;
    return (
      <Upload.Dragger
        name="file"
        multiple={true}
        fileList={fileList}
        onChange={this.onChange}
        action={`${baseUrl}/common/upload`}
        accept=".jpg,.png"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
        <p className="ant-upload-hint">支持扩展名：.jpg .png</p>
      </Upload.Dragger>
    );
  }
}
