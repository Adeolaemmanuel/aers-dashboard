import { Card, Typography, Spinner } from "@material-tailwind/react";
import React from "react";
import Api from "../../../services/api.service";

const TABLE_HEAD = ["S/N", "NAME", "EMAIL", "QUESTIONS", "ANSWERS"];

const api = Api.getInstance();

const Answers: React.FC = () => {
  const [answers, setAnswers] = React.useState<Answers[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    api.getAllAnswers(setLoading).then(([answers]) => setAnswers(answers));
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
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 break-all"
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
              {answers?.map(({ user, id, question, value, values }, index) => {
                const isLast = index === answers?.length! - 1;
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
                        {user?.last_name + " " + user?.first_name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user?.email}
                      </Typography>
                    </td>
                    <td className={classes} style={{ maxWidth: "300px" }}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal break-all"
                      >
                        {question?.question}
                      </Typography>
                    </td>
                    <td className={classes} style={{ maxWidth: "300px" }}>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {value ||
                          [...values].map((v) => {
                            return v;
                          })}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>
    </React.Fragment>
  );
};

export default Answers;
