import React from 'react';
import User from './User';

function UserList({ users, deleteUser, newUser, updateUsers }) {
	return (
		<ul>
			{users.map((user) => (
				<User
					key={user.id}
					user={user}
					deleteUser={deleteUser}
					newUser={newUser}
					updateUsers={updateUsers}
					users={users}
				/>
			))}
		</ul>
	);
}

export default UserList;
