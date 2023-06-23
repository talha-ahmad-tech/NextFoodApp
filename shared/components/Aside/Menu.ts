import { IMenuItem } from './component/MenuLink';

const Menu: IMenuItem[] = [
  {
    id: 'reports',
    icon: 'procurementManagement',
    name: 'Sales Management',
    link: '/reports/workspace',
    root: 'reports',
  },
  {
    id: 'menu-management',
    icon: 'salesManagement',
    name: 'Menu Management',
    link: '/menumanagement/workspace',
    root: 'menumanagement',
  },
  {
    id: 'inventory-management',
    icon: 'warehousemanagement',
    name: 'Inventory Management',
    link: '/inventorymanagement/workspace',
    root: 'inventorymanagement',
  },
  {
    id: 'customers-mangement',
    icon: 'salesManagement',
    name: 'Customers Management',
    link: '/customersmanagement/customers',
    root: 'customersmanagement',
  },
  {
    id: 'storemanagement',
    icon: 'warehousemanagement',
    name: 'Store Management',
    link: '/storemanagement/stores',
    root: 'storemanagement',
  },
  {
    id: 'staff-management',
    icon: 'salesManagement',
    name: 'Staff Management',
    link: '/staffmanagement/employee',
    root: 'staffmanagement',
  },
  {
    id: 'settings',
    icon: 'systemAdministration',
    name: 'Settings',
    link: '/settings/payment',
    root: 'settings',
  },
];

export default Menu;

export const MenuWLA: IMenuItem[] = [
  {
    id: 'reports',
    icon: 'procurementManagement',
    name: 'Reports',
    link: '/reports/workspace',
    root: 'reports',
  },
  {
    id: 'menu-management',
    icon: 'salesManagement',
    name: 'Menu Management',
    link: '/menumanagement/products/finishedproduct',
    root: 'menumanagement',
  },
  {
    id: 'customers-mangement',
    icon: 'salesManagement',
    name: 'Customers Management',
    link: '/customersmanagement/customers',
    root: 'customersmanagement',
  },
  {
    id: 'settings',
    icon: 'systemAdministration',
    name: 'Settings & Configuration',
    link: '/settings/discountcode',
    root: 'settings',
  },
];

export const MenuSuperAdmin: IMenuItem[] = [
  {
    id: 'company',
    icon: 'procurementManagement',
    name: 'Company',
    link: '/companymanagement/company',
    root: 'companymanagement',
  },
];
