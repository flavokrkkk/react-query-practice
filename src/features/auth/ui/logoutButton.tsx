import { useActions } from "../../../shared/hooks/useActions";

const LogoutButton = () => {
  const { logout } = useActions();

  const handleLogout = () => logout();
  return (
    <button
      className="border border-rose-500 p-3 rounded"
      onClick={handleLogout}
    >
      Выход
    </button>
  );
};

export default LogoutButton;
