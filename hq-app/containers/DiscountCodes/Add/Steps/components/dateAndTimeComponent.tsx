import {
  useGetOptions,
  useSelectionGetter,
} from '@/utils/customHooks/useGetOtions';
import {
  CustomFieldComponent,
  ListHeaderWrapper,
} from '@fridayfood/shared/components';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import moment from 'moment';
import { UseFormReturn } from 'react-hook-form';
import { discountApi } from 'services/modules/discount.api';

const DateAndTimeComponent = ({
  formField,
  formData,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formField: { [key: string]: any };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: UseFormReturn<any>;
}) => {
  const { formattedOptions } = useGetOptions();

  const {
    register,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = formData;
  const {
    orderSource,
    discountCategory,
    discountName,
    discountCode,
    discountType,
    voucherLimit,
    category,
    amount,
    products,
    itemGroups,
    stores,
    customerLimit,
    maximumAmount,
    maximumLimit,
    startDate,
    endDate,
    startTime,
    endTime,
  } = formField;
  const itemGroupOptions = useSelectionGetter({
    endPoint: discountApi.itemGroups,
    method: 'GET',
    key: 'itemGroups',
    fieldsToShow: ['name'],
    baseURLType: 'products',
    dataPickFromItems: true,
    simpleOptions: true,
  });

  const productsOptions = useSelectionGetter({
    endPoint: discountApi.products,
    method: 'get',
    key: 'products',
    fieldsToShow: ['name'],
    baseURLType: 'products',
    simpleOptions: true,
  });
  const categoryOptions = useSelectionGetter({
    endPoint: discountApi.category,
    method: 'get',
    key: 'category',
    fieldsToShow: ['name'],
    baseURLType: 'products',
    simpleOptions: true,
  });
  const weekDays = [
    {
      name: 'S',
      value: 'saturday',
      id: 1,
    },
    {
      name: 'S',
      value: 'Sunday',
      id: 2,
    },
    {
      name: 'M',
      value: 'monday',
      id: 3,
    },
    {
      name: 'T',
      value: 'Tuesday',
      id: 4,
    },
    {
      name: 'W',
      value: 'wednesday',
      id: 5,
    },
    {
      name: 'T',
      value: 'thursday',
      id: 6,
    },
    {
      name: 'F',
      value: 'friday',
      id: 7,
    },
  ];
  return (
    <>
      <ListHeaderWrapper title="Date & Time" />
      <div className="col-sm-12 col-md-6">
        <CustomFieldComponent
          control={control}
          {...register(startDate.name)}
          min={moment().format('YYYY-MM-DD')}
          onChange={(e: { target: { value: string } }) => {
            return (
              setValue(startDate.name, e.target.value),
              setValue(endDate.name, e.target.value)
            );
          }}
          name={startDate.name}
          label={startDate.label}
          inputValue={watch(startDate.name)}
          errorMessage={errors?.startDate ? errors.startDate?.message : ''}
        />
      </div>
      <div className="col-sm-12 col-md-6">
        <CustomFieldComponent
          control={control}
          {...register(endDate.name)}
          min={moment(watch(startDate.name)).format('YYYY-MM-DD')}
          onChange={(e: { target: { value: string } }) =>
            setValue(endDate.name, e.target.value)
          }
          name={endDate.name}
          label={endDate.label}
          inputValue={watch(endDate.name)}
          errorMessage={errors?.endDate ? errors.endDate?.message : ''}
        />
      </div>
      <div className="col-sm-12 col-md-6">
        <div className="row justify-content-start">
          <div className="col-sm-12 col-md-3 col-form-label">Time</div>

          <div className="col-sm-12 col-md-3">
            <div className="form-control">
              <input
                type="time"
                // label={startTime.label}
                onChange={(e: { target: { value: string } }) =>
                  setValue('startTime', parseInt(e.target.value))
                }
                value={watch('startTime')}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-3">
            <div className="form-control">
              <input
                type="time"
                // label={endTime.label}
                onChange={(e: { target: { value: string } }) =>
                  setValue('endTime', parseInt(e.target.value))
                }
                value={watch('endTime')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-12 col-md-6">
        <div className="row justify-content-start">
          <div className="col-sm-12 col-md-3 col-form-label">Week Day</div>
          <div className="col-sm-12 col-md-5 justify-content-space-evemnly">
            <div className="row">
              {weekDays.map((item: any) => {
                return (
                  <div className="col-md-1 " style={{ margin: '6px' }}>
                    <button className="custom-grey-outline-btn">
                      {item?.name}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DateAndTimeComponent;
