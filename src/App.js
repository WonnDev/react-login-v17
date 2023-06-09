import "./App.scss";
import ButtonAddNew from "./components/ButtonAddNew";
import Header from "./components/Header";
import TableUsers from "./components/TableUser";
import Container from "react-bootstrap/Container";
import ModalAddNew from "./components/ModelAddNew";
import { useState } from "react";

function App() {
  const [showModalAddNew, setShowModalAddNew] = useState(false);

  const handleClose = () => {
    setShowModalAddNew(false);
  };

  return (
    <div className="app-container">
      <Header />
      <Container>
        <ButtonAddNew handleShow={() => setShowModalAddNew(true)} />

        <TableUsers />
      </Container>

      <ModalAddNew show={showModalAddNew} handleClose={handleClose} />
    </div>
  );
}

export default App;
