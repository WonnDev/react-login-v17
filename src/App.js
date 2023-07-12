import "./App.scss";
import Header from "./components/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleRefresh } from "./redux/actions/userAction";
import Toast from "./pages/toast";
import Body from "./pages/body";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem("token")) {
      dispatch(handleRefresh());
    }
  }, []);

  return (
    <>
      <Header />
      <Body />
      <Toast />
    </>
  );
}

export default App;
