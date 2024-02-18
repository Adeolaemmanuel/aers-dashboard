import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { AiTwotoneDelete } from "react-icons/ai";

const QuestionOptions: React.FC<QuestionOptionsProps> = ({
	setQuestion,
	options: ops,
	set,
}) => {
	const [add, setAdd] = React.useState("");
	const [options, setOptions] = React.useState<string[]>(ops);

	return (
		<React.Fragment>
			<div className="mt-3">
				<div className="relative flex w-full">
					<Input
						label="Add options"
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
								let ops = [...options];
								ops.push(add);
								setOptions(ops);
								set?.(ops);
								setQuestion?.((state: any) => {
									return { ...state, options: ops };
								});
								setAdd("");
							}
						}}
					>
						Add
					</Button>
				</div>
			</div>

			<React.Fragment>
				<span className="mt-4 block">Options:</span>
				<div className="pt-3 flex flex-col gap-y-2">
					{options?.map((data, ind) => {
						return (
							<div className="flex flex-row justify-between" key={ind}>
								<div className="relative flex w-full max-w-[24rem]">
									<Input
										crossOrigin={""}
										type="text"
										defaultValue={data}
										onChange={(e) => {
											let change = [...options];
											change[ind] = e.target.value;
											set?.(ops);
											setQuestion?.((state: any) => {
												return { ...state, options: change };
											});
										}}
										containerProps={{
											className: "min-w-0",
										}}
									/>
								</div>

								<AiTwotoneDelete
									size={25}
									className="cursor-pointer"
									onClick={() => {
										let change = [...options];
										change.splice(ind, ind + 1);
										setOptions(change);
										set?.(ops);
										setQuestion?.((state: any) => {
											return { ...state, options: change };
										});
									}}
								/>
							</div>
						);
					})}
				</div>
			</React.Fragment>
		</React.Fragment>
	);
};

export default QuestionOptions;
