import { useAuth } from "../features/auth/hooks/useAuth";
import LoginForm from "../features/auth/ui/loginForm";
import LogoutButton from "../features/auth/ui/logoutButton";
import TodoList from "../features/todo/ui/todoList";

const App = () => {
  const { getCurrentUser } = useAuth();

  if (getCurrentUser.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (getCurrentUser.data) {
    return (
      <div className="flex flex-col space-y-2 px-10">
        <div className=" w-full flex justify-end">
          <LogoutButton />
        </div>
        <TodoList />
      </div>
    );
  }

  return <LoginForm />;
};

export default App;
