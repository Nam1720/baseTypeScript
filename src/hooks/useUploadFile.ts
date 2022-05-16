// import { getBase64 } from './../../../utils/helpers';
import { getBase64 } from '@/utils/helpers';
import { notification } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
// import { ImageDisplay } from './../model/product';

export interface ImageDisplay {
  fileData: string;
  id: number;
}

const useUploadImage = () => {
  const [fileList, setFileList] = useState<File[]>();
  const [imgListPreview, setImgListPreview] = useState<ImageDisplay[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fileList) {
      readFileUpload();
    }
  }, [fileList]);

  const readFileUpload = async () => {
    setLoading(true);
    const files = fileList?.map(async (file) => {
      const fileData = await getBase64(file);
      return { id: file.lastModified, fileData };
    });

    if (files) {
      Promise.allSettled(files)
        .then((res) => {
          const data = res.map((item) => {
            if (item.status === 'rejected') throw Error('error');
            return item.value;
          });
          setImgListPreview(data as ImageDisplay[]);
        })
        .catch((err) => {
          console.log(err);
          notification.error({ message: 'Có lỗi xảy ra !! vui lòng lòng upload ảnh lại' });
        });
    } else {
      setImgListPreview([]);
    }
    setLoading(false);
  };

  const handleUploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (!files) return;
    const newFiles = [...(fileList ?? []), ...Array.from(files)];
    setFileList(newFiles);
  };

  const handleDeleteImage = (id: number) => {
    const indexImagePreviewDeleted = imgListPreview.findIndex((item) => item.id === id);
    imgListPreview.splice(indexImagePreviewDeleted, 1);
    setImgListPreview([...imgListPreview]);
    if (fileList) {
      const indexFileDeleted = fileList.findIndex((item) => item.lastModified === id);
      fileList.splice(indexFileDeleted, 1);
      setFileList([...fileList]);
    }
  };

  return { handleDeleteImage, handleUploadFiles, imgListPreview, fileList, loading };
};

export default useUploadImage;
