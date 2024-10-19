import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { deletemp, getemp, updateemp } from '../service/allapi';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

function Get() {
  const[gettemp , setgetemp]=useState([])
  const [show, setShow] = useState(false); // For modal visibility
  const [selectedEmployee, setSelectedEmployee] = useState({
    _id: '',
    firstname: '',
    lastname: '',
    age: '',
    qualification: '',
    email: ''
  });

  const handleget=async()=>{
    const res=await getemp()
    console.log(res)
    if (res.status === 200) {
      setgetemp(res.data); 
      handleget()
    } else {
      console.error('Failed to fetch employees');
    }
  }

  const handledel=async(id)=>{
    const res= await deletemp(id)
    if (res.status === 200) {
      toast.success('Employee deleted successfully');
      setgetemp(gettemp.filter(emp => emp._id !== id));
    } else {
      toast.error('Failed to delete employee');
    }
  }

  const handleEdit = (emp) => {
    setSelectedEmployee(emp);
    setShow(true);
  };

  const handleUpdate = async () => {
  
      const { _id, firstname, lastname, age, qualification, email } = selectedEmployee;
      const res = await updateemp(_id, { firstname, lastname, age, qualification, email });
      if (res.status === 200) {
        toast.success('Employee updated successfully');
        setEmployees(gettemp.map(emp => (emp._id === _id ? selectedEmployee : emp))); 
        setShow(false); 
      
      } else {
        toast.error('Failed to update employee');
      }
    }

  useEffect(()=>{
    handleget()

  },[])
  return (
    <>
      <div className=' container-fluid w-100  d-flex justify-content-center align-items-center  border border shadow border-3 p-3 '>


        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Qualification</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {gettemp.length > 0 ? (
              gettemp.map((emp, index) => (
                <tr key={index}>
                  <td>{emp.firstname}</td>
                  <td>{emp.lastname}</td>
                  <td>{emp.age}</td>
                  <td>{emp.qualification}</td>
                  <td>{emp.email}</td>
                  <td>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <i className="fa-solid fa-trash fa-xl"   onClick={() => handledel(emp._id)} style={{ color: "#c90825", marginRight: '10px' }} />
                      <div style={{ borderLeft: '1px solid #000', height: '24px', margin: '0 10px' }}></div>
                      <i className="fa-solid fa-pen fa-xl"   onClick={() => handleEdit(emp)}  style={{ color: "#000000", marginLeft: '10px' }} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No Employees Found</td>
              </tr>
            )}
     
          </tbody>
        </Table>
      </div>

      <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" value={selectedEmployee.firstname} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, firstname: e.target.value })} placeholder='Firstname' className="form-control mb-3" />
          <input type="text" value={selectedEmployee.lastname} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, lastname: e.target.value })} placeholder='Lastname' className="form-control mb-3" />
          <input type="Number" value={selectedEmployee.age} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, age: e.target.value })} placeholder='Age' className="form-control mb-3" />
          <input type="text" value={selectedEmployee.qualification} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, qualification: e.target.value })} placeholder='Qualification' className="form-control mb-3" />
          <input type="email" value={selectedEmployee.email} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })} placeholder='Email' className="form-control mb-3" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleUpdate} >
            Update
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Get