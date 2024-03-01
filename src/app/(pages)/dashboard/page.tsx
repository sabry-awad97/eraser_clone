import FilesTable from './_components/FilesTable';
import Header from './_components/Header';

const Dashboard = () => {
  return (
    <div className="p-8">
      <Header />
      <FilesTable />
    </div>
  );
};

export default Dashboard;
