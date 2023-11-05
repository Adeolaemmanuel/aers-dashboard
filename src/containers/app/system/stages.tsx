import { Card, Typography, Spinner, Button } from "@material-tailwind/react";
import React from "react";
import Api from "../../../services/api.service";
import { FiMoreHorizontal } from "react-icons/fi";

const TABLE_HEAD = ["S/N", "NAME", "SLUG", "TOTAL QUESTION", ""];

const Stages: React.FC<Partial<ViewSystemProps>> = ({
  handleClick,
  refetchData,
}) => {
  const api = Api.getInstance();
  const [stages, setStages] = React.useState<Stages[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    api.getAllStages(setLoading).then((stages) => setStages(stages!));
  }, [refetchData]);

  return (
    <React.Fragment>
      <div className="flex flex-row mb-3">
        <div className="flex flex-row w-[50%]"></div>
        <div className="flex flex-row-reverse w-[50%]">
          <Button onClick={() => handleClick?.(true)}>+ Add Stage</Button>
        </div>
      </div>
      <Card className="h-[65vh] w-full overflow-scroll">
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
              {stages.map(({ question, name, slug, id }, index) => {
                const isLast = index === stages?.length! - 1;
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
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {slug}
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
                        {question?.length!}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <FiMoreHorizontal
                        className="cursor-pointer"
                        onClick={() => {
                          handleClick?.({
                            name,
                            slug,
                            system: "designation",
                            show: true,
                          });
                        }}
                      />
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

export default Stages;
