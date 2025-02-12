import {
  BsFiletypeBmp,
  BsFiletypeDoc,
  BsFiletypeDocx,
  BsFiletypeGif,
  BsFiletypeMp3,
  BsFiletypeMp4,
  BsFiletypeXlsx,
} from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";
import { FiFileText, FiImage, FiVideo, FiFile } from "react-icons/fi";
import {
  PiFileJpgBold,
  PiFilePngBold,
  PiFileXlsBold,
  PiFileZipBold,
} from "react-icons/pi";
import { TbFileTypeCsv, TbFileTypeTxt } from "react-icons/tb";

export const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "pdf":
      return <FaFilePdf className="text-3xl text-red-500" />;
    case "png":
      return <PiFilePngBold className="text-3xl text-green-500" />;
    case "jpg":
      return <PiFileJpgBold className="text-3xl text-green-500" />;
    case "bmp":
      return <BsFiletypeBmp className="text-3xl text-green-500" />;
    case "jpeg":
      return <PiFileJpgBold className="text-3xl text-green-500" />;
    case "gif":
      return <BsFiletypeGif className="text-3xl text-green-500" />;
    case "mp3":
      return <BsFiletypeMp3 className="text-3xl text-purple-500" />;
    case "mp4":
      return <BsFiletypeMp4 className="text-3xl text-purple-500" />;
    case "mov":
    case "avi":
      return <FiVideo className="text-3xl text-purple-500" />;
    case "doc":
      return <BsFiletypeDoc className="text-3xl text-purple-500" />;
    case "docx":
      return <BsFiletypeDocx className="text-3xl text-purple-500" />;
    case "xls":
      return <PiFileXlsBold className="text-3xl text-purple-500" />;
    case "xlsx":
      return <BsFiletypeXlsx className="text-3xl text-purple-500" />;
    case "txt":
      return <TbFileTypeTxt className="text-3xl text-gray-500" />;
    case "csv":
      return <TbFileTypeCsv className="text-3xl text-purple-500" />;
    case "zip":
      return <PiFileZipBold className="text-3xl text-blue-500" />;
    default:
      return <FiFile className="text-3xl text-gray-500" />;
  }
};
