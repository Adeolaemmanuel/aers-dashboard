import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Api from "../../../services/api.service";

const api = Api.getInstance();

const EditAndUpdate: React.FC<ViewSystemProps> = ({
  open,
  handleClick,
  dto,
  system,
}) => {
  const { register } = useForm();

  const [data, setData] = React.useState(dto);
  const [loading, setLoading] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  React.useEffect(() => {
    setData(dto);
  }, [dto]);

  return (
    <React.Fragment>
      <Dialog open={open} handler={handleClick!} className="p-5">
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
                placeholder="name"
                label="Name"
                crossOrigin={""}
                type="text"
                {...register("name")}
                value={dto?.name || " "}
                onChange={(e) =>
                  setData((state: any) => {
                    return { ...state, question: e.target.value };
                  })
                }
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="flex gap-3">
          {data?.name && (
            <Button
              variant="gradient"
              color="red"
              onClick={() => {
                api.handleSystem("delete", system, dto, setDeleteLoading);
              }}
            >
              {deleteLoading ? <Spinner /> : <span>Delete</span>}
            </Button>
          )}
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              api.handleSystem("add", system, dto, setLoading);
            }}
          >
            {loading ? (
              <Spinner />
            ) : (
              <span>{data?.name ? "Update" : "Submit"}</span>
            )}
          </Button>
        </DialogFooter>
      </Dialog>
    </React.Fragment>
  );
};
export default EditAndUpdate;
