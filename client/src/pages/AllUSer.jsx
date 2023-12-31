import React, { useEffect, useState } from 'react'
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useAlert } from 'react-alert';


const AllUSer = () => {
  const [users, setUsers] = useState([]);
  const alert = useAlert();



    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8080/api/v1/users`);
            setUsers(response.data);
          } catch (err) {
            console.log(err);
          }
        };
    
        fetchUser()
      }, []);

      const deleteUserper = async(id)=>{
       try {
        await axios.delete(`http://localhost:8080/api/v1/user/${id}`);
        alert.success("User Deleted Successfully!")
       } catch (error) {
        alert.error(error)
       }
      }

  return (
    <div className='use'>
      <h1>All User</h1>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">UserName</th>
      <th scope="col" >SavedRecipes</th>
      <th scope="col">Role</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {
    users && users.map((item)=>(
        <tr key={item._id}>
      <td>{item._id}</td>
      <td >{item.username}</td>
      <td>{item.savedRecipes.length}</td>
      <td>{item.role}</td>
      <td><div className="action">
        <Link to={`/admin/user/${item._id}`} > <EditIcon/> </Link>
            <Button
              onClick={()=>deleteUserper(item._id)}
            ><DeleteIcon/></Button>
      </div>
      </td>
    </tr>
    ))
  }
    
  </tbody>
</table>
    </div>
  )
}

export default AllUSer