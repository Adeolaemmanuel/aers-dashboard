type Base = {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  metadata: any;
};

type User = Base & {
  email: string;
  first_name: string;
  user_id?: string;
  last_name: string;
  is_contactable?: boolean;
  designation?: Designation;
  is_auth: boolean;
  token: string;
  questions: Questions[];
};

type Questions = Base & {
  question: string;
  input_type: string;
  options: any;
  stage?: Stages;
  answer: Answers[];
};

type Answers = Base & {
  user_id: string;
  value: string;
  values: any;
  question: Questions;
};

type Stages = Base & {
  name?: string;
  slug?: string;
  question?: Questions[];
};

type Designation = Base & {
  name: string;
  slug: string;
  User: User[];
};
