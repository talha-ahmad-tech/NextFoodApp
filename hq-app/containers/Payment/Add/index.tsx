import ListHeaderWrapper from '@fridayfood/shared/components/ListHeaderWrapper';
import { ADD_UPDATE_FROM_PROPS } from '../types';
import FormFormEnhancer from './FormEnhancer';
import { PERMISSIONS } from '@/utils/permissions';
import withPermissions from '@fridayfood/shared/components/withPermissions';

const PaymentForm = (props: ADD_UPDATE_FROM_PROPS) => {
  console.log('props', props);

  return (
    <div className="ag-theme-alpine">
      <ListHeaderWrapper
        title={
          props.id
            ? (props?.paymentMethodDetails?.code as string)
            : 'Create Payment Method'
        }
      />
      <FormFormEnhancer {...props} />
    </div>
  );
};

export default withPermissions(PaymentForm, {
  permissionName: PERMISSIONS.CREATE_PAYMENT_METHOD,
});
