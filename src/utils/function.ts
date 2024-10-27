export const getRoleColor = (role: string) => {
  return role === "employee" ? "blue" : role === "client" ? "lime.7" : "var(--mantine-color-primary-6)";
};