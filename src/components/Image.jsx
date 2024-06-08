import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const Image = () => {
    const navigate = useNavigate()
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.put(
        `http://localhost:7000/uploads/65c4d83ca24660a63553d068`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        const uploadedImgUrl = response.data.userImage.image;
        setImgUrl(uploadedImgUrl);
        console.log('File uploaded successfully', uploadedImgUrl);
      } else {
        throw new Error('Error found while uploading file');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-32 mt-10 flex flex-col gap-6">
      <div>
        <input type="file" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          className="px-2 py-1 bg-red-400 rounded-sm"
        >
          Upload
        </button>
      </div>
      <div className="w-96 h-64 border-2">
        {imgUrl && (
          <img src={imgUrl} alt="Uploaded" className="w-full h-full" />
        )}
      </div>
    </div>
  );
};
