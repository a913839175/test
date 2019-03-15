const getters = {
  username: state => state.user.username?state.user.username:'',
  Authorization: state => state.user.token?state.user.token:'',
};
export default getters