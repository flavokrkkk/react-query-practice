import TodoList from "../features/todo/ui/todoList";
import Providers from "./providers/providers";

const App = () => (
  <Providers>
    <TodoList />
  </Providers>
);

export default App;
