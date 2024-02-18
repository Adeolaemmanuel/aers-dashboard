import { Card, Typography } from "@material-tailwind/react";
import React from "react";
import Api from "../../services/api.service";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {faker} from "@faker-js/faker";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const api = Api.getInstance();

const DashBoard: React.FC = () => {
	const [stats, setStats] = React.useState<SystemStateDto>();

	React.useEffect(() => {
		api.getDashboardStat().then((stat) => setStats(stat!));
	}, []);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "",
			},
		},
	};

	const labels = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
	];

	const data = {
		labels,
		datasets: [
			{
				label: "Dataset 1",
				data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
			{
				label: "Dataset 2",
				data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	};

	return (
		<React.Fragment>
			<div className="flex flex-row justify-between">
				<Card className="border p-5 w-[30%]">
					<Typography variant="h5" color="black" className="font-semibold">
						Total Users
					</Typography>
					<Typography variant="h5" className="font-semibold text-right">
						{stats?.user || ""}
					</Typography>
				</Card>
				<Card className="border p-5 w-[30%]">
					<Typography variant="h5" color="black" className="font-semibold">
						Total Questions
					</Typography>
					<Typography variant="h5" className="font-semibold text-right">
						{stats?.questions || ""}
					</Typography>
				</Card>
				<Card className="border p-5 w-[30%]">
					<Typography variant="h5" color="black" className="font-semibold">
						Total Stages
					</Typography>
					<Typography variant="h5" className="font-semibold text-right">
						{stats?.stages || ""}
					</Typography>
				</Card>
			</div>

			<div className="mt-8">
				<Bar options={options} data={data} />;
			</div>
		</React.Fragment>
	);
};
export default DashBoard;
