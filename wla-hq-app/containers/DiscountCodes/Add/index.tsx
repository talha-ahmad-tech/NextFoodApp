import ListWrapperMain from '@fridayfood/shared/components/ListWrapperMain/index';
import { useRouter } from 'next/router';
import { useFetchDiscountQuery } from 'services/modules/discount.api';
import { ADD_UPDATE_FROM_PROPS } from '../types';
import DisocuntFormEnhancer from './FormEnhancer';
const CreateDiscount = (props: ADD_UPDATE_FROM_PROPS) => {
  const { data } = useFetchDiscountQuery({});
  const router = useRouter();

  const getId = (id?: number) => {
    router.push(`/settings/discountcode/${id}`);
  };

  const addBtn = () => {
    router.push(`/settings/discountcode/add`);
  };
  return (
    <>
      <ListWrapperMain
        data={data?.data?.length > 0 ? data?.data : null}
        onItemClick={getId}
        addBtnClick={addBtn}
        labelToShow="name"
        Component={() => DisocuntFormEnhancer(props)}
        addButton={true}
        listTitle="Discounts"
      />
    </>
  );
};

export default CreateDiscount;
