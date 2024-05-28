import { Component } from 'react'
import Api from './Api';
class AdminEndpoints extends Component {
    async create_plan(data) {
        return Api.post(`/create-pricing-plan`,data);
    }
    
    render() {
        return <></>
    }
}

export default AdminEndpoints;