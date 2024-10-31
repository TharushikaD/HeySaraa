
import Profile from "../../pages/Profile/Profile";
import SalonService from "../../pages/SalonService/SalonService";
import Users from "../../pages/Users/Users";


const routes = [
    // {
    //     name:'Users',
    //     key:'users',
    //     path:'/users',
    //     component:<Users/>

    // },
    // {
    //     name:'SalonService',
    //     key:'salonServices',
    //     path:'/salonServices',
    //     component:<SalonService/>

    // },

    {
      name:'Profile',
      key:'profile',
      path:'profile',
      component:<Profile/>
    }
];

export default routes;