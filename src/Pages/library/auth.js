

export default {
  isAuthenticated: false,

  authenticate(cb) {
    this.isAuthenticated = true
  },

  signout(cb) {
    this.isAuthenticated = false
  },

  logged() {
    console.log(localStorage.getItem("access_token"));
     if(localStorage.getItem("access_token")){
         console.log("login olmuş");
            return true;}
     else 
           return false;
  }
}

