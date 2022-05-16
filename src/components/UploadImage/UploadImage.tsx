import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import useUploadImage from 'hooks/useUploadFile';
import React, { useRef } from 'react';
import ImageList from './ImageList';
import { UploadImageProps } from './UploadImageModel';

const UploadImage: React.FC<UploadImageProps> = ({ isCloseEditAdd, data }) => {
  const { handleDeleteImage, handleUploadFiles, imgListPreview, fileList, loading } = useUploadImage();
  const inputUploadRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <ImageList images={data ?? imgListPreview} handleDeleteImage={handleDeleteImage} />
      <input
        type="file"
        multiple
        style={{ display: 'none' }}
        accept="image/png, image/gif, image/jpeg"
        ref={inputUploadRef}
        onChange={handleUploadFiles}
      />
      <div style={{ marginTop: '50px', textAlign: 'center' }}>
        {!isCloseEditAdd && (
          <Button
            className="border-rd-8"
            type="primary"
            icon={loading ? <LoadingOutlined /> : <UploadOutlined />}
            onClick={() => {
              inputUploadRef?.current?.click();
            }}
          >
            Thêm ảnh / video
          </Button>
        )}
      </div>
    </>
  );
};

export default UploadImage;
