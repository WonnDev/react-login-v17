import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Homechild = (props) => {
  const { child1, child2 } = props;
  return <>{child1}{child2}</>;
};


const Home = () => {
  //useContext
  const { user } = useContext(UserContext);

  return (
    <>
      { user && user.auth === true
      ? <Homechild child1="Homepage is building..." child2="Please visit Manage Users." />
      : <Homechild child1="Homepage is building..." child2={"Please Login at Setting/ Login."} /> }
    </>
    // <Homechild child1={"Please Login..."} child2="Homepage is building... Please visit Manage Users" />
  )
};

export default Home;
