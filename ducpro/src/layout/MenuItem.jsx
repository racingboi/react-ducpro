import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
export const navigationItems = [
  { id: 'dashboard', text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  {
    id: 'products',
    text: 'Products',
    icon: <ProductionQuantityLimitsIcon />,
    path: '/dashboard/products',
    children: [
      { id: 'add-product', text: 'Add Product', path: '/dashboard/products', icon: <AddIcon />},
      { id: 'list-product', text: 'List Products', path: '/dashboard/products', icon: <ListIcon />},
    ]
  },
  {
    id: 'users', text: 'Users', icon: <PersonIcon />, path: '/dashboard/users',
    children: [
      { id: 'add-user', text: 'Add User', path: '/dashboard/user', icon: <AddIcon /> },
      { id: 'list-user', text: 'List User', path: '/dashboard/user', icon: <ListIcon /> },
    ]
  },
];
