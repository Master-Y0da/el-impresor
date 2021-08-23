import axios from 'axios'
import appInstance from '@/main'
import router from './index'


axios.interceptors.request.use(async (config) => {
    if(config.url == '/') return config

    if(!config.url.includes('/auth/login') && !config.url.includes('/auth/signup')){

      const user = await appInstance.config.globalProperties.$db.get('user')

      if(config.url.includes('/auth/refresh')) {config.headers.common['Authorization'] = 'Bearer '+user.refresh_token}
      else {config.headers.common['Authorization'] = 'Bearer '+user.access_token}      
    }

    return config
},
(error) => {
  return Promise.reject(error);
  }
)


axios.interceptors.response.use((response) => {
         return response
    },
    async error => {
      if(error.response){

        const originalRequest = error.config;

        if(error.response.data.code == 422 && originalRequest.url === process.env.VUE_APP_API_URL+'auth/refresh'){

          router.push({name: 'login'});
          return Promise.reject(error);

        }

        if(error.response.data.code == 422 && !originalRequest._retry){

          originalRequest._retry = true;

            axios.post(process.env.VUE_APP_API_URL+'auth/refresh')
            .then(async(response) => {     
              const refresh = await appInstance.config.globalProperties.$db.get('user')

              refresh.access_token = response.data.access_token
              console.log(refresh)
              await appInstance.config.globalProperties.$db.set('user',  refresh)
              return axios(originalRequest)
            })
        }      
      }
      return Promise.reject(error)
    }
);


export default axios