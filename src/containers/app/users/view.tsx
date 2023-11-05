import React from "react";
import {
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
} from "@material-tailwind/react";

const ViewUsers: React.FC<ViewUserProps> = ({ open, handleClick, users }) => {
  const userDetailsArray = Object?.keys(users || {})?.map((key, ind) => {
    return (
      <div className="flex flex-row justify-between w-[90%] mx-auto" key={ind}>
        {key !== "questions" &&
          key !== "designation" &&
          key !== "metadata" &&
          key !== "is_contactable" && (
            <React.Fragment>
              <Typography
                variant="h6"
                className={`${ind < 0 ? "" : "pt-3"} block`}
              >
                {key.toLocaleUpperCase()}
              </Typography>
              <Typography className={`${ind < 0 ? "" : "pt-3"} block`}>
                {users?.[key as keyof User]}
              </Typography>
            </React.Fragment>
          )}
        {key === "designation" && (
          <React.Fragment>
            <Typography
              variant="h6"
              className={`${ind < 0 ? "" : "pt-3"} block`}
            >
              {key.toLocaleUpperCase()}
            </Typography>
            <Typography className={`${ind < 0 ? "" : "pt-3"} block`}>
              {users?.designation?.name}
            </Typography>
          </React.Fragment>
        )}
        {key === "questions" && (
          <React.Fragment>
            <Typography
              variant="h6"
              className={`${ind < 0 ? "" : "pt-3"} block`}
            >
              {key.toLocaleUpperCase()} LENGTH
            </Typography>
            <Typography className={`${ind < 0 ? "" : "pt-3"} block`}>
              {users?.questions.length}
            </Typography>
          </React.Fragment>
        )}
        {key === "is_contactable" && (
          <React.Fragment>
            <Typography
              variant="h6"
              className={`${ind < 0 ? "" : "pt-3"} block`}
            >
              {key.toLocaleUpperCase()}
            </Typography>
            <Typography className={`${ind < 0 ? "" : "pt-3"} block`}>
              {`${users?.[key as keyof User]}`}
            </Typography>
          </React.Fragment>
        )}
      </div>
    );
  });

  return (
    <React.Fragment>
      <Dialog open={open} handler={handleClick}>
        <DialogHeader className="flex flex-row justify-between">
          <span className="block">User details</span>
          <Button
            variant="text"
            color="red"
            onClick={handleClick}
            className="mr-1 block"
          >
            <span>Close</span>
          </Button>
        </DialogHeader>
        <DialogBody>
          {userDetailsArray.map((Details) => {
            return Details;
          })}
        </DialogBody>
      </Dialog>
    </React.Fragment>
  );
};
export default ViewUsers;
