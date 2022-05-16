import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import { Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ImageDisplay } from './UploadImageModel';
import './_ImageList.scss';

interface ImageListProps {
  images: ImageDisplay[];
  handleDeleteImage: (id: number) => void;
}

const initImageSwiper = [
  { id: 1, src: './../../../assets/images/img-place-holder.jpg' },
  { id: 2, src: './../../../assets/images/img-place-holder.jpg' },
  { id: 3, src: './../../../assets/images/img-place-holder.jpg' },
  { id: 4, src: './../../../assets/images/img-place-holder.jpg' },
];

const ImageList: React.FC<ImageListProps> = (props) => {
  const [activeThumb, setActiveThumb] = useState<Swiper>();
  const isUsed = props.images.length === 0;

  return (
    <div>
      <Swiper
        loop={true}
        spaceBetween={5}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{ swiper: activeThumb }}
        className="product-images-slider"
      >
        {props?.images?.map((item) => (
          <SwiperSlide key={item.id}>
            <Button
              shape="circle"
              className="product-swiper-button"
              icon={<DeleteOutlined />}
              onClick={() => props.handleDeleteImage(item.id)}
            ></Button>
            <img src={item.fileData} alt="product images" />
          </SwiperSlide>
        ))}
        {isUsed &&
          initImageSwiper.map((item) => (
            <SwiperSlide key={item.id}>
              <img src={item.src} alt="img" />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={setActiveThumb}
        loop={false}
        spaceBetween={5}
        slidesPerView={4}
        modules={[Navigation, Thumbs]}
        className="product-images-slider-thumbs"
      >
        {props?.images.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="product-images-slider-thumbs-wrapper">
              <Button
                shape="circle"
                size="small"
                className="product-thumb-button"
                icon={<DeleteOutlined />}
                onClick={() => props.handleDeleteImage(item.id)}
              ></Button>
              <img src={item.fileData} alt="product images" />
            </div>
          </SwiperSlide>
        ))}
        {isUsed &&
          initImageSwiper.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="product-images-slider-thumbs-wrapper">
                <img src={item.src} alt="img" />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default ImageList;
