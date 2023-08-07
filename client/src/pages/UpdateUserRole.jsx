import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom'

const UpdateUserRole = () => {
    const { id } = useParams();
    const [role, setRole] = useState('');
    const alert = useAlert();
    const navigate = useNavigate();

    const [user, setUser] = useState([]);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/v1/user/${id}`);
          setUser(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchUser()
    }, [id])
  



    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const userdata = {
                role,
            }
            await axios.put(`http://localhost:8080/api/v1/user/${id}`,
                userdata
            );
            alert.success("User Role Updated Successfully!");
            navigate('/admin/users')
        } catch (error) {
            alert.error(error)
        }


    }

    return (
        <div>
            <h2 className="header">
                Update User Role
            </h2>
            <div className="updateUser">
                <form action="" onSubmit={handleUpdate}>
                    <label htmlFor="">Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="">Choose Role</option>
                                {user.role === "admin"? (
                                <option value="user">User</option>
                                ):(
                                <option value="admin">Admin</option>
                                )}
                            </select>

                    <button
                        type='submit'
                    >Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUserRole