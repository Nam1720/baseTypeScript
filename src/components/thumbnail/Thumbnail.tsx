import React, { useState, useEffect } from 'react';
import { Image, Button, Progress, Tooltip } from 'antd';
import { UploadOutlined, CloseOutlined } from '@ant-design/icons';
import { APP_CONFIG } from '@/utils/env';
import { BaseApi } from 'utils/baseApi';
import { ThumbnailPropModel } from './ThumbnailModel';
import './_thumbnail.scss';

const baseApi = new BaseApi('');

const ThumbnailInput = (props: ThumbnailPropModel) => {
  const [imgLink, setImgLink] = useState(props.link);
  const [progress, setProgress] = useState(0);
  const [isUpload, setIsUpload] = useState(false);

  useEffect(() => {
    setImgLink(props.link);
  }, [props.link]);

  const onUploadFile = async ($event: any) => {
    setProgress(0);
    setIsUpload(true);
    const options = {
      onUploadProgress: (progressEvent: any) => {
        const { loaded, total } = progressEvent;
        setProgress((loaded / total) * 100);
      },
    };
    $event.optionUpload = options;
    const fileData = await baseApi.upload($event);
    setIsUpload(false);
    if (!fileData) {
      return;
    }
    const link = fileData[0];
    setImgLink(link);
    // Emit parent cpn
    props.change && props.change(link);
  };

  const deleteThumbnail = () => {
    props.change && props.change('');
  };

  return (
    <div className="thumbnail position-rel">
      <p className="thumbnail__img display-block text-center">
        {imgLink && (
          <>
            <Image width={150} src={APP_CONFIG.imgUrl + 'thumb/' + imgLink} placeholder="" />
            <Tooltip placement="top" title="Xoá">
              <Button
                danger
                shape="circle"
                className="position-abs thumbnail__img__del"
                icon={<CloseOutlined />}
                onClick={() => deleteThumbnail()}
              />
            </Tooltip>
          </>
        )}
      </p>
      {isUpload && (
        <Progress
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={progress}
          showInfo={false}
        />
      )}

      <Button icon={<UploadOutlined />} className="position-rel">
        Upload
        <input
          type="file"
          name="thumbnail"
          className="position-abs full-box opacity-0 cursor-pointer"
          onChange={onUploadFile}
        />
      </Button>
    </div>
  );
};

export default ThumbnailInput;
