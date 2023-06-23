import { ListHeaderWrapper, TabsVertical } from '@fridayfood/shared/components';
import { useState } from 'react';
import FilterHeader from '../CustomFilters/Filters/CustomFilters';
import useUtils from '../CustomFilters/Filters/useUtils';
import ProductsModal from '../Products/productsModal';
import AllTabs from './Tabs/All';
import Ingredients from './Tabs/Ingredients';
import Modifiers from './Tabs/Modifier';
import PackingMaterial from './Tabs/PackingMaterial';
import FileImporter from 'components/ImportExportFiles/FileImporter';
import { LOADER_TYPE } from '@/utils/constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OnHandInventory = (props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [openProducts, setOpenProducts] = useState<boolean>(false);
  const { setFilters, filters } = useUtils();
  const type = props?.type || '';
  const [payload, setPayload] = useState<{
    filter: boolean;
    clearFilter: boolean;
    allonhand: object;
    ingredientsinventory: object;
    packaginginventory: object;
    modifierinventory: object;
    allPresetId?: string;
    ingredientPresetId?: string;
    modifiersPresetId?: string;
    packagingPresetId?: string;
    params?: boolean;
  }>({
    filter: false,
    clearFilter: false,
    allonhand: {},
    ingredientsinventory: {},
    packaginginventory: {},
    modifierinventory: {},
    allPresetId: '',
    ingredientPresetId: '',
    modifiersPresetId: '',
    packagingPresetId: '',
    params: false,
  });

  const handleReset = () => {
    setPayload({
      ...payload,
      clearFilter: true,
      ingredientsinventory: {},
      packaginginventory: {},
      modifierinventory: {},
      allPresetId: type === 'allonhand' ? '' : payload?.allPresetId,
      ingredientPresetId:
        type === 'ingredientsinventory' ? '' : payload?.ingredientPresetId,
      packagingPresetId:
        type === 'packaginginventory' ? '' : payload?.packagingPresetId,
      modifiersPresetId:
        type === 'modifierinventory' ? '' : payload?.modifiersPresetId,
      params: true,
    });
    setFilters({ ...filters, userPreferences: [], FilterQuery: {} });
  };

  const handleApply = async (data: { value?: string }) => {
    setPayload({
      ...payload,
      clearFilter: false,
      allPresetId: type === 'allonhand' ? data?.value : '',
      ingredientPresetId: type === 'ingredientsinventory' ? data?.value : '',
      packagingPresetId: type === 'packaginginventory' ? data?.value : '',
      modifiersPresetId: type === 'modifierinventory' ? data?.value : '',
      params: false,
    });
  };

  const tabs = [
    {
      id: '1',
      name: 'allOnHand',
      title: 'All',
      module:
        props?.type === 'allonhand' ? <AllTabs payload={payload} /> : <></>,
      classes: '',
    },
    {
      name: 'ingredients',
      title: 'Ingredients',
      id: '2',
      module:
        props?.type === 'ingredientsinventory' ? (
          <Ingredients payload={payload} />
        ) : (
          <></>
        ),
      classes: '',
    },
    {
      name: 'packagingmaterials',
      title: 'Packaging Materials',
      id: '3',
      module:
        props?.type === 'packaginginventory' ? (
          <PackingMaterial payload={payload} />
        ) : (
          <></>
        ),

      classes: '',
    },
    {
      name: 'modifiers',
      title: 'Modifiers',
      id: '4',
      module:
        props?.type === 'modifierinventory' ? (
          <Modifiers payload={payload} />
        ) : (
          <></>
        ),

      classes: '',
    },
  ];

  return (
    <>
      <FileImporter
        type={LOADER_TYPE.ON_HAND_INVENTORY as keyof typeof LOADER_TYPE}
      />
      <ProductsModal open={openProducts} setOpen={setOpenProducts} />

      <div className="ag-theme-alpine">
        <div className="row">
          <ListHeaderWrapper title={'On-Hand Inventory'} />
        </div>
        <FilterHeader
          clearFilter={payload?.clearFilter}
          data={props?.data?.component ?? {}}
          handleApply={handleApply}
          handleReset={handleReset}
          type={props?.type}
          setPayload={setPayload}
          payload={payload}
        />
        <TabsVertical
          tabs={tabs}
          isNonWrap
          initialPath="/inventorymanagement/onhandinventory"
          noMargin="false"
          noBorder="false"
        />
      </div>
    </>
  );
};

export default OnHandInventory;
