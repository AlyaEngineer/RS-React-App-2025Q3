export type AuthorInfo = {
  name: string;
  title: string;
  bio: string;
  skills: string;
  contributions?: string[];
  education?: {
    instituteName: string;
    certificate?: string;
  }[];
  url: {
    image: string;
    gitHub: string;
    linkedIn: string;
  };
};
