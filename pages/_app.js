import { Alert, HeadComponent, MainLoader } from "../components";
import { StateContext } from "../context/StateContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <HeadComponent />
      <Component {...pageProps} />
      <MainLoader />
      <Alert />
    </StateContext>
  );
}

export default MyApp;
