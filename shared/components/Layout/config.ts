import { PERMISSIONS } from '../../utils/permissions';

export const mainHeaderItemsHQ: any = {
  reports: [
    {
      name: 'Dashboard',
      link: '/reports/workspace',
      module: 'workspace',
      id: '1',
      permissionName: PERMISSIONS.VIEW_SALES_DASHBOARD,
    },
    {
      name: 'Sales Reports',
      link: '/reports/salesreports/home',
      module: 'salesreports',
      id: '2',
      permissionName: '',
    },
    // {
    //   name: 'Menu Report',
    //   link: '/reports/menureport/home',
    //   module: 'menureport',
    //   id: '3',
    // },
    // {
    //   name: 'Inventory Report',
    //   link: '/reports/inventoryreport/home',
    //   module: 'inventoryreport',
    //   id: '4',
    // },
  ],
  inventorymanagement: [
    {
      name: 'Dashboard',
      link: '/inventorymanagement/workspace',
      module: 'workspace',
      id: '1',
      permissionName: PERMISSIONS.VIEW_INVENTORY_DASHBOARD,
    },
    {
      name: 'On-Hand Inventory',
      link: '/inventorymanagement/onhandinventory/allOnHand',
      module: 'onhandinventory',
      id: '2',
      permissionName: PERMISSIONS.VIEW_ONHAND_INVENTORY,
    },
    {
      name: 'Inventory Adjustment',
      link: '/inventorymanagement/inventoryAdjustment',
      module: 'inventoryAdjustment',
      id: '3',
      permissionName: PERMISSIONS.VIEW_INVENTORY_ADJUSTMNET,
    },
    {
      name: 'Suppliers',
      link: '/inventorymanagement/suppliers',
      module: 'suppliers',
      id: '4',
      permissionName: PERMISSIONS.VIEW_SUPPLIER,
    },
  ],
  menumanagement: [
    {
      name: 'Dashboard',
      link: '/menumanagement/workspace',
      module: 'workspace',
      id: '1',
      permissionName: '',
    },
    {
      name: 'Products',
      link: '/menumanagement/products/finishedproduct',
      module: 'products',
      id: '2',
      permissionName: PERMISSIONS.VIEW_PRODUCT,
    },

    {
      name: 'Categories',
      link: '/menumanagement/categories',
      module: 'categories',
      id: '3',
      permissionName: PERMISSIONS.VIEW_CATEGORY,
    },

    {
      name: 'Modifiers',
      link: '/menumanagement/modifiers',
      module: 'modifiers',
      id: '4',
      permissionName: PERMISSIONS.VIEW_MODIFIER,
    },
    {
      name: 'Item Group',
      link: '/menumanagement/itemgroup',
      module: 'itemgroup',
      id: '5',
      permissionName: PERMISSIONS.VIEW_ITEM_GROUP,
    },
    // {
    //   name: 'Stock Control',
    //   link: '/menumanagement/stockcontroll',
    //   module: 'stockcontroll',
    //   id: '6',
    // },
  ],
  customersmanagement: [
    {
      name: 'Customers',
      link: '/customersmanagement/customers',
      module: 'customers',
      id: '1',
      permissionName: PERMISSIONS.VIEW_CUSTOMER,
    },
  ],

  storemanagement: [
    {
      name: 'Stores',
      link: '/storemanagement/stores',
      module: 'stores',
      id: '1',
      permissionName: PERMISSIONS.VIEW_STORE,
    },
    {
      name: 'Clusters',
      link: '/storemanagement/clusters',
      module: 'clusters',
      id: '2',
      permissionName: PERMISSIONS.VIEW_CLUSTER,
    },
    {
      name: 'Regions',
      link: '/storemanagement/regions',
      module: 'regions',
      id: '3',
      permissionName: PERMISSIONS.VIEW_REGION,
    },
    {
      name: 'Floor Management',
      link: '/storemanagement/floorManagement',
      module: 'floorManagement',
      id: '4',
      permissionName: '',
    },
  ],
  staffmanagement: [
    {
      name: 'Dashboard',
      link: '/staffmanagement/workspace',
      module: 'workspace',
      id: '1',
      permissionName: '',
    },
    {
      name: 'Employee',
      link: '/staffmanagement/employee',
      module: 'employee',
      id: '2',
      permissionName: PERMISSIONS.VIEW_EMPLOYEE,
    },
    {
      name: 'Roles',
      link: '/staffmanagement/roles',
      module: 'roles',
      id: '3',
      permissionName: PERMISSIONS.VIEW_ROLE,
    },
  ],
  settings: [
    {
      name: 'Payment Method',
      link: '/settings/payment',
      module: 'payment',
      id: '1',
      permissionName: PERMISSIONS.VIEW_PAYMENT_METHOD,
    },
    {
      name: 'Sales Price List',
      link: '/settings/pricelist',
      module: 'pricelist',
      id: '2',
      permissionName: PERMISSIONS.VIEW_SALES_PRICE_LIST,
    },
    {
      name: 'Tax',
      link: '/settings/tax',
      module: 'tax',
      id: '3',
      permissionName: PERMISSIONS.VIEW_TAX,
    },
    {
      name: 'Denominations',
      link: '/settings/denominations',
      module: 'denominations',
      id: '4',
      permissionName: PERMISSIONS.VIEW_DENOMINATIONS,
    },
    {
      name: 'Terminals',
      link: '/settings/terminals',
      module: 'terminals',
      id: '5',
      permissionName: PERMISSIONS.VIEW_TERMINAL,
    },
    // {
    //   name: 'Regions',
    //   link: '/settings/regions',
    //   module: 'regions',
    //   id: '6',
    // },
    // {
    //   name: 'Table Ordering',
    //   link: '/settings/tableordering',
    //   module: 'tableordering',
    //   id: '7',
    // },
    {
      name: 'Receipt',
      link: '/settings/receipt',
      module: 'receipt',
      id: '8',
      permissionName: PERMISSIONS.VIEW_RECIEPT,
    },
    {
      name: 'Kitchen Printer',
      link: '/settings/kitchenPrinter',
      module: 'kitchenPrinter',
      id: '9',
      permissionName: PERMISSIONS.VIEW_KITCHEN_PRINTER,
    },
    // {
    //   name: 'Aggregators',
    //   link: '/settings/aggregators',
    //   module: 'aggregators',
    //   id: '10',
    // },
    {
      name: 'UOM',
      link: '/settings/uom',
      module: 'uom',
      id: '11',
      permissionName: PERMISSIONS.VIEW_UOM,
    },
    // {
    //   name: 'Company',
    //   link: '/settings/company',
    //   module: 'company',
    //   id: '12',
    //   permissionName: '',
    // },
    {
      name: 'Number Series',
      link: '/settings/numberseries',
      module: 'numberseries',
      id: '12',
      permissionName: PERMISSIONS.VIEW_NUMBER_SERIES,
    },
    {
      name: 'Discount Codes',
      link: '/settings/discountcode',
      module: 'discountcode',
      id: '13',
      permissionName: PERMISSIONS.VIEW_NUMBER_SERIES,
    },
  ],
};

export const mainHeaderItemsWLA: any = {
  reports: [
    {
      name: 'Dashboard',
      link: '/reports/workspace',
      module: 'workspace',
      id: '1',
    },
  ],
  menumanagement: [
    {
      name: 'Products',
      link: '/menumanagement/products/finishedproduct',
      module: 'products',
      id: '2',
    },
  ],
  customersmanagement: [
    {
      name: 'Customers',
      link: '/customersmanagement/customers',
      module: 'customers',
      id: '1',
    },
  ],
  staffmanagement: [
    {
      name: 'Employee',
      link: '/staffmanagement/employee',
      module: 'employee',
      id: '0',
    },
  ],
  settings: [
    {
      name: 'Discount Codes',
      link: '/settings/discountcode/',
      module: 'discountcode',
      id: '2',
    },
  ],
};
