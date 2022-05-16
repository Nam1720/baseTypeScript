export interface ImageDisplay {
  fileData: string;
  id: number;
}
export interface UploadImageProps {
  isCloseEditAdd: boolean;
  data?: ImageDisplay[];
}
