import axios from 'axios';
import interceptor from "../library/interceptor";
const BASE_URL = 'http://localhost:8085/blue/';


const proxyOptions = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'http://localhost:8085/blue/',
        'crossdomain': 'true'
    },
};



class RestServices {

    authenticate (loginObject){
        return axios.post(BASE_URL+'auth/authenticate' , loginObject);
    }

    post(path,body,requestConfig){
        let endpointUrl  = BASE_URL + path;
 
        return axios.post(endpointUrl,body,requestConfig ? requestConfig:proxyOptions);
    }

    getProject(depoId){
        let endpointUrl  = BASE_URL + 'api/v3/'+depoId+'/projects';
        return axios.get(endpointUrl,proxyOptions);
     
    }

    getCommonData(depoId,projectIds){
        let endpointUrl  = BASE_URL + 'api/v3/'+depoId+'/common-data';

        const commonObject = {
            projectId: projectIds
          };

        return axios.post(endpointUrl,commonObject,proxyOptions);
     
    }


    refreshtoken (){
        return axios.get(BASE_URL+'refreshtoken' , proxyOptions);
    }

    

 



}

export default new RestServices();