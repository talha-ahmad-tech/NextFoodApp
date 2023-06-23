import { useState } from 'react';
import FormFooterActions from '@fridayfood/shared/components/FromFooterAction';
import { RenderStepContent } from './Steps';
import {
  formInitialValues,
  validationSchema,
} from './FormConfig/validationSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ADD_ITEM_GROUP_TYPE, ADD_UPDATE_FROM_PROPS } from '../types';
import router from 'next/router';
import {
  useCreateItemGroupMutation,
  useFetchItemGroupQuery,
  useUpdateItemGroupMutation,
} from 'services/modules/itemGroup.api';
import { alertService } from '@fridayfood/shared/components';

const FormEnhancer = ({ ItemGroupDetails }: ADD_UPDATE_FROM_PROPS) => {
  const [activeStep, setActiveStep] = useState(0);
  const formProps = useForm<ADD_ITEM_GROUP_TYPE>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: ItemGroupDetails?.id
      ? {
          name: ItemGroupDetails?.name,
          description: ItemGroupDetails?.description,
        }
      : formInitialValues,
  });

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  const reloadPage = () => {
    window.location.reload();
  };

  const [createItemGroup] = useCreateItemGroupMutation();
  const [updateItemGroup] = useUpdateItemGroupMutation();
  const { data } = useFetchItemGroupQuery({});
  const ID = data?.items[0]?.id;

  const handleAdd = async (payload: object, id: number) => {
    try {
      id
        ? updateItemGroup(payload)
            .then(() => {
              window.location.href = `/menumanagement/itemgroup/${id}`;
              alertService.success('Item Group Updated!', {
                keepAfterRouteChange: true,
                autoClose: true,
              });
            })
            .catch((error: unknown) => {
              const { message = '' }: { message?: string } = error || '';
              alertService.error(message, {
                keepAfterRouteChange: true,
                autoClose: true,
              });
            })
        : createItemGroup(payload).then(() => {
            window.location.href = `/menumanagement/itemgroup/${ID}`;
            alertService.success('Item Group Created!', {
              keepAfterRouteChange: true,
              autoClose: true,
            });
          });
    } catch (error:
      | { [key: string]: string }
      | unknown
      | object
      | { message: string }) {
      const { message = '' }: { message?: string } = error || '';
      alertService.error(message, {
        keepAfterRouteChange: true,
        autoClose: true,
      });
    }
  };

  function _handleSubmit(values: ADD_ITEM_GROUP_TYPE) {
    const payload = ItemGroupDetails?.id
      ? {
          id: ItemGroupDetails?.id,
          name: values.name,
          description: values.description,
          externalId: '',
          tenantId: null,
        }
      : {
          id: 0,
          name: values.name,
          description: values.description,
          externalId: '',
          tenantId: null,
        };
    handleAdd(payload, Number(ItemGroupDetails?.id));
  }

  return (
    <div className="friday-vertical-tabs-container">
      <form onSubmit={formProps.handleSubmit(_handleSubmit)}>
        <div className="custom-tabs-wrapper custom-flex-start p-0 ">
          <div className="friday-card card-shadow-1 border-radius-10 mb-5">
            <RenderStepContent step={activeStep} formData={formProps} />
          </div>
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
