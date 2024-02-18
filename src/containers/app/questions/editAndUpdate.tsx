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
import QuestionOptions from "./components/questionOptions";
import QuestionCategories from "./components/questionsCategories";

const api = Api.getInstance();

const EditAndUpdate: React.FC<ViewQuestionProps> = ({
	open,
	handleClick,
	question: que,
}) => {
	const { register } = useForm();

	const [question, setQuestion] = React.useState(que);
	const [options, setOptions] = React.useState<string[]>([]);
	const [categories, setCategories] = React.useState<{
		[x: string]: string[];
	}>({});
	const [stages, setStages] = React.useState<{ name: string; slug: string }[]>(
		[]
	);
	const [loading, setLoading] = React.useState(false);
	const [deleteLoading, setDeleteLoading] = React.useState(false);

	React.useEffect(() => {
		setQuestion(que);
		setOptions(que?.options || []);
		setCategories(que?.options || {});
		api.getAllStages().then((res) => {
			let _ = res?.map((r) => {
				return {
					slug: r.slug!,
					name: r.name!,
				};
			});
			setStages(_!);
		});
	}, [que]);

	const showOptions =
		question?.input_type === "multi-select" ||
		question?.input_type === "select" ||
		question?.input_type === "check";

	const showCategory = question?.input_type === "category";

	return (
		<React.Fragment>
			<Dialog
				open={open}
				handler={() => handleClick(false)}
				className={`p-5 ${question?.options ? "h-[80vh] overflow-scroll" : ""}`}
			>
				<DialogHeader className="flex flex-row justify-between">
					<span className="block">Question details</span>
					<Button
						variant="text"
						color="red"
						onClick={() => handleClick(false)}
						className="mr-1 block"
					>
						<span>Close</span>
					</Button>
				</DialogHeader>
				<DialogBody>
					<form>
						<div className="mt-3">
							<Input
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
								label="Stages"
								value={question?.stage_slug || " "}
								onChange={(e) =>
									setQuestion((state: any) => {
										return { ...state, stage_slug: e };
									})
								}
							>
								{stages.map((r, key) => {
									return (
										<Option value={r.slug} key={key}>
											{r.name}
										</Option>
									);
								})}
							</Select>
						</div>
						<div className="pt-3">
							<Select
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
								<Option value="category">Categories</Option>
							</Select>
						</div>

						{showOptions && (
							<QuestionOptions setQuestion={setQuestion} options={options} />
						)}

						{showCategory && (
							<QuestionCategories
								options={categories}
								setQuestion={setQuestion}
							/>
						)}
					</form>
				</DialogBody>
				<DialogFooter className="flex gap-3">
					{que?.question && (
						<Button
							variant="gradient"
							color="red"
							onClick={async () => {
								if (que?.question) {
									const data = await api.deleteQuestion(
										question?.id!,
										setDeleteLoading
									);
									if (data) {
										const ques = await api.getAllQuestion();
										handleClick(ques);
									}
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
							if (que?.question) {
								const data = await api.updateQuestion(question!, setLoading);
								if (data) {
									const ques = await api.getAllQuestion();
									handleClick(ques);
								}
							} else {
								const data = await api.addQuestion(question!, setLoading);
								if (data) {
									const ques = await api.getAllQuestion();
									handleClick(ques);
								}
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
