import React, { useState } from "react";
import axios from "axios";
import SearchForm from "./components/search-form/search-form";
import UserList from "./components/user-list/user-list";
import UserDetails from "./components/user-details/user-details";
import "./App.css";

interface User {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  name: string;
  bio: string;
  followers: number;
  following: number;
}

const { REACT_APP_TOKEN = undefined } = process.env;

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [query, setQuery] = useState<string>("");

  const fetchUserDetails = async (user: User) => {
    try {
      const response = REACT_APP_TOKEN
        ? await axios.get(`https://api.github.com/users/${user.login}`, {
            headers: {
              Authorization: `token ${REACT_APP_TOKEN}`,
            },
          })
        : await axios.get(`https://api.github.com/users/${user.login}`);
      return { ...user, public_repos: response.data.public_repos };
    } catch (error) {
      console.error("Ошибка при загрузке пользователя:", error);
      return user;
    }
  };

  const handleSearch = async (searchQuery: string) => {
    try {
      const pageNumber = 1;
      const response = await axios.get(
        `https://api.github.com/search/users?q=${searchQuery}&page=${pageNumber}`
      );
      const fetchedUsers = response.data.items;

      // Запрашиваем дополнительные данные для каждого пользователя, включая количество репозиториев
      const updatedUsers = await Promise.all(
        fetchedUsers.map(fetchUserDetails)
      );
      setUsers(updatedUsers);
      setCurrentPage(pageNumber);
      setTotalResults(response.data.total_count);
      setQuery(searchQuery);
      setSelectedUser(null);
    } catch (error) {
      console.error("Ошибка при загрузке пользователей:", error);
    }
  };

  const handleSortChange = async (ascending: boolean) => {
    const updatedUsers = [...users];
    updatedUsers.sort((a, b) => {
      return ascending
        ? a.public_repos - b.public_repos
        : b.public_repos - a.public_repos;
    });
    setUsers(updatedUsers);
  };

  const handlePagination = async (pageNumber: number) => {
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${query}&page=${pageNumber}`
      );
      const fetchedUsers = response.data.items;
      // Запрашиваем дополнительные данные для каждого пользователя, включая количество репозиториев
      const updatedUsers = await Promise.all(
        fetchedUsers.map(fetchUserDetails)
      );
      setUsers(updatedUsers);
      setCurrentPage(pageNumber);
    } catch (error) {
      console.error("Ошибка при загрузке пользователей:", error);
    }
  };

  const handleUserClick = async (username: string) => {
    try {
      const response = REACT_APP_TOKEN
        ? await axios.get(`https://api.github.com/users/${username}`, {
            headers: {
              Authorization: `token ${REACT_APP_TOKEN}`,
            },
          })
        : await axios.get(`https://api.github.com/users/${username}`);
      setSelectedUser(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке пользователя:", error);
    }
  };

  const resetProfile = () => {
    setSelectedUser(null);
  };

  const totalPages = Math.ceil(totalResults / 30);

  return (
    <div data-testid="app-component" className="app">
      <SearchForm onSearch={handleSearch} />
      {selectedUser ? (
        <UserDetails user={selectedUser} resetProfile={resetProfile} />
      ) : (
        <>
          <UserList
            users={users}
            onSortChange={handleSortChange}
            onUserClick={handleUserClick}
            currentPage={currentPage}
            totalPages={totalPages}
          />
          <div>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button key={index} onClick={() => handlePagination(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
