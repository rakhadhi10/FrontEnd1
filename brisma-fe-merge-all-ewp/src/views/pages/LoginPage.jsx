import LoginForm from "../../component/LoginForm";
import withGuest from "../routes/hoc/withGuest";

export function LoginPage(props) {
  return (
    <div className="flex text-sm">
      <section className="bg-primary-blue bg-opacity-5 px-10 py-10 w-full h-screen space-y-10 sm:w-1/2">
        <div className="flex justify-center pt-16">
          <a href="/" className="font-lato font-bold text-primary-blue text-2xl">
            LOGO
          </a>
        </div>
        <LoginForm />
      </section>
      <div className="hidden bg-white w-full sm:flex sm:justify-center sm:items-center">
        <img src="/business-coach.png" alt="Business Coach" className="w-1/2"/>
      </div>
    </div>
  );
}

export default withGuest(LoginPage);
