import { Card, Typography } from "@material-tailwind/react";
import React from "react";
import Api from "../../services/api.service";

const api = Api.getInstance();

const DashBoard: React.FC = () => {
  const [stats, setStats] = React.useState<SystemStateDto>();

  React.useEffect(() => {
    api.getDashboardStat().then((stat) => setStats(stat!));
  }, []);

  return (
    <React.Fragment>
      <div className="flex flex-row justify-between">
        <Card className="border p-5 w-[30%]">
          <Typography variant="h5" color="black" className="font-semibold">
            Total Users
          </Typography>
          <Typography variant="h5" className="font-semibold text-right">
            {stats?.user || ""}
          </Typography>
        </Card>
        <Card className="border p-5 w-[30%]">
          <Typography variant="h5" color="black" className="font-semibold">
            Total Questions
          </Typography>
          <Typography variant="h5" className="font-semibold text-right">
            {stats?.questions || ""}
          </Typography>
        </Card>
        <Card className="border p-5 w-[30%]">
          <Typography variant="h5" color="black" className="font-semibold">
            Total Stages
          </Typography>
          <Typography variant="h5" className="font-semibold text-right">
            {stats?.stages || ""}
          </Typography>
        </Card>
      </div>
    </React.Fragment>
  );
};
export default DashBoard;
