import React, { useState, useEffect } from "react";
import { Radio, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  notificationToast,
  successNotificationToast,
} from "../utils/numberFormatter";
import jsonAddress from "../assets/json/local.json";
import { actions as authActions } from "../redux/authRedux";
import Loading from "../components/Loading";

const { Option } = Select;

function ProfileAccount(props) {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const { isFetching } = authReducer;
  const { userDetail } = props;
  const [gender, setGender] = useState(1);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [editAddress, setEditAddress] = useState(false);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);
  const [infoUser, setInfoUser] = useState({
    address: "",
    full_name: "",
    email: "",
    phone: "",
    gender: 1,
    district: "",
    province: "",
    ward: "",
  });

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  useEffect(() => {
    if (infoUser.gender === true) {
      setGender(1);
    } else if (infoUser.gender === false) {
      setGender(0);
    }
    setInfoUser({
      address: userDetail.address ? userDetail.address : "",
      full_name: userDetail.full_name ? userDetail.full_name : "",
      email: userDetail.email ? userDetail.email : "",
      phone: userDetail.phone ? userDetail.phone : "",
      gender: userDetail.gender === true ? 1 : 0,
      district: userDetail.district ? userDetail.district : "",
      province: userDetail.province ? userDetail.province : "",
      ward: userDetail.ward ? userDetail.ward : "",
    });
  }, []);

  const onChangeGender = (e) => {
    console.log("radio checked", e.target.value);
    setGender(e.target.value);
    setInfoUser({ ...infoUser, gender: e.target.value });
  };

  const onChangeImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const onChangeInfoUser = (value) => {
    setInfoUser(value);
  };

  const changeInfo = () => {
    if (
      infoUser.full_name === "" ||
      infoUser.address === "" ||
      infoUser.ward === ""
    ) {
      notificationToast("Thông tin không được để trống");
      return;
    }

    dispatch(
      authActions.editInfo(
        {
          address: infoUser.address ? infoUser.address : "",
          full_name: infoUser.full_name ? infoUser.full_name : "",
          gender: infoUser.gender === true ? 1 : 0,
          district: infoUser.district ? infoUser.district : "",
          province: infoUser.province ? infoUser.province : "",
          ward: infoUser.ward ? infoUser.ward : "",
        },
        selectedFile,
        {
          onSuccess: () => {
            successNotificationToast("Cập nhập thành công");
          },
          onFailure: (text) => {
            notificationToast(text);
          },
        }
      )
    );
  };

  const handleChangeProvince = (id) => {
    const arr = jsonAddress.find((i) => i.id === id);
    setDataDistrict(arr.districts);
    setInfoUser({ ...infoUser, province: arr.name });
  };
  const handleChangeDistrict = (id) => {
    const arr = dataDistrict.find((i) => i.id === id);
    setDataWard(arr.wards);
    setInfoUser({ ...infoUser, district: arr.name });
  };
  const handleChangeWard = (id) => {
    const arr = dataWard.find((i) => i.id === id);
    setInfoUser({ ...infoUser, ward: arr.name });
  };

  return (
    <div className="edit-profile-account">
      {/* header */}
      <div className="header-edit">
        <h1 className="title-header">Hồ sơ của tôi</h1>
        <div className="text-header">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>

      {/* main */}
      <div className="goiz2O">
        <div className="pJout2">
          <div className="_3BlbUs">
            <div className="_1iNZU3">
              <div className="_2PfA-y">
                <label>Tên</label>
              </div>
              <div className="_2_JugQ">
                <div className="input-with-validator-wrapper">
                  <div className="input-with-validator">
                    <input
                      type="text"
                      placeholder=""
                      maxLength="255"
                      value={infoUser.full_name}
                      kl_vkbd_parsed="true"
                      onChange={(e) =>
                        onChangeInfoUser({
                          ...infoUser,
                          full_name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="_3BlbUs">
            <div className="_1iNZU3">
              <div className="_2PfA-y">
                <label>Email</label>
              </div>
              <div className="_2_JugQ">
                <div className="input-with-validator-wrapper">
                  <div className="input-with-validator">
                    <input type="text" defaultValue={infoUser.email} disabled />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="_3BlbUs">
            <div className="_1iNZU3">
              <div className="_2PfA-y">
                <label>Số điện thoại</label>
              </div>
              <div className="_2_JugQ">
                <div className="input-with-validator-wrapper">
                  <div className="input-with-validator">
                    <input type="text" defaultValue={infoUser.phone} disabled />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="_3BlbUs">
            <div className="_1iNZU3">
              <div className="_2PfA-y">
                <label>Địa chỉ</label>
              </div>
              <div className="_2_JugQ">
                {editAddress ? (
                  <div
                    className="input-with-validator-wrapper"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Select
                      defaultValue="Hà Nội"
                      style={{ width: 150 }}
                      onChange={handleChangeProvince}
                    >
                      {jsonAddress.map((province) => (
                        <Option value={province.id} key={province.id}>
                          {province.name}
                        </Option>
                      ))}
                    </Select>
                    <Select
                      defaultValue={"Quận/Huyện"}
                      style={{ width: 150 }}
                      onChange={handleChangeDistrict}
                    >
                      {dataDistrict?.length > 0 &&
                        dataDistrict.map((district) => (
                          <Option value={district.id} key={district.id}>
                            {district.name}
                          </Option>
                        ))}
                      <Option value="jack">Chọn Quận/Huyện</Option>
                    </Select>
                    <Select
                      defaultValue={"Phường/Xã"}
                      style={{ width: 150 }}
                      onChange={handleChangeWard}
                    >
                      {dataWard?.length > 0 &&
                        dataWard.map((ward) => (
                          <Option value={ward.id} key={ward.id}>
                            {ward.name}
                          </Option>
                        ))}
                      <Option value="jack">Chọn Phường/Xã</Option>
                    </Select>
                  </div>
                ) : (
                  <div
                    className="input-with-validator-wrapper"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    {infoUser.ward}, {infoUser.district}, {infoUser.province}
                    <div
                      style={{
                        marginLeft: "15px",
                        textDecoration: "underline",
                        color: "#3498db",
                      }}
                      onClick={() => setEditAddress(true)}
                    >
                      Thay đổi
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="_3BlbUs">
            <div className="_1iNZU3">
              <div className="_2PfA-y">
                <label>Địa chỉ cụ thể</label>
              </div>
              <div className="_2_JugQ">
                <div className="input-with-validator-wrapper">
                  <div className="input-with-validator">
                    <input
                      type="text"
                      placeholder=""
                      maxLength="255"
                      value={infoUser.address}
                      kl_vkbd_parsed="true"
                      onChange={(e) =>
                        onChangeInfoUser({
                          ...infoUser,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="_3BlbUs">
            <div className="_1iNZU3">
              <div className="_2PfA-y">
                <label>Giới tính</label>
              </div>
              <div className="_2_JugQ">
                <Radio.Group onChange={onChangeGender} value={gender}>
                  <Radio value={1}>Nam</Radio>
                  <Radio value={0}>Nữ</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
          <div className="_31PFen">
            <button
              type="button"
              className="btn-solid-primary btn--m btn--inline"
              aria-disabled="false"
              onClick={changeInfo}
            >
              Lưu
            </button>
          </div>
        </div>
        <div className="_1aIEbS">
          <div className="X1SONv">
            <div className="_1FzaUZ">
              <div className="YMBffn">
                {selectedFile ? (
                  <img src={preview} style={{ width: "100px" }} />
                ) : userDetail?.avatar_url ? (
                  <img src={userDetail.avatar_url} style={{ width: "100px" }} />
                ) : (
                  <svg
                    enable-background="new 0 0 15 15"
                    viewBox="0 0 15 15"
                    x="0"
                    y="0"
                    className="shopee-svg-icon _17Joz7 icon-headshot"
                  >
                    <g>
                      <circle
                        cx="7.5"
                        cy="4.5"
                        fill="none"
                        r="3.8"
                        stroke-miterlimit="10"
                      ></circle>
                      <path
                        d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6"
                        fill="none"
                        stroke-linecap="round"
                        stroke-miterlimit="10"
                      ></path>
                    </g>
                  </svg>
                )}
              </div>
            </div>
            <input
              id="file-upload-avatar"
              type="file"
              accept="image/*"
              style={{ contentVisibility: "hidden" }}
              onChange={onChangeImage}
            />
            <label
              htmlFor="file-upload-avatar"
              className="btn btn-light btn--m btn--inline"
            >
              Chọn ảnh
            </label>
            <div className="_3Jd4Zu">
              <div className="_3UgHT6">Dụng lượng file tối đa 1 MB</div>
              <div className="_3UgHT6">Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </div>

      {isFetching && (
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            zIndex: 11,
            height: "200vh",
          }}
        >
          <Loading />
        </div>
      )}
    </div>
  );
}

export default ProfileAccount;
