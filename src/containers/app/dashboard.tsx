import { Card, Input, Button, Typography } from "@material-tailwind/react";
import React from "react";

const DashBoard: React.FC = () => {
  return (
    <React.Fragment>
      <div className="flex flex-row justify-between">
        <Card className="border p-5 w-[30%]">
          <Typography variant="h5" color="black" className="font-semibold">
            Total Users
          </Typography>
          <Typography variant="h5" className="font-semibold text-right">
            20
          </Typography>
        </Card>
        <Card className="border p-5 w-[30%]">
          <Typography variant="h5" color="black" className="font-semibold">
            Total Questions
          </Typography>
          <Typography variant="h5" className="font-semibold text-right">
            20
          </Typography>
        </Card>
        <Card className="border p-5 w-[30%]">
          <Typography variant="h5" color="black" className="font-semibold">
            Total Stages
          </Typography>
          <Typography variant="h5" className="font-semibold text-right">
            20
          </Typography>
        </Card>
      </div>
    </React.Fragment>
  );
};
export default DashBoard;
