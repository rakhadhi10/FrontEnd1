import { Navigate, useLocation } from "react-router-dom";

const withAddendum = (WrappedComponent) => {
  const Addendum = ({ status, ...rest }) => {
    const { pathname } = useLocation()
    const { status_pat } = status
    const onAdendum = status_pat === "On Adendum"

    return onAdendum ?
      <WrappedComponent {...rest} status={status} /> :
      <Navigate
        to={pathname.split("/").filter(p => p !== "addendum").join("/")}
      />
  };
  return Addendum
}

export default withAddendum;
