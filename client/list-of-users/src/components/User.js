import React, { useState } from 'react';
import axios from 'axios';

const initialUser = {
	name: '',
	bio: '',
};

const User = ({ user, deleteUser, updateUsers, users }) => {
	const [userToEdit, setUserToEdit] = useState(initialUser);
	const [editing, setEditing] = useState(false);

	const editUser = (user) => {
		setUserToEdit(user);
		setEditing(true);
	};

	const saveEdit = (e) => {
		e.preventDefault();
		console.log(userToEdit);
		axios
			.put(`http://localhost:5000/api/users/${userToEdit.id}`, userToEdit)
			.then((res) => {
				console.log(res.data.id);
				let update = users.map((user) =>
					user.id === res.data.id ? res.data : user
				);
				setEditing(false);
				updateUsers(update);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			{!editing ? (
				<li>
					<h3>{user.name}</h3>
					<p>{user.bio}</p>
					<button onClick={() => deleteUser(user.id)}>Delete</button>
					<button onClick={() => editUser(user)}>Edit</button>
				</li>
			) : (
				<form onSubmit={saveEdit}>
					<input
						type="text"
						name="name"
						placeholder="User name"
						value={userToEdit.name}
						onChange={(e) => setUserToEdit({ ...userToEdit, name: e.target.value })}
					/>
					<textarea
						type="text"
						name="bio"
						placeholder="User bio"
						value={userToEdit.bio}
						onChange={(e) => setUserToEdit({ ...userToEdit, bio: e.target.value })}
					/>
					<button>Confirm</button>
				</form>
			)}
		</div>
	);
};

export default User;
