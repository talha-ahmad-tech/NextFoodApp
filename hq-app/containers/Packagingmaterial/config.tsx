import { PACKAGINGMATERIAL_DETAILS } from './types';

export const tabsConfiguration = ({
  code = '',
  kitName = '',
  itemGroupName = '',
  activeFrom = '',
  activeTo = '',
  standardCost = '',
  totalRetailPrice = '',
  purchaseTaxGroupName = '',
  saleTaxGroupName = '',
}: PACKAGINGMATERIAL_DETAILS) => {
  return [
    {
      id: 'general',
      label: 'General',
      classes: 'active',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Sequence Number', value: code },
        { name: 'Name', value: kitName },
        { name: 'Item Group', value: itemGroupName },
        { name: 'Active From', value: activeFrom },
        { name: 'Active To', value: activeTo },
        { name: 'Standard Cost', value: standardCost },
        { name: 'Retail Price', value: totalRetailPrice },
        { name: 'Purchase Tax Group', value: purchaseTaxGroupName },
        { name: 'Sale Tax Group', value: saleTaxGroupName },
      ],
      image: {},
    },
  ];
};
