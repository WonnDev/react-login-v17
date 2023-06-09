

const ButtonAddNew = (props) => {
  
  const {handleShow} = props;

  
  return (
      <div className='my-3 add-new'>
        <span><b>List Button:</b></span>
        <button className='btn btn-success'
          onClick={handleShow}
        >Add new user</button>
      </div>
  )
}

export default ButtonAddNew;