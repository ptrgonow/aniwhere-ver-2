import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { handleChangeUtil, handleLoginSubmitUtil } from '../utils/formUtils';
import { API_ENDPOINTS } from '../config/apiConfig';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [formData, setFormData] = useState({
        userId: '',
        userPwd: ''
    });

    const handleChange = handleChangeUtil(formData, setFormData);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await handleLoginSubmitUtil(
                `${API_ENDPOINTS.USER_LOGIN}`,
                formData,
                '로그인이 완료되었습니다.',
                '로그인에 실패했습니다.'
            )(e);

            if (userData && userData.userName) {
                login(userData.userName);  // 로그인 후 userName 저장
                navigate('/');  // 홈으로 이동
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">로그인</h1>
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
                        <button className="btn btn-primary" type="submit">로그인</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
