import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ButtonAddNew from "./ButtonAddNew";
import ModalEdit from "./ModalEdit";
import _ from "lodash";
import ModalConfirm from "./ModalComfirm";
import "./TableUser.scss";


const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUser] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [showModalAddNew, setShowModalAddNew] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});

  //sort
  const [sortBy, setSortBy] = useState("asc"); // sort by ASC|DESC
  const [sortField, setSortField] = useState("id");

  const handleClose = () => {
    setShowModalAddNew(false);
    setShowModalEdit(false);
    setShowModalDelete(false);
  };

  const handleUpdateTable = (user) => {
    setListUsers([user,...listUsers])
  }

  const handleEditUserFromModal = (user) => {
    // let cloneListUsers = [...listUsers]; // same index memory save => change 1 -> 2 changed too
    let cloneListUsers = _.cloneDeep(listUsers); // cloneDeep has clone and changed index memory save state
    let index = listUsers.findIndex(item => item.id === user.id); //find id in list === id user to handleChange
    cloneListUsers[index].first_name = user.first_name;

    setListUsers(cloneListUsers);
  }

  useEffect(() => {
    //call APIs
    // dry
    getUser(1);
  }, []);

  const getUser = async (page) => {
    let res = await fetchAllUser(page); //fetchAS is asynchronous

    // console.log(">> check new res: ", res)

    if (res && res.data) {
      setTotalUser(res.total)
      setTotalPages(res.total_pages);
      setListUsers(res.data);
    }
  };

  //handle of react-paginate
  const handlePageClick = (e) => {
    getUser(+e.selected + 1); // + for convert e to string
    console.log("number of e library: ", e);
  };

  const handleEdit = (user) => {
    setDataUserEdit(user);
    setShowModalEdit(true);
  }

  const handleDelete = (user) => {
    setShowModalDelete(true);
    setDataUserDelete(user);
  }

  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);
    setListUsers(cloneListUsers);
  }
  //sort
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]); // orderBy from lodash (excellent *)
    console.log("check after sort: ",cloneListUsers);
    setListUsers(cloneListUsers);
  }

  return (
    <>
    <ButtonAddNew handleShow={() => setShowModalAddNew(true)} />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>ID</span>
                <span>
                  <i
                  className="fa-solid fa-arrow-up"
                  onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i
                  className="fa-solid fa-arrow-down"
                  onClick={() => handleSort("asc", "id")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="sort-header">
                <span>First Name</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-up"
                    onClick={() => handleSort("desc", "first_name")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-down"
                    onClick={() => handleSort("asc", "first_name")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button className="btn btn-warning mx-3"
                        onClick={() => handleEdit(item)}
                    >Edit</button>
                    <button className="btn btn-danger"
                        onClick={() => handleDelete(item)}
                    >Del</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={showModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEdit
        show={showModalEdit}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
        handleEditUserFromModal={handleEditUserFromModal}
      />
      <ModalConfirm
        show={showModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}

      />
    </>
  );
};

export default TableUsers;
