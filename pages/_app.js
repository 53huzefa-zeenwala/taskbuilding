import MainLoader from "../components/MainLoader";
import {StateContext} from "../context/StateContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {

  return (
    <StateContext>
      <Component {...pageProps} />
      <MainLoader />
    </StateContext>
  );
}

export default MyApp;
