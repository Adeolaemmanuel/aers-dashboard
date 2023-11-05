import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Select,
  Option,
  Spinner,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Api from "../../../services/api.service";

const api = Api.getInstance();

const EditAndUpdate: React.FC<ViewQuestionProps> = ({
  open,
  handleClick,
  question: que,
}) => {
  const { register } = useForm();

  const [question, setQuestion] = React.useState(que);
  const [loading, setLoading] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  React.useEffect(() => {
    setQuestion(que);
  }, [que]);

  return (
    <React.Fragment>
      <Dialog open={open} handler={handleClick} className="p-5">
        <DialogHeader className="flex flex-row justify-between">
          <span className="block">Question details</span>
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
          <form>
            <div className="mt-3">
              <Input
                placeholder="Question"
                label="Questions"
                crossOrigin={""}
                type="text"
                {...register("question")}
                value={question?.question || " "}
                onChange={(e) =>
                  setQuestion((state: any) => {
                    return { ...state, question: e.target.value };
                  })
                }
              />
            </div>
            <div className="mt-3">
              <Select
                placeholder="Stages"
                label="Stages"
                value={question?.stage_slug || " "}
                onChange={(e) =>
                  setQuestion((state: any) => {
                    return { ...state, stage_slug: e };
                  })
                }
              >
                <Option value="incident">Incident</Option>
                <Option value="contributory_factor_cause">
                  Contributory Factors/Cause
                </Option>
                <Option value="triggers">Triggers</Option>
                <Option value="follow_up">Follow Up</Option>
                <Option value="patient">Patient</Option>
                <Option value="reporter">Reporter</Option>
              </Select>
            </div>
            <div className="pt-3">
              <Select
                placeholder="Input Type"
                label="Input Type"
                value={question?.input_type || " "}
                onChange={(e) =>
                  setQuestion((state: any) => {
                    return { ...state, input_type: e };
                  })
                }
              >
                <Option value="time">Time</Option>
                <Option value="select">Select</Option>
                <Option value="textarea">Textarea</Option>
                <Option value="check">Check</Option>
                <Option value="multi-select">Multi Select</Option>
                <Option value="date">Date</Option>
                <Option value="image">Image</Option>
              </Select>
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="flex gap-3">
          {que?.question && (
            <Button
              variant="gradient"
              color="red"
              onClick={() => {
                if (que?.question) {
                  api.deleteQuestion(question?.id!, setDeleteLoading);
                }
              }}
            >
              {deleteLoading ? <Spinner /> : <span>Delete</span>}
            </Button>
          )}
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              if (que?.question) {
                api.updateQuestion(question!, setLoading);
              }
            }}
          >
            {loading ? (
              <Spinner />
            ) : (
              <span>{que?.question ? "Update" : "Submit"}</span>
            )}
          </Button>
        </DialogFooter>
      </Dialog>
    </React.Fragment>
  );
};
export default EditAndUpdate;
