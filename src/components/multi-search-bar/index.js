import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import Pill from './components/Pill';

const MultiSearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState({});
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchUsers = () => {
            if (searchTerm.trim() === "") {
                setSuggestions([]);
                return;
            }
            fetch(`http://dummyjson.com/users/search?q=${searchTerm}`)
                .then((res) => res.json())
                .then((res) => setSuggestions(res))
                .catch((err) => console.error(err));
        };
        fetchUsers();
    }, [searchTerm]);

    const handleSelectUsers = (user) => {
        setSelectedUsers((prev) => ([...prev, user]));
        setSelectedUserIds((prev) => ({ ...prev, [user.id]: 1 }));
        setSearchTerm("");
        setSuggestions([]);
        inputRef.current.focus();
    };

    const handleRemoveUser = (user) => {
        setSelectedUsers((prev) => prev?.filter((item) => item.id !== user.id));
        setSelectedUserIds((prev) => {
            const newSelectedUserIds = { ...prev };
            delete newSelectedUserIds[user.id];
            return newSelectedUserIds;
        });
        inputRef.current.focus();
    };

    const handleKeyDown = (event) => {
        if (event.key === "Backspace" && event.target.value === "" && selectedUsers.length > 0) {
            const lastUser = selectedUsers[selectedUsers.length - 1];
            handleRemoveUser(lastUser);
        }
    };

    return (
        <div className={styles.user_search_container}>
            <div className={styles.user_search_input}>
                {selectedUsers.map((user) => {
                    return (
                        <Pill
                            key={user.id}
                            image={user.image}
                            text={`${user.firstName} ${user.lastName}`}
                            onClick={() => handleRemoveUser(user)}
                        />
                    );
                })}
                {/* Input */}
                <div>
                    <input
                        type='text'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Search for a user'
                        ref={inputRef}
                        onKeyDown={handleKeyDown}
                    />
                    <ul className={styles.suggestions_list}>
                        {suggestions?.users?.map((user, index) => {
                            if (selectedUserIds[user.id] === undefined || selectedUserIds[user.id] === 0) {
                                return (
                                    <li key={user.email} onClick={() => handleSelectUsers(user)}>
                                        <img src={user.image} alt='user profile' />
                                        <span>
                                            {user.firstName} {user.lastName}
                                        </span>
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MultiSearchBar;