type LayoutProps = {
  children?: React.ReactNode;
};

type System = "designation" | "stages";
type ViewType = "delete" | "add";

type ViewUserProps = {
  open: boolean;
  handleClick: (data: any) => void;
  users?: User;
};

type ViewQuestionProps = {
  open: boolean;
  handleClick: (data: any) => void;
  question?: {
    stage_slug: string;
    input_type: string;
    question: string;
    id: number;
  };
};

type ViewSystemProps = {
  open: boolean;
  handleClick?: (data: any) => void;
  dto: { name: string };
  system: System;
};
