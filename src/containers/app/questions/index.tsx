import { Card, Typography, Spinner, Button } from "@material-tailwind/react";
import React from "react";
import Api from "../../../services/api.service";
import EditAndUpdate from "./editAndUpdate";
import { FiMoreHorizontal } from "react-icons/fi";

const TABLE_HEAD = ["S/N", "QUESTION", "INPUT TYPE", "STAGE", ""];

const Questions: React.FC = () => {
  const api = Api.getInstance();
  const [questions, setQuestions] = React.useState<Questions[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [modalQue, setModalQue] = React.useState<{
    stage_slug: string;
    input_type: string;
    question: string;
    id: number;
  }>();

  React.useEffect(() => {
    api.getAllQuestion(setLoading).then((que) => setQuestions(que!));
  }, []);

  return (
    <React.Fragment>
      <div className="flex flex-row mb-3">
        <div className="flex flex-row w-[50%]"></div>
        <div className="flex flex-row-reverse w-[50%]">
          <Button onClick={() => setShowModal(!showModal)}>
            + Add Question
          </Button>
        </div>
      </div>
      <Card className="h-[75vh] w-full overflow-scroll">
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
              {questions.map((_, index) => {
                const { question, input_type, id, stage } = _;
                const isLast = index === questions.length - 1;
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
                        {question}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {input_type}
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
                        {stage?.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <FiMoreHorizontal
                        className="cursor-pointer"
                        onClick={() => {
                          setShowModal(!showModal);
                          setModalQue({
                            input_type: _.input_type,
                            question: _.question,
                            stage_slug: _.stage?.slug!,
                            id: _.id!,
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

      <EditAndUpdate
        open={showModal}
        handleClick={() => setShowModal(!showModal)}
        question={modalQue}
      />
    </React.Fragment>
  );
};

export default Questions;
