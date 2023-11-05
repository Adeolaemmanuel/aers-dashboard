import axios, { CreateAxiosDefaults, AxiosInstance } from "axios";

export default class Api {
  constructor(config?: CreateAxiosDefaults<any> | undefined) {
    this.api = axios.create({
      baseURL: "https://aers-server.onrender.com/api/v1",
      // baseURL: "http://localhost:3000/api/v1",
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

  async updateQuestion(
    dto: {
      stage_slug: string;
      input_type: string;
      question: string;
      id: number;
    },
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    setLoading?.(true);
    const res = await this.api?.patch<AersRes<Questions>>("/questions", dto);
    setLoading?.(false);
    return res?.data.data;
  }

  async deleteQuestion(
    id: number,
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    setLoading?.(true);
    const res = await this.api?.delete<AersRes<Questions>>("/questions", {
      data: { id },
    });
    setLoading?.(false);
    return res?.data.data;
  }

  private async addStage(
    name: string,
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    setLoading?.(true);
    const res = await this.api?.delete<AersRes<Stages>>("/system/stages/add", {
      data: { name },
    });
    setLoading?.(false);
    return res?.data.data;
  }

  protected async deleteStage(
    slug: string,
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    setLoading?.(true);
    const res = await this.api?.delete<AersRes<Stages>>(
      "/system/stages/remove",
      {
        data: { slug },
      }
    );
    setLoading?.(false);
    return res?.data.data;
  }

  async handleSystem(
    type: ViewType,
    system: System,
    dto: { name: string },
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    if (system === "stages") {
      if (type == "add") return await this.addStage(dto.name, setLoading);
      if (type == "delete") return await this.deleteStage(dto.name, setLoading);
    }
  }
}
