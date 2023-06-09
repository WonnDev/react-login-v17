import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from 'react-paginate';


const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
//   const [totalUsers, setTotalUser] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    //call APIs
    // dry
    getUser(2);
  }, []);

  const getUser = async (page) => {
    let res = await fetchAllUser(page); //fetchAS is asynchronous

    // console.log(">> check new res: ", res)

    if (res && res.data) {
        // setTotalUser(res.total)
        setTotalPages(res.total_pages)
        setListUsers(res.data);
    }

  };
  console.log(listUsers);

  //handle of react-paginate
  const handlePageClick = (e) => {
    getUser(+e.selected + 1) // + for convert e to string
    console.log("number of e library: ", e)
  }

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
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
    </>
  );
};

export default TableUsers;
