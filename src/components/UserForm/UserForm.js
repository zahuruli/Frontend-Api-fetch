import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const UserForm = ({ addUser, btnText, selectedUser }) => {
    const [user, setUser] = useState({
        name: '',
        desc: '',
        active: ''
    });
    const { name, desc, active } = user;

    useEffect(() => {
        setUser({
            name: selectedUser.name,
            desc: selectedUser.desc,
            active: selectedUser.active
        });
    }, [selectedUser]);

    const handleChange = (e) => {
        const selectedField = e.target.name;
        const selectedValue = e.target.value;
        setUser((prevstate) => {
            return { ...prevstate, [selectedField]: selectedValue };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser(user);
        setUser({
            name: '',
            desc: '',
            active: ''
        });
    };

    return (
        <div className="form-div">
            <form action="" onSubmit={handleSubmit} className="form">
                <div>
                    <label htmlFor="name">Name :</label>
                    <input type="text" name="name" id="name" value={name} required onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="desc">Desc :</label>
                    <input type="text" name="desc" id="desc" value={desc} required onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="active">Active :</label>
                    <input type="text" name="active" id="active" value={active} required onChange={handleChange} />
                </div>
                <button type="submit">{btnText}</button>
            </form>
        </div>
    );
};

UserForm.defaultProps = {
    selectedUser: {
        name: '',
        desc: '',
        active: ''
    }
};
export default UserForm;
