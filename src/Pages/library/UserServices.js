class UserServices {

   
      getToken() {
        return localStorage.getItem('token');
      }
      
      getDepoId() {
        return JSON.parse(localStorage.getItem('user')).depoId;
      }

      getFullName() {
        let user=JSON.parse(localStorage.getItem('user'));
        return user.name+' '+user.surName;
      }

      getUserId() {
        let user=JSON.parse(localStorage.getItem('user'));
        return user.id;
      }

      getUser() {
        return JSON.parse(localStorage.getItem('user'));
      }

      getProjectList() {
        return JSON.parse(localStorage.getItem('projectList'));
      }

}

export default new UserServices();