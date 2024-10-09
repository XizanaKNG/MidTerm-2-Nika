import React, { useState, useEffect } from "react";
import axios from "axios";

const UserCard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=10")
      .then((response) => {
        const fetchedUsers = response.data.results.map((user) => ({
          name: `${user.name.first} ${user.name.last}`,
          age: user.dob.age,
          gender: user.gender,
          username: user.login.username,
          city: user.location.city,
          country: user.location.country,
          postcode: user.location.postcode,
          picture: user.picture.large,
        }));
        setUsers(fetchedUsers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filterUsers = () => {
    const filtered = users.filter((user) => {
      const matchesName = user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesMinAge = minAge ? user.age >= minAge : true;
      const matchesMaxAge = maxAge ? user.age <= maxAge : true;
      return matchesName && matchesMinAge && matchesMaxAge;
    });

    setFilteredUsers(filtered);
    setNoResults(filtered.length === 0 && (searchTerm || minAge || maxAge));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filterUsers();
  };

  return (
    <div>
      <form className="filter-container" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min age"
          value={minAge}
          onChange={(e) => setMinAge(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max age"
          value={maxAge}
          onChange={(e) => setMaxAge(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {noResults && <p>მომხარებელი არ მოიძებნა</p>}
      {filteredUsers.map((user, index) => (
        <div key={index} className="user-card">
          <div className="user-header">
            <img src={user.picture} alt="User Avatar" />
            <div className="user-details">
              <h2>{user.name}</h2>
              <p>
                {user.age} / {user.gender}
              </p>
            </div>
          </div>
          <div className="user-info">
            <p>
              <strong>Age:</strong> {user.age} y.o.
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>City:</strong> {user.city}
            </p>
            <p>
              <strong>Country:</strong> {user.country}
            </p>
            <p>
              <strong>Postcode:</strong> {user.postcode}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCard;
