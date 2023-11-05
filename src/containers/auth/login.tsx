import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import UserStorage from "../../utils/storage/user";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const submit = () => {
    UserStorage.setIsAuth(true);
    navigate("/dashboard");
  };

  return (
    <Card
      color="transparent"
      shadow={false}
      className="flex items-center justify-center h-screen"
    >
      <Typography variant="h1" color="black">
        Admin Login
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Email Address
          </Typography>
          <Input
            crossOrigin={""}
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            crossOrigin={""}
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Button onClick={submit} className="mt-6" fullWidth>
          sign up
        </Button>
      </form>
    </Card>
  );
};
export default Login;
