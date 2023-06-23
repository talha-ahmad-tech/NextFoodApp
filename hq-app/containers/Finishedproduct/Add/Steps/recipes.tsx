import Card from '@fridayfood/shared/components/Card';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import React from 'react';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { useProductDealLinesHook } from '../../productDealLinesHook';
import { IFINISHEDPRODUCTRecipesLines } from '../../types';
import DealLines from '../DealLines';
import { ListHeaderWrapper, TableGrid } from '@fridayfood/shared/components';
import { columnDefsForModifiers } from '@/containers/Products/config';
interface IRecipes {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formField: { [key: string]: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: UseFormReturn<any>;
  setRecipes?: React.Dispatch<
    React.SetStateAction<IFINISHEDPRODUCTRecipesLines[]>
  >;
  recipes?: IFINISHEDPRODUCTRecipesLines[];
}
const DealRecipes: React.FC<IRecipes> = ({ formField, formData }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = formData;
  const {
    recipesName,
    recipesCostCollection,
    recipesEatInCost,
    recipesDeliveryCost,
    recipeType,
  } = formField;
  const { lines, setLines } = useProductDealLinesHook();

  const updatedRows: IFINISHEDPRODUCTRecipesLines[] = [...lines?.recipesLines];
  const addDealDeatls = {
    componentType: '',
    componentTypeValue: '',
    name: '',
    componentStatus: '',
    componentStatusValue: '',
    sellingUom: '',
    eatIn: true,
    collection: true,
    delivery: true,
    unitCost: 0,
    quantity: 0,
    totalCost: 0,
    tenantId: null,
    zero: 0,
    id: 0,
  };
  const addNewRow = () => {
    const toSetRow: IFINISHEDPRODUCTRecipesLines = {
      ...addDealDeatls,
    };
    updatedRows.unshift(toSetRow);
    setLines({ ...lines, recipesLines: [...updatedRows] });
  };

  const modifierDetails = lines.productModifiers?.map(
    (item: { productModifierValues: [] }) => {
      return item?.productModifierValues.map(
        (details: { [key: string]: string | number | boolean }) => details,
      );
    },
  );

  const newDetails = modifierDetails?.flat(1);
  return (
    <div>
      <Card Headertitle="Recipes">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Field
              disabled
              type="text"
              {...register('productName')}
              value={watch('productName')}
              label={recipesName.label}
              errorMessage={
                errors?.recipesName ? errors?.recipesName?.message : ''
              }
            />
          </div>

          <div className="col-sm-12 col-md-6">
            <Field
              disabled
              type="text"
              {...register('recipesCostCollection')}
              label={recipesCostCollection.label}
              value={lines?.cost?.collectionCost}
              errorMessage={
                errors?.recipesCostCollection
                  ? errors?.recipesCostCollection?.message
                  : ''
              }
            />
          </div>

          <div className="col-sm-12 col-md-6">
            <Field
              disabled
              type="text"
              {...register('recipesEatInCost')}
              value={lines?.cost?.eatInCost}
              label={recipesEatInCost.label}
              errorMessage={
                errors?.recipesEatInCost
                  ? errors?.recipesEatInCost?.message
                  : ''
              }
            />
          </div>

          <div className="col-sm-12 col-md-6">
            <Field
              disabled
              type="text"
              {...register('recipesDeliveryCost')}
              label={recipesDeliveryCost.label}
              value={lines?.cost?.deliveryCost}
              errorMessage={
                errors?.recipesDeliveryCost
                  ? errors?.recipesDeliveryCost?.message
                  : ''
              }
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Field
              type="select"
              {...register('recipeType')}
              options={recipeType.options}
              label={recipeType.label}
              value={watch('recipeType')}
              onChange={(e: { name?: string; id?: number }) => {
                setValue('recipeType', e?.id);
                setValue('recipeTypeName', e?.name);
              }}
              // closeMenuOnSelect
              errorMessage={
                errors?.recipeType ? errors?.recipeType?.message : ''
              }
            />
          </div>
        </div>
        <ListHeaderWrapper title="Modifiers" />
        <TableGrid
          rowData={
            lines?.productModifiers.length
              ? newDetails
              : lines.productModifierDetails
          }
          columnDefs={columnDefsForModifiers}
          pagination={false}
        />
        <div className="border-t-1 pt-3">
          <div className="mb-2 d-flex justify-content-end">
            <button
              className="friday-btn-primary friday-btn-md font-medium ms-2"
              onClick={addNewRow}
              type="button"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="5.586"
                  height="5.387"
                  viewBox="0 0 5.586 5.387"
                >
                  <path
                    id="Path_2060"
                    data-name="Path 2060"
                    d="M.618-2.621H2.884v2.17H3.932v-2.17H6.2V-3.668H3.932v-2.17H2.884v2.17H.618Z"
                    transform="translate(-0.618 5.838)"
                    fill="#0b77e3"
                  />
                </svg>
              </span>
              Add Component
            </button>
          </div>
          <div className="row">
            <DealLines type="recipes" />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default DealRecipes;
