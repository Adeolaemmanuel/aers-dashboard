import React from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import QuestionOptions from "./questionOptions";
import { AiTwotoneDelete } from "react-icons/ai";

const QuestionCategories: React.FC<QuestionCategoriesProps> = ({
	options: _,
	setQuestion,
}) => {
	const [add, setAdd] = React.useState("");
	const [options, setOptions] = React.useState<{ [x: string]: string[] }>(_);

	return (
		<React.Fragment>
			<div className="mt-3">
				<div className="relative flex w-full mt-3">
					<Input
						label="Category name"
						crossOrigin={""}
						type="text"
						value={add}
						onChange={(e) => {
							setAdd(e.target.value);
						}}
						containerProps={{
							className: "min-w-0",
						}}
					/>
					<Button
						size="sm"
						color={add ? "gray" : "blue-gray"}
						disabled={!add}
						className="!absolute right-1 top-1 rounded"
						onClick={() => {
							if (add) {
								options[add] = [];
								setOptions(options);
								setAdd("");
							}
						}}
					>
						Add
					</Button>
				</div>
			</div>

			{Object.keys(options).map((ops, key) => (
				<div className="mt-5" key={key}>
					<Typography
						placeholder={""}
						variant="h6"
						color="blue-gray"
						className="-mb-3"
					>
						{ops}
					</Typography>
					<div className="flex flex-row gap-5">
						<div className="w-[80%]">
							<QuestionOptions
								options={options[ops]}
								set={(e) => {
									let change = options;
									change[ops] = e;
									setOptions(change);
                                    setQuestion((state: any) => {
                                        return { ...state, options: change };
                                    });
								}}
							/>
						</div>
						<AiTwotoneDelete
							size={25}
							className="cursor-pointer mt-4"
							onClick={() => {
								let change = options;
								delete options[ops];
                                setQuestion(change)
								
							}}
						/>
					</div>
				</div>
			))}
		</React.Fragment>
	);
};

export default QuestionCategories;
