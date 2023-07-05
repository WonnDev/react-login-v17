import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ButtonAddNew from "./ButtonAddNew";
import ModalEdit from "./ModalEdit";
import _, { debounce } from "lodash";
import ModalConfirm from "./ModalComfirm";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";
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

  //input search
  const [inputSearch, setInputSearch] = useState("");

  //export CSV
  const [dataExport, setDataExport] = useState([]);

  //handle
  const handleClose = () => {
    setShowModalAddNew(false);
    setShowModalEdit(false);
    setShowModalDelete(false);
  };

  const handleUpdateTable = (user) => {
    setListUsers([user,...listUsers])
  };

  const handleEditUserFromModal = (user) => {
    // let cloneListUsers = [...listUsers]; // same index memory save => change 1 -> 2 changed too
    let cloneListUsers = _.cloneDeep(listUsers); // cloneDeep has clone and changed index memory save state
    let index = listUsers.findIndex(item => item.id === user.id); //find id in list === id user to handleChange
    cloneListUsers[index].first_name = user.first_name;

    setListUsers(cloneListUsers);
  };

  useEffect(() => {
    //call APIs
    // dry
    getUser(1);
  }, []);

  const getUser = async (page) => {
    let res = await fetchAllUser(page); //asynchronous

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
  };

  const handleDelete = (user) => {
    setShowModalDelete(true);
    setDataUserDelete(user);
  };

  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);
    setListUsers(cloneListUsers);
  };
  //sort
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]); // orderBy from lodash (excellent *)
    // console.log("check after sort: ",cloneListUsers);
    setListUsers(cloneListUsers);
  };

  const handleSearch = debounce((event) => {
    let term = event.target.value;
    // setInputSearch(term)
    if(term) {
      //this call API too much without func Debounce outside 
      //this function just filter on filtered list
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter(item => item.email.includes(term)) //TODO: here is includes of string not array
      setListUsers(cloneListUsers);
    } else {
      getUser(1);
    }
  }, 300); //300ms
  //this handle have bug is we are doing on a UI with Fake API, so when del keyword (!= "") of Search then term ""
  // inreal API, willbe fix

  //handle custom getUserExport
  const getUserExport = (event, done) => { //function done run
    let result = [];
    if(listUsers && listUsers.length > 0){ //build table data
      result.push(["Id", "Email", "First name", "Last name"]); //create header
      listUsers.map((item, index) => { //build body
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      })
      setDataExport(result);
      done();
    }
  }

  const handleImportCSV = (event) => {
    if(event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0]; //only 1 file so chosse index 0

      if(file.type !== "text/csv") {
        toast.error("Only accept CSV file...")
        return;
      }
      //Parse local CSV File
      Papa.parse(file, {
        header: true,
        complete: function (results) {
    //       // custom require
          // let rawCSV = results.data;
          // if(rawCSV.length > 0){
          //   if(rawCSV[0] && rawCSV[0].length === 3){
          //     if(rawCSV[0][0] !== "firstname"
          //     ||rawCSV[0][1] !== "lastname"
          //     ||rawCSV[0][2] !== "email"
          //     ) {
          //       toast.error("Wrong format Header on CSV file!");
          //     } else {
          //       let result = [];

          //       rawCSV.map((item, index)=> {
          //         if(index > 0 && item.length === 3){ //raw1 >0
          //           let obj = [];
          //           obj.email = item[0]
          //           obj.first_name = item[1]
          //           obj.last_name = item[2]
          //           result.push(obj);
          //          } 
          //       })
          //       setListUsers(result)
          //     }
          //   } else {
          //     toast.error("Wrong format data on CSV file!");
          //   }
          // } else {
          // toast.error("Wrong format data on CSV file!");
          // }

          let rawCSV = results.data;
          if(rawCSV.length > 0){
            let result = [];
            rawCSV.map((item, index)=> {
              if(index > 0){
                let obj = [];
                obj.email = item[0]
                obj.firstname = item[1]
                obj.lastname = item[2]
                result.push(obj);
                }
            })
            toast.success("Import CSV success!");
            setListUsers(result)
          }

          console.log("Finish:",results.data);
        }
      })
    }
    
  }

  return (
    <>
      <ButtonAddNew handleShow={() => setShowModalAddNew(true)} />
      <div>
        <label className="btn btn-warning mx-2" htmlFor="test">
          <i className="fa-solid fa-file-arrow-up"></i> Import</label>

        <input
          id="test" type="file" hidden
          onChange={(event) => {handleImportCSV(event)}}
        />

        <CSVLink
          filename={"users.csv"}
          className={"btn btn-primary my-3"}
          data={dataExport}
          asyncOnClick={true} //waiting for onClick run first then get data from dataExport
          onClick={getUserExport}
        ><i className="fa-solid fa-file-arrow-down"></i> Export</CSVLink>
        {/* <CSVDownload data={csvData} target="_blank"/> */}
      </div>
      <div className="col-12 col-sm-4 mb-3">
        <input
        className="form-control"
        placeholder="Search user by email..."
        // value={inputSearch}
        onChange={(event) => handleSearch(event)}
        />
      </div>
      <div className="customize-table">
        <Table striped bordered hover>
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
                      <button className="btn btn-warning mx-sm-3"
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
      </div>
      
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
