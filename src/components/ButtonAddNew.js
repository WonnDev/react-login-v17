

const ButtonAddNew = (props) => {
  
  const {handleShow} = props;

  
  return (
      <div className='my-3 add-new'>
        <span><b>List Users:</b></span>
        <button className='btn btn-success'
          onClick={handleShow}
        ><i className="fa-solid fa-circle-plus"></i> Add new</button>
      </div>
  )
}

export default ButtonAddNew;