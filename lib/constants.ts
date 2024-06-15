interface NavItem {
  label: string;
  page: string;
}

export const ROOT_ROUTE = "/";
export const ROLL_CALL_ROUTE = "/rollcall";
export const LECTURE_ROUTE = "/lecture";
export const LAB_ROUTE = "/lab";
export const SESSION_COOKIE_NAME = "user_session";
export const items: Array<NavItem> = [
  {
    label: "Điểm danh",
    page: "/rollcall",
  },
  {
    label: "Bài giảng",
    page: "/lecture",
  },
  {
    label: "Thực hành",
    page: "/lab",
  },
];
