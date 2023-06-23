import Card from '@fridayfood/shared/components/Card';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { CustomFieldComponent } from '@fridayfood/shared/components';
import DealLines from '../DealLines';
import { IDealRecipesLines } from '../../types';
import moment from 'moment';
import { useProductDealLinesHook } from '../../productDealLinesHook';
import DealPriceLines from '../DealPriceLines';
import { useLayoutEffect } from 'react';

const lineData = [
  {
    title: 'In Store Price',
    type: 1,
  },
  {
    title: 'Delivery Price',
    type: 2,
  },
  {
    title: 'Collection Price',
    type: 3,
  },
];

const DealDetails = ({
  formField,
  formData,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formField: { [key: string]: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: UseFormReturn<any>;
}) => {
  const {
    register,
    watch,
    setValue,
    control,
    formState: { errors },
    getValues,
  } = formData;
  const { lines, setLines, componentName } = useProductDealLinesHook();
  const { startTime, endTime } = formField;

  const rowsData = lines?.priceRowData?.map((items: object, index: number) => ({
    ...items,
    id: 0,
    dealPriceType: index + 1,
    dealName: componentName,
    costPrice:
      index === 0
        ? lines?.cost?.eatInCost ?? 0
        : index === 1
        ? lines?.cost?.deliveryCost ?? 0
        : lines?.cost?.collectionCost ?? 0,
  }));

  const updatedRows: IDealRecipesLines[] = [...lines?.recipesLines];

  const addDealDetails = {
    productId: null,
    packagingMaterialId: null,
    grossMargin: 0,
    grossProfit: 0,
    isInStore: true,
    isDelivery: true,
    isCollection: true,
    componentType: '',
    componentTypeValue: '',
    componentTypeUrl: '',
    name: '',
    componentName,
    componentStatus: '',
    componentStatusValue: '',
    quantity: 0,
    totalCost: 0,
    tenantId: null,
    zero: 0,
    id: 0,
    dealId: 0,
    dealDetailId: 0,
    recipeId: 0,
    externalId: 'string',
    salePrice: 0,
    tax: 0,
    cost: 0,
    componentCost: 0,
    code: '',
  };

  const addNewRow = () => {
    const toSetRow: IDealRecipesLines = {
      ...addDealDetails,
    };

    updatedRows.unshift(toSetRow);
    setLines({
      ...lines,
      recipesLines: [...updatedRows],
    });
  };

  useLayoutEffect(() => {
    setLines({
      ...lines,
      priceRowData: rowsData,
    });
  }, [lines?.cost]);

  const PriceLines = lineData?.map(
    ({ title, type }: { title: string; type: number }, index: number) => (
      <div className="row" key={title}>
        <div className="border" />
        <h6 className="m-2">{title}</h6>
        <DealPriceLines type={type} rowData={[lines?.priceRowData[index]]} />
      </div>
    ),
  );

  return (
    <div>
      <Card Headertitle="Deal Insight">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <CustomFieldComponent
              type="date"
              min={moment().format('YYYY-MM-DD')}
              control={control}
              {...register(startTime.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(startTime.name, e.target.value)
              }
              label={startTime.label}
              value={watch(startTime.name)}
              errorMessage={errors?.startTime ? errors.startTime?.message : ''}
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <CustomFieldComponent
              control={control}
              {...register(endTime.name)}
              onChange={(e: { target: { value: string } }) =>
                setValue(endTime.name, e.target.value)
              }
              min={moment(getValues('startTime')).format('YYYY-MM-DD')}
              name={endTime.name}
              label={endTime.label}
              value={watch(endTime.name)}
              errorMessage={errors?.endTime ? errors.endTime?.message : ''}
            />
          </div>
        </div>
        <hr />
        <div className="col-sm-12 col-md-12">
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
              Add Lines
            </button>
          </div>
        </div>
        <div className="row">
          <DealLines type="recipes" />
        </div>
        {PriceLines}
      </Card>
    </div>
  );
};
export default DealDetails;
