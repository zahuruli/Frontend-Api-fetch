import React, { useEffect, useState } from 'react';
import UserForm from '../components/UserForm/UserForm';

const url = 'http://127.0.0.1:3000/user';

const Api = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null);

    //update state:
    const [selectedUser, setSelectedUser] = useState({
        name: '',
        desc: '',
        active: ''
    });
    const [updateFlag, setUpdateFlag] = useState(false);
    const [selectedId, setSelectedId] = useState('');

    const getAllusers = () => {
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw Error('could not fetch data');
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                setUsers(data);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const DeleteUsers = (id) => {
        fetch(url + `/${id}`, {
            method: 'DELETE'
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error('could not delete data');
                }
                getAllusers();
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    useEffect(() => {
        getAllusers();
    }, []);

    const handleDelete = (id) => {
        DeleteUsers(id);
    };

    const addUser = (user) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((res) => {
                if (res.ok) {
                    getAllusers();
                } else {
                    throw Error('Could not post user');
                }
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const handleEdit = (id) => {
        const filteredData = users.filter((user) => user.id === id);
        setSelectedUser({
            name: filteredData[0].name,
            desc: filteredData[0].desc,
            active: filteredData[0].active
        });
        setSelectedId(id);
        setUpdateFlag(true);
    };

    const handleUpdate = (user) => {
        fetch(url + `/${selectedId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((res) => {
                if (res.ok) {
                    getAllusers();
                    setUpdateFlag(false);
                } else {
                    throw Error('Could not update user');
                }
            })
            .catch((err) => {
                setError(err.message);
            });
    };
    return (
        <div className="Api-div">
            {isLoading && <h2>Data is Loading...</h2>}
            {error && <h2>{error}</h2>}

            {updateFlag ? <UserForm selectedUser={selectedUser} btnText="Update user" addUser={handleUpdate} /> : <UserForm addUser={addUser} btnText="Add user" />}
            <section>
                {users &&
                    users.map((user) => {
                        const { id, name, desc, active } = user;
                        return (
                            <article key={id}>
                                <h2>Name:{name}</h2>
                                <h3>Desc: {desc}</h3>
                                <h3>Active: {active}</h3>
                                <div>
                                    <button
                                        onClick={() => {
                                            handleDelete(id);
                                        }}>
                                        Delete
                                    </button>
                                    <button onClick={() => handleEdit(id)}>Edit</button>
                                </div>
                            </article>
                        );
                    })}
            </section>
        </div>
    );
};

export default Api;
