import authApi from '@/api'
const user = {
  state: {
    username:sessionStorage.getItem('username'),
    token:sessionStorage.getItem('token')
  },
  mutations: {
  	SET_USERNAME:(state, username) => {
      sessionStorage.setItem('username', username);
  		state.username = username;
    },
    SET_TOKEN:(state, token) => {
      sessionStorage.setItem('token', token);
  		state.token = token;
    }
  },
  actions: {
  	Logins({ commit }, params){
  		return new Promise((resolve, reject) => {         
        authApi.login(params).then(response => {
          console.log("121211111")
          console.log(response)
          if (response.code === 0) {
              commit('SET_USERNAME',params.username);  //将username和role进行存储
              commit('SET_TOKEN',response.token);
          }
          resolve(response); 
      }).catch(error => {       
          reject(error);
        });
      });
    },
    Loginsout({ commit }){
      return new Promise((resolve, reject) => {         
        authApi.logout.then(response => {
          console.log("11122")
          commit('SET_USERNAME',"");  //将username和role进行存储
          commit('SET_TOKEN',"");
          resolve(response); 
      }).catch(error => {       
          reject(error);
        });
      });
    }
  }
}
export default user;