import React from 'react'
 
function User({ details }) {
   return (
       <div className='user-container'>
           <h3>Name: {details.first_name}</h3>
           <h3>LastName:{details.last_name}</h3>
           <h4>Email:{details.email}</h4>
 
       </div>
   )
}
 
export default User
