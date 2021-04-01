import React from 'react'

import '../index.scss';

const UsersList = ({usersList}) => {
  return (
        <>
           {
            usersList && usersList.map((user) => {
                return <div className="flex listChild">
                    <div>{user.first_name} {user.last_name}</div>
                    <img alt="not found" src={user.avatar} />
                </div>
             })
             }
        </>
    )
}

export default UsersList;