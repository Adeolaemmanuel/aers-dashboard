import axios, { CreateAxiosDefaults, AxiosInstance } from "axios";
import { toast } from "react-toastify";
import slugify from "slugify";

export default class Api {
	constructor(config?: CreateAxiosDefaults<any> | undefined) {
		this.api = axios.create({
			baseURL: import.meta.env.VITE_BASE_PATH,
			...config,
		});

		// this.api.interceptors.response.use()
	}
	protected api?: AxiosInstance;

	private static instance: Api;

	static getInstance() {
		if (!this.instance) {
			this.instance = new Api();
		}

		return this.instance;
	}

	async getAllQuestion(
		setLoading?: React.Dispatch<React.SetStateAction<boolean>>
	) {
		setLoading?.(true);
		const res = await this.api?.get<AersRes<Questions[]>>("/questions");
		setLoading?.(false);
		return res?.data.data;
	}

	async getAllStages(
		setLoading?: React.Dispatch<React.SetStateAction<boolean>>
	) {
		setLoading?.(true);
		const res = await this.api?.get<AersRes<Stages[]>>("/system/stages");
		setLoading?.(false);
		return res?.data.data;
	}

	async getAllDesignation(
		setLoading?: React.Dispatch<React.SetStateAction<boolean>>
	) {
		setLoading?.(true);
		const res = await this.api?.get<AersRes<Designation[]>>(
			"/system/designation"
		);
		setLoading?.(false);
		return res?.data.data;
	}

	async getAllUsers(
		setLoading?: React.Dispatch<React.SetStateAction<boolean>>
	) {
		setLoading?.(true);
		const res = await this.api?.get<AersRes<User[]>>("/users");
		setLoading?.(false);
		return res?.data.data;
	}

	async getAllAnswers(
		setLoading?: React.Dispatch<React.SetStateAction<boolean>>
	) {
		setLoading?.(true);
		const res = await this.api?.get<AersRes<[data: Answers[], ind: number]>>(
			"/questions/answers"
		);
		setLoading?.(false);
		return res?.data?.data!;
	}

	async getDashboardStat(
		setLoading?: React.Dispatch<React.SetStateAction<boolean>>
	) {
		setLoading?.(true);
		const res = await this.api?.get<AersRes<SystemStateDto>>("/system/stats");
		setLoading?.(false);
		return res?.data.data;
	}

	async updateQuestion(
		dto: {
			stage_slug: string;
			input_type: string;
			question: string;
			id?: number;
		},
		setLoading?: React.Dispatch<React.SetStateAction<boolean>>
	) {
		try {
			setLoading?.(true);
			const res = await this.api?.patch<AersRes<Questions>>("/questions", dto);
			setLoading?.(false);
			if (res?.data.error) {
				throw new Error(res.data.error);
			}
			toast.success(res?.data.message);
			return res?.data.data;
		} catch (error: any) {
			setLoading?.(false);
			toast.error(error.message);
		}
	}

	async addQuestion(
		dto: {
			stage_slug: string;
			input_type: string;
			question: string;
			id?: number;
		},
		setLoading?: React.Dispatch<React.SetStateAction<boolean>>
	) {
		try {
			if (!dto?.stage_slug) {
				toast.error("Question stage must be set");
				return;
			}

			if (!dto?.input_type) {
				toast.error("Input stage must be set");
				return;
			}

			setLoading?.(true);
			const res = await this.api?.post<AersRes<Questions>>("/questions", dto);
			if (res?.data.error) {
				throw new Error(res.data.error);
			}
			toast.success(res?.data.message);
			setLoading?.(false);
			return res?.data.data;
		} catch (error: any) {
			setLoading?.(false);
			toast.error(error.message);
		}
	}

	async deleteQuestion(
		id: number,
		setLoading?: React.Dispatch<React.SetStateAction<boolean>>
	) {
		try {
			setLoading?.(true);
			const res = await this.api?.delete<AersRes<Questions>>("/questions", {
				data: { id },
			});
			setLoading?.(false);
			if (res?.data.error) {
				throw new Error(res.data.error);
			}
			toast.success(res?.data.message);
			return res?.data.data;
		} catch (error: any) {
			setLoading?.(false);
			toast.error(error.message);
		}
	}

	protected async addStage(
		name: string,
		setLoading?: React.Dispatch<React.SetStateAction<boolean>>
	) {
		try {
			setLoading?.(true);
			const res = await this.api?.post<AersRes<Stages>>("/system/stages/add", {
				name,
			});
			setLoading?.(false);
			if (res?.data.error) {
				throw new Error(res.data.error);
			}
			toast.success(res?.data.message);
			return res?.data.data;
		} catch (error: any) {
			setLoading?.(false);
			toast.error(error.message);
		}
	}

	protected async updateStage(
		dto: { name: string; slug: string },
		setLoading?: React.Dispatch<React.SetStateAction<boolean>>
	) {
		try {
			setLoading?.(true);
			const res = await this.api?.patch<AersRes<Stages>>(
				"/system/stages/update",
				dto
			);
			setLoading?.(false);
			if (res?.data.error) {
				throw new Error(res.data.error);
			}
			toast.success(res?.data.message);
			return res?.data.data;
		} catch (error: any) {
			setLoading?.(false);
			toast.error(error.message);
		}
	}

	protected async deleteStage(
		slug: string,
		setLoading?: React.Dispatch<React.SetStateAction<boolean>>
	) {
		try {
			setLoading?.(true);
			const res = await this.api?.delete<AersRes<Stages>>(
				"/system/stages/remove",
				{
					data: { slug: slugify(slug, { lower: true, trim: true }) },
				}
			);
			setLoading?.(false);
			if (res?.data.error) {
				throw new Error(res.data.error);
			}
			toast.success(res?.data.message);
			return res?.data.data;
		} catch (error: any) {
			setLoading?.(false);
			toast.error(error.message);
		}
	}

	protected async addDesignation(
		name: string,
		setLoading?: React.Dispatch<React.SetStateAction<boolean>>
	) {
		try {
			setLoading?.(true);
			const res = await this.api?.post<AersRes<Designation>>(
				"/system/designation/add",
				{
					name,
				}
			);
			setLoading?.(false);
			if (res?.data.error) {
				throw new Error(res.data.error);
			}
			toast.success(res?.data.message);
			return res?.data.data;
		} catch (error: any) {
			setLoading?.(false);
			toast.error(error.message);
		}
	}

	private async updateDesignation(
		dto: { name: string; slug: string },
		setLoading?: React.Dispatch<React.SetStateAction<boolean>>
	) {
		try {
			setLoading?.(true);
			const res = await this.api?.patch<AersRes<Designation>>(
				"/system/designation/update",
				dto
			);
			setLoading?.(false);
			if (res?.data.error) {
				throw new Error(res.data.error);
			}
			toast.success(res?.data.message);
			return res?.data.data;
		} catch (error: any) {
			setLoading?.(false);
			toast.error(error.message);
		}
	}

	protected async deleteDesignation(
		slug: string,
		setLoading?: React.Dispatch<React.SetStateAction<boolean>>
	) {
		try {
			setLoading?.(true);
			const res = await this.api?.delete<AersRes<Designation>>(
				"/system/designation/remove",
				{
					data: { slug: slugify(slug, { lower: true, trim: true }) },
				}
			);
			setLoading?.(false);
			if (res?.data.error) {
				throw new Error(res.data.error);
			}
			toast.success(res?.data.message);
			return res?.data.data;
		} catch (error: any) {
			setLoading?.(false);
			toast.error(error.message);
		}
	}

	async handleSystem(
		type: ViewType,
		system: System,
		dto: { name: string; slug: string },
		setLoading?: React.Dispatch<React.SetStateAction<boolean>>
	) {
		if (system === "stages") {
			switch (type) {
				case "add":
					return await this.addStage(dto.name, setLoading);

				case "delete":
					return await this.deleteStage(dto.name, setLoading);

				case "update":
					return await this.updateStage(dto, setLoading);
				default:
					break;
			}
		}
		if (system === "designation") {
			switch (type) {
				case "add":
					return await this.addDesignation(dto.name, setLoading);

				case "delete":
					return await this.deleteDesignation(dto.name, setLoading);

				case "update":
					return await this.updateDesignation(dto, setLoading);
				default:
					break;
			}
		}
	}

	async handleRefetchSystem(
		system: System,
		setLoading?: React.Dispatch<React.SetStateAction<boolean>>
	) {
		switch (system) {
			case "designation":
				return await this.getAllDesignation(setLoading);

			case "stages":
				return await this.getAllStages(setLoading);
			default:
				break;
		}
	}
}
