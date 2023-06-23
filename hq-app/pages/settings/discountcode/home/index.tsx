import { dashboardStats } from '@/utils/helper';
import { Icon } from '@fridayfood/shared/components/Icon';
import MainHeader from '@fridayfood/shared/components/MainHeader';
import ModuleDashboardCard from '@fridayfood/shared/components/ModuleDashboardCard';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const onNavigateToOrderHistory = () => {
    router.push('/settings/discountcode');
  };

  return (
    <>
      <MainHeader title="Discounts" pagelisting="All Cards" />
      <div className="row">
        <ModuleDashboardCard
          title="Discount Code"
          items={dashboardStats}
          icon={<Icon variant="vendorGroups" />}
          onViewAll={onNavigateToOrderHistory}
        />
      </div>
    </>
  );
};
export default Home;
