import Users from "../../pages/Users/Users";
import AdminServices from "../../pages/AdminServices/AdminServices";
import ProductManagement from "../../pages/ProductManagement/ProductManagement";
import FaceShapeDetector from "../../pages/FaceShpeDetector/FaceShapeDetector";
import HaircutManagement from "../../pages/HairCutManagement/HairCutManagement";


const adminRoutes = [
    {
        name: 'Users',
        key: 'users',
        path: '/users',
        component: Users,
    },
    {
        name: 'Admin Services',
        key: 'adminServices',
        path: '/adminServices',
        component: AdminServices,
    },

    {
        name: 'Product Management',
        key: 'productManagement',
        path: '/productManagement',
        component: ProductManagement,

    },
    {
        name: 'Elegance AI',
        key: 'faceshapeDetector',
        path: '/faceshapeDetector',
        component:FaceShapeDetector,
    
    },
    {
        name: 'HairCut Management',
        key: 'haircutManagement',
        path: '/haircutManagement',
        component:HaircutManagement,
    
    }
   


];

export default adminRoutes;
