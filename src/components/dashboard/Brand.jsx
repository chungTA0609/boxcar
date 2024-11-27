import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axiosInstance from "@/core/axiosInstance";
import { useStoreState, useStoreActions } from "easy-peasy";
export default function Brand() {
  const brandData = useStoreState((state) => state.brandData);
  const [isEdit, setIsEdit] = useState(false);

  const [images, setImages] = useState([]);
  const [params, setParams] = useState({
    name: "",
    logo: "",
  });
  const [imagesBinanry, setImagesBinanry] = useState([]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const newBinImg = [...imagesBinanry];
    newBinImg[index] = file;
    setImagesBinanry(newBinImg);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDelete = (index) => {
    const newImages = images.filter((_, imgIndex) => imgIndex !== index);
    setImages(newImages);
    const newImagesBinary = imagesBinanry.filter(
      (_, imgIndex) => imgIndex !== index
    );
    setImagesBinanry(newImagesBinary);
  };
  useEffect(() => {
    if (brandData) {
      setParams({ name: brandData.name, logo: brandData.logo });
      setIsEdit(true);
      setImages([brandData.logo]);
    }
  }, []);
  const uploadImg = async (element) => {
    try {
      const formData = new FormData();
      formData.append("file", element);

      const res = await axiosInstance.post(
        "/files/upload",
        formData
        // {
        //   headers: {
        //     Accept: undefined,
        //   },
        // }
      );
      setParams({ ...params, logo: res.data.data });
    } catch (error) {
      console.log(error);
      // toast.add({
      //   severity: "error",
      //   summary: "Lỗi",
      //   detail: "Lỗi hệ thống",
      //   life: 3000,
      // });
    }
  };
  const onSubmit = async () => {
    try {
      const res = await upLoadProcess();
      if (isEdit) {
        await axiosInstance.put(`/brands/${brandData.id}`, {
          ...params,
          logo: res.data.data,
        });
      } else {
        await axiosInstance.post(`/brands`, { ...params, logo: res.data.data });
      }
    } catch (error) {}
  };
  const upLoadProcess = async () => {
    await uploadImg(imagesBinanry[0]);
  };
  return (
    <section className="dashboard-widget-two">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Thông tin hãng</h3>
            </div>
            <div className="gallery-sec">
              <div className="right-box-three">
                <h6 className="title">Logo</h6>
                <div className="gallery-box">
                  <div className="inner-box add-input-image">
                    {images.map((imgSrc, index) => (
                      <div className="image-box" key={index}>
                        <img
                          width={190}
                          height={167}
                          src={imgSrc}
                          alt={`Preview ${index}`}
                          className="uploaded-img"
                        />
                        <div className="content-box">
                          <ul className="social-icon">
                            <li>
                              <a onClick={() => handleDelete(index)}>
                                <img
                                  width={18}
                                  height={18}
                                  src="/images/resource/delet.svg"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              {/* Hidden input and label for upload */}
                              <label htmlFor={`file-upload-${index}`}>
                                <a>
                                  <img
                                    width={18}
                                    height={18}
                                    src="/images/resource/delet1-1.svg"
                                    alt="Upload"
                                  />
                                </a>
                              </label>
                              <input
                                id={`file-upload-${index}`}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, index)}
                                style={{ display: "none" }}
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}

                    {/* Upload Button */}
                    {images.length === 0 && (
                      <div className="uplode-box">
                        <div className="content-box">
                          <label htmlFor="upload-new">
                            <img
                              width={34}
                              height={34}
                              src="/images/resource/uplode.svg"
                              alt="Upload"
                            />
                            <span>Upload</span>
                          </label>
                          <input
                            id="upload-new"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) =>
                              handleImageChange(e, images.length)
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text">
                    Max file size is 1MB, Minimum dimension: 330x300 And
                    Suitable files are .jpg &amp; .png
                  </div>
                </div>
              </div>
              <div className="form-sec">
                <form onSubmit={(e) => e.preventDefault()} className="row">
                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Tên hãng</label>
                      <input
                        name="name"
                        required
                        type="text"
                        placeholder="Tên hãng..."
                        onChange={(value) =>
                          setParams({
                            ...params,
                            name: value.target.value,
                          })
                        }
                        value={params.name}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="map-sec-two">
                <div className="form-sec-two">
                  <form onSubmit={(e) => e.preventDefault()} className="row">
                    <div className="form-submit">
                      <button
                        onClick={onSubmit}
                        className="theme-btn"
                        disabled={!(images.length > 0 && params.name)}
                      >
                        Lưu thông tin
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
