import { Typography } from "@material-tailwind/react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { BsQuestionSquareFill } from "react-icons/bs";
import { GrSystem } from "react-icons/gr";
import { HiUsers } from "react-icons/hi";
import { SiAnswer } from "react-icons/si";
import { CiLogout } from "react-icons/ci";
import UserStorage from "../utils/storage/user";

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
	const locationS = useLocation();
	const navigate = useNavigate();

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
			name: "Entires",
			link: "/answers",
			Icon: SiAnswer,
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
			<div className="w-[20%] border-r h-screen flex flex-col justify-between">
				<div>
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

				<div
					className={`w-[80%] flex gap-3 mx-auto mb-5 cursor-pointer`}
					onClick={() => {
						UserStorage.ClearStorage();
						navigate("/");
					}}
				>
					<CiLogout size={25} />
					<p className="font-medium text-xl">Logout</p>
				</div>
			</div>
			<div className="w-[80%] h-screen">
				<Typography className="font-bold text-3xl mb-1 w-full border-b p-4">
					{locationS.pathname.replace("/", "").toUpperCase()}
				</Typography>
				<div className="p-5">{children}</div>
			</div>
		</div>
	);
};

export default AppLayout;
