import DashboardInfo from "./components/dashboard-info";
import DashboardMenu from "./components/dashboard-menu";

const DashboardPage = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full max-w-2xl space-y-12">
        <DashboardInfo />

        <DashboardMenu />
      </div>
    </div>
  );
};

export default DashboardPage;
