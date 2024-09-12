import axios from 'axios';

export const handleChangeUtil = (formData, setFormData) => (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const handleSubmitRequestUtil = async (url, data, headers, successMessage, errorMessage, e, withCredentials = false) => {
    e.preventDefault();

    try {
        const response = await axios.post(url, data, {
            headers,
            withCredentials,
        });
        alert(successMessage);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response);
            alert(`${errorMessage}: ${error.response.data.message}`);
        } else if (error.request) {
            console.error('Error request:', error.request);
            alert('서버로부터 응답이 없습니다.');
        } else {
            console.error('Error message:', error.message);
            alert('요청 중 오류가 발생했습니다.');
        }
        throw error;
    }
};


export const handleLoginSubmitUtil = (url, formData, successMessage, errorMessage) => async (e) => {
    const form = new FormData();
    form.append('userId', formData.userId);
    form.append('userPwd', formData.userPwd);

    return await handleSubmitRequestUtil(
        url,
        form,
        { 'Content-Type': 'application/x-www-form-urlencoded' },
        successMessage,
        errorMessage,
        e,
        true
    );
};

export const handleRegisterSubmitUtil = (url, formData, successMessage, errorMessage) => async (e) => {
    return handleSubmitRequestUtil(
        url,
        formData,
        { 'Content-Type': 'application/json' },
        successMessage,
        errorMessage,
        e
    );
};
