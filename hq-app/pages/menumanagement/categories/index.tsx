import {
  FiltersListProvider,
  FiltersProvider,
} from '@fridayfood/shared/components';
import CategoriesList from 'containers/Categories';
const CategoryWrrapper = () => {
  return (
    <FiltersListProvider>
      <FiltersProvider>
        <CategoriesList />
      </FiltersProvider>
    </FiltersListProvider>
  );
};

export default CategoryWrrapper;
