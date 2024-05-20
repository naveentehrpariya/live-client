import { Component } from 'react'
import Api from './Api';
class Endpoints extends Component {

    async sign_up(data) {
        return Api.post(`/user/signup`,data);
    }

    async login(data) {
        return Api.post(`/user/login`, data);
    }

    async user_profile() {
        return Api.get(`/user/profile`);
    }
    
    async create_stream(data) {
        return Api.post(`/create-stream`,data);
    }

    async stop_stream(data) {
        return Api.post(`/kill-stream`,data);
    }

    async lists_streams() {
        return Api.get(`/my-streams`);
    }
    
    async pricingPlanLists() {
        return Api.get(`/pricing-plans`);
    }
    async update_payment_status(data) {
        return Api.post(`/update-payment-status`, data);
    }
    async subscribePlan(data) {
        return Api.post(`/subscribe`,data);
    }

    async mymedia(type) {
        return Api.get(`/my-media/${type}`);
    }
    async uploadMedia(data, onProgress) {
        const config = {
            onUploadProgress: progressEvent => {
                console.log('Progress event:', progressEvent);
                if (onProgress) {
                    const percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log('Percent complete:', percentComplete);
                    onProgress(percentComplete);
                }
            }
        };
        return Api.post(`/cloud/upload`, data, config);
    }

    render() {
        return <></>
    }
}

export default Endpoints;