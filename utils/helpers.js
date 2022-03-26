module.exports = {


  dashboardRoute: (userType, userId) => {
    if(userType === 'mentor'){
      return '/dashboardmentor/' + userId;
    }else{
      return '/dashboardstudent/' + userId;
    }


  }
};
