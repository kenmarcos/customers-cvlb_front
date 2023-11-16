import LoginForm from "./components/login-form";

const Home = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full max-w-lg space-y-12">
        <LoginForm />
      </div>
    </div>
  );
};

export default Home;
