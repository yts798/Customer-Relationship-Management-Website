import _axios from 'axios';
import Cookies from 'js-cookie'
// route of front->end


const axios = baseUrl => {
    const instance = _axios.create({
        baseURL: 'https://new-bee-crm.herokuapp.com/',
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    })
    return instance;
};

export { axios };

export default axios();