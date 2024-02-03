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
import Api from "../../../services/api.service";

const api = Api.getInstance();

const EditAndUpdate: React.FC<ViewSystemProps> = ({
	open,
	handleClick,
	dto,
	system,
	type,
}) => {
	const [data, setData] = React.useState(dto);
	const [loading, setLoading] = React.useState(false);
	const [deleteLoading, setDeleteLoading] = React.useState(false);

	React.useEffect(() => {
		console.log(dto);

		setData(dto);
	}, [dto]);

	return (
		<React.Fragment>
			<Dialog open={open} handler={handleClick!} className="p-5">
				<DialogHeader className="flex flex-row justify-between">
					<span className="block">Category details</span>
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
								label="Name"
								crossOrigin={""}
								type="text"
								value={data?.name}
								onChange={(e) =>
									setData((state: any) => {
										return { ...state, name: e.target.value };
									})
								}
							/>
						</div>
					</form>
				</DialogBody>
				<DialogFooter className="flex gap-3">
					{dto?.name && (
						<Button
							variant="gradient"
							color="red"
							onClick={async () => {
								const res = await api.handleSystem(
									"delete",
									system,
									data,
									setDeleteLoading
								);
								if (res) {
									const resp = await api.handleRefetchSystem(system);
									handleClick?.(resp);
								}
							}}
						>
							{deleteLoading ? <Spinner /> : <span>Delete</span>}
						</Button>
					)}
					<Button
						variant="gradient"
						color="green"
						onClick={async () => {
							const res = await api.handleSystem(
								type === "add" ? "add" : "update",
								system,
								data,
								setLoading
							);
							if (res) {
								const resp = await api.handleRefetchSystem(system);
								handleClick?.(resp);
							}
						}}
					>
						{loading ? (
							<Spinner />
						) : (
							<span>{type === "edit" ? "Update" : "Submit"}</span>
						)}
					</Button>
				</DialogFooter>
			</Dialog>
		</React.Fragment>
	);
};
export default EditAndUpdate;
