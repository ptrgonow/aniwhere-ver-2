import React, { useState } from 'react';
import axios from 'axios';
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8543/user/register', formData);
            console.log(response);
            alert('회원가입이 완료되었습니다.');
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response);
                alert(`회원가입에 실패했습니다: ${error.response.data.message}`);
            } else if (error.request) {
                console.error('Error request:', error.request);
                alert('서버로부터 응답이 없습니다.');
            } else {
                console.error('Error message:', error.message);
                alert('회원가입 중 오류가 발생했습니다.');
            }
        }
    }

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
