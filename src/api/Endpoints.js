import { Component } from 'react'
import Api from './Api';
class Endpoints extends Component {
    async sign_up(data) {
        return Api.post(`/user/signup`,data);
    }
    async login(data) {
        return Api.post(`/user/login`, data);
    }
    
    render() {
        return (<></>)
    }
}

export default Endpoints;