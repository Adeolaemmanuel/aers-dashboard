import { Card, Typography, Spinner, Button } from "@material-tailwind/react";
import React from "react";
import Api from "../../../services/api.service";
// import ViewUsers from "./view";

const TABLE_HEAD = ["S/N", "NAME", "EMAIL", "question", "answers", ""];

const Users: React.FC = () => {
  const api = Api.getInstance();
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [viewMore, setViewMore] = React.useState(false);
  const [userIndex, setUserIndex] = React.useState(0);

  React.useEffect(() => {
    api.getAllUsers(setLoading).then((users) => setUsers(users!));
  }, []);

  return (
    <React.Fragment>
      <Card className="h-[80vh] w-full overflow-scroll">
        {loading ? (
          <Spinner className="block mx-auto mt-32 h-12 w-12" />
        ) : (
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users?.map(
                (
                  { email, first_name, last_name, id, designation, questions },
                  index
                ) => {
                  const isLast = index === users?.length! - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {id}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {last_name + " " + first_name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {designation?.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {questions?.length!}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Button
                          onClick={() => {
                            setViewMore(!viewMore);
                            setUserIndex(index);
                          }}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        )}
      </Card>

      {/* <ViewUsers
        open={viewMore}
        handleClick={() => setViewMore(!viewMore)}
        users={users[userIndex]}
      /> */}
    </React.Fragment>
  );
};

export default Users;
