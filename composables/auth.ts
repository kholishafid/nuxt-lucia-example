import type { User } from "lucia";

export const useUser = () => {
  const user = useState<User | null>("user", () => null);
  return user;
};

export const useLogout = async () => {
  const user = useUser();
  await $fetch("/api/logout", {
    method: "POST",
  });
  user.value = null;
  await navigateTo("/signin");
};
