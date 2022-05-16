import React from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
import ThumbnailInput from 'components/thumbnail/Thumbnail';

const FormImage = (props: { from: FormComponentProps }) => {
  return (
    <div className="form-img">
      <ThumbnailInput />
    </div>
  );
};

export default FormImage;
