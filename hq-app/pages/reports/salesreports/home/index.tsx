import { dashboardStats } from '@/utils/helper';
import { Icon } from '@fridayfood/shared/components/Icon';
import MainHeader from '@fridayfood/shared/components/MainHeader';
import ModuleDashboardCard from '@fridayfood/shared/components/ModuleDashboardCard';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const onNavigateToOrderHistory = () => {
    router.push('/reports/salesreports/orderhistory');
  };
  const onNavigateToProductMixReport = () => {
    router.push('/reports/salesreports/productmixreport');
  };

  const onNavigateToCategoryMixReport = () => {
    router.push('/reports/salesreports/categorymixreport');
  };
  const onNavigateToFoodCosting = () => {
    router.push('/reports/salesreports/foodCosting');
  };
  return (
    <>
      <MainHeader title="Sales Reports" pagelisting="Showing 4-4" />
      <div className="row">
        <ModuleDashboardCard
          title="Sales Summary"
          items={dashboardStats}
          icon={<Icon variant="allVendors" />}
          //   onViewAll={onNavigateToVendor}
        />
        <ModuleDashboardCard
          title="Order History"
          items={dashboardStats}
          icon={<Icon variant="vendorGroups" />}
          onViewAll={onNavigateToOrderHistory}
        />
        <ModuleDashboardCard
          title="Hourly Sales"
          items={dashboardStats}
          icon={<Icon variant="vendorOnHold" />}
          //   onViewAll={inProgress}
        />
        <ModuleDashboardCard
          title="WISR"
          items={dashboardStats}
          icon={<Icon variant="vendorTransactions" />}
          //   onViewAll={onNavigateToVendorTransactions}
        />

        <ModuleDashboardCard
          title="Product Mix Report"
          items={dashboardStats}
          icon={<Icon variant="vendorTransactions" />}
          onViewAll={onNavigateToProductMixReport}
        />

        <ModuleDashboardCard
          title="Food Costing"
          items={dashboardStats}
          icon={<Icon variant="vendorTransactions" />}
          onViewAll={onNavigateToFoodCosting}
        />
        <ModuleDashboardCard
          title="Category Mix Report"
          items={dashboardStats}
          icon={<Icon variant="vendorTransactions" />}
          onViewAll={onNavigateToCategoryMixReport}
        />
      </div>
    </>
  );
};
export default Home;
