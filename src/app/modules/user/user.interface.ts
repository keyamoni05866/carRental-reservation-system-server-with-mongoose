export type TUser = {
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  termsConditionAccepted: boolean;
  phone?: string;
  address?: string;
  isBlocked?: boolean;
};
