import { useContext, useEffect, useState } from 'react';
import FormFooterActions from '@fridayfood/shared/components/FromFooterAction';
import { useRouter } from 'next/router';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { RenderStepContent } from './Steps';
import {
  formInitialValues,
  validationSchema,
} from './FormConfig/validationSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ADD_MODIFIER_TYPE,
  ADD_UPDATE_FROM_PROPS,
  MODIFIER_DETAILS,
} from '../types';
import {
  useFetchModifiersQuery,
  useCreateUpdateModifierMutation,
} from 'services/modules/modifiers.api';
import {
  ProductsContext,
  ProductsDispatchContext,
  alertService,
} from '@fridayfood/shared/components';

const FormEnhancer = ({ modifierDetails }: ADD_UPDATE_FROM_PROPS) => {
  const setLines = useContext(ProductsDispatchContext);
  const lines = useContext(ProductsContext);
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formProps: any = useForm<ADD_MODIFIER_TYPE>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: formInitialValues,
  });

  useEffect(() => {
    if (modifierDetails?.id) {
      formProps.setValue('name', modifierDetails?.name);
      formProps.setValue('description', modifierDetails?.description);
      formProps.setValue('position', modifierDetails?.position);
      formProps.setValue('compulsory', modifierDetails?.compulsory);
      formProps.setValue('optional', !modifierDetails?.compulsory);
      formProps.setValue('modifierValues', modifierDetails?.modifierValues);
      formProps.setValue(
        'maxSelectionAllowed',
        modifierDetails?.maxSelectionAllowed,
      );
      const modifierSubValue = modifierDetails?.modifierValues?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => item?.modifierSubValues,
      );
      setLines({
        ...lines,
        detailsLines: modifierDetails?.modifierValues,
        subValues: modifierSubValue,
      });
    }
  }, [modifierDetails]);

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  const [createUpdateModifier] = useCreateUpdateModifierMutation();

  const { data } = useFetchModifiersQuery({});
  const ID = data?.items[0]?.id;

  const reloadPage = () => {
    window.location.href = `/menumanagement/modifiers/${ID}`;
  };
  const _handleSubmit = async (values: MODIFIER_DETAILS) => {
    const payload = {
      id: modifierDetails?.id ?? 0,
      name: values.name,
      description: values.description,
      position: Number(values.position) ?? 0,
      compulsory: values.compulsory ?? false,
      maxSelectionAllowed: Number(values.maxSelectionAllowed),
      compulsoryQuantity: Number(0),
      externalId: '',
      modifierValues: lines?.detailsLines?.map(
        (item: {
          saleUomId: { id: string | number };
          purchaseUomId: { id: string | number };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          modifierSubValues: any[];
          modifierValueTaxes: { id: string | number; taxId: string | number }[];
        }) => {
          return {
            ...item,
            modifierId: modifierDetails?.id,
            saleUomId: item?.saleUomId?.id,
            purchaseUomId: item?.purchaseUomId?.id,
            collectionPrice: Number(0),
            externalId: '',
            modifierSubValues: item?.modifierSubValues?.map(value => {
              return {
                name: value.value ? value.value : value.name,
              };
            }),
            modifierValueTaxes: item?.modifierValueTaxes?.map(
              (item: { id: number | string }) => {
                return {
                  externalId: '',
                  taxId: item?.id ?? 0,
                };
              },
            ),
          };
        },
      ),
    };
    const response: {
      error?: FetchBaseQueryError | SerializedError;
      data?: string | number | undefined | object;
    } = await createUpdateModifier(payload);
    if (response?.data) {
      // reloadPage();
      // router.push(`/menumanagement/modifiers/${ID}`);
      alertService.success(modifierDetails?.id ? 'Updated!' : 'Created', {
        keepAfterRouteChange: true,
        autoClose: true,
      });
    }
  };
  return (
    <div className="friday-vertical-tabs-container">
      <form onSubmit={formProps.handleSubmit(_handleSubmit)}>
        <div className="custom-tabs-wrapper custom-flex-start p-0 ">
          <RenderStepContent step={activeStep} formData={formProps} />
          <FormFooterActions
            activeStep={activeStep}
            handleBack={_handleBack}
            isLastStep={true}
          />
        </div>
      </form>
    </div>
  );
};

export default FormEnhancer;
