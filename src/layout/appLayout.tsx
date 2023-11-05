import { Typography } from "@material-tailwind/react";
import { useLocation, Link } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { BsQuestionSquareFill } from "react-icons/bs";
import { GrSystem } from "react-icons/gr";
import { HiUsers } from "react-icons/hi";

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const sideBar = [
    {
      name: "Dashboard",
      Icon: BiSolidDashboard,
      link: "/dashboard",
    },
    {
      name: "Users",
      link: "/users",
      Icon: HiUsers,
    },
    {
      name: "Questions",
      link: "/questions",
      Icon: BsQuestionSquareFill,
    },
    {
      name: "System",
      Icon: GrSystem,
      link: "/system",
    },
  ];

  return (
    <div className="w-full h-screen flex flex-row">
      <div className="w-[20%] border-r h-screen">
        {sideBar.map(({ Icon, link, name }, key) => {
          return (
            <Link to={link} key={key}>
              <div
                className={`w-[80%] flex gap-3 mx-auto ${
                  key === 0 ? "mt-24" : "mt-10"
                }`}
              >
                <Icon size={25} />
                <p className="font-medium text-xl">{name}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="w-[80%] h-screen">
        <Typography className="font-bold text-3xl mb-1 w-full border-b p-4">
          {location.pathname.replace("/", "").toUpperCase()}
        </Typography>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
