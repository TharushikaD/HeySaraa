import Users from "../../pages/Users/Users";
import AdminServices from "../../pages/AdminServices/AdminServices";
import ProductManagement from "../../pages/ProductManagement/ProductManagement";

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

    }


];

export default adminRoutes;
