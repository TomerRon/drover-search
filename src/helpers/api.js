import fetch from "isomorphic-fetch";

class ApiService {
    
    static getVehicles(params) {
        return fetch('https://app.joindrover.com/api/web/vehicles', {
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(params)
        })
        .then(result => result.json())
        .then(res => {
            return res;
        });
    }
}

export default ApiService;
