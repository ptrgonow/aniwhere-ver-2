import React, { useState } from 'react';
import {handleChangeUtil, handleRegisterSubmitUtil} from '../utils/formUtils';
import { API_ENDPOINTS } from '../config/apiConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';

function Register() {
    const [formData, setFormData] = useState({
        userId: '',
        userPwd: '',
        userName: '',
        email: '',
        address: '',
        addressDetail: '',
        zipCode: '',
        phone: ''
    });

    const handleChange = handleChangeUtil(formData, setFormData);
    const handleSubmit = handleRegisterSubmitUtil(
        `${API_ENDPOINTS.USER_REGISTER}`, formData,
        '회원 가입이 완료되었습니다.',
        '회원 가입에 실패했습니다.'
    );

    return (
        <div className="container">
            <h1 className="text-center my-4">회원 가입</h1>
            <form onSubmit={handleSubmit}>
                <div className="row d-flex align-items-center justify-content-center flex-column mb-3">
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                name="userId"
                                value={formData.userId}
                                onChange={handleChange}
                                className="form-control"
                                id="floatingUserId"
                                placeholder="아이디"
                                required
                            />
                            <label htmlFor="floatingUserId">아이디</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                name="userPwd"
                                value={formData.userPwd}
                                onChange={handleChange}
                                className="form-control"
                                id="floatingUserPwd"
                                placeholder="비밀번호"
                                required
                            />
                            <label htmlFor="floatingUserPwd">비밀번호</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                className="form-control"
                                id="floatingUserName"
                                placeholder="이름"
                                required
                            />
                            <label htmlFor="floatingUserName">이름</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                id="floatingEmail"
                                placeholder="이메일"
                                required
                            />
                            <label htmlFor="floatingEmail">이메일</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="form-control"
                                id="floatingAddress"
                                placeholder="주소"
                                required
                            />
                            <label htmlFor="floatingAddress">주소</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                name="addressDetail"
                                value={formData.addressDetail}
                                onChange={handleChange}
                                className="form-control"
                                id="floatingAddressDetail"
                                placeholder="상세주소"
                                required
                            />
                            <label htmlFor="floatingAddressDetail">상세주소</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}
                                className="form-control"
                                id="floatingZipCode"
                                placeholder="우편번호"
                                required
                            />
                            <label htmlFor="floatingZipCode">우편번호</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="form-control"
                                id="floatingPhone"
                                placeholder="전화번호"
                                required
                            />
                            <label htmlFor="floatingPhone">전화번호</label>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">회원 가입</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
