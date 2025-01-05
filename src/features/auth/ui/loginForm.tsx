import { authSelectors } from "../../../entities/auth/model/store/authSlice";
import { useActions } from "../../../shared/hooks/useActions";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";

const LoginForm = () => {
  const { login } = useActions();
  const loginError = useAppSelector(authSelectors.loginError);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("login")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    login({
      email,
      password,
    });
  };
  return (
    <div className="p-5 border border-slate-500 rounded-lg container mx-auto mt-10">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <h1 className="text-bold text-xl">Login</h1>
        <input
          className="p-5 rounded border border-slate-500"
          name="login"
        ></input>
        <input
          className="p-5 rounded border border-slate-500"
          name="password"
        ></input>
        {loginError && (
          <span className="text-red-500 text-sm">{loginError}</span>
        )}
        <button className="p-5 rounded bg-teal-500 text-white disabled:bg-slate-300">
          Вход
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
