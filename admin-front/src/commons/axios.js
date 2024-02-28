import _axios from 'axios';
import Cookies from 'universal-cookie'
// route of front->end

const cookies = new Cookies()

const axios = baseUrl => {
    const instance = _axios.create({
        baseURL: 'https://new-bee-crm.herokuapp.com/admin/',
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${cookies.get('token')}`
        }
    })
    return instance;
};

export { axios };

export default axios();
