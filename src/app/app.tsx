import { useAuth } from "../features/auth/hooks/useAuth";
import LoginForm from "../features/auth/ui/loginForm";
import TodoList from "../features/todo/ui/todoList";

const App = () => {
  const { getCurrentUser } = useAuth();

  if (getCurrentUser.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (getCurrentUser.data) {
    return <TodoList />;
  }

  return <LoginForm />;
};

export default App;
