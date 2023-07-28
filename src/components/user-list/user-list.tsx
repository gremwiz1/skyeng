import React from "react";

interface User {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  public_repos: number;
}

interface UserListProps {
  users: User[];
  onSortChange: (ascending: boolean) => void;
  onUserClick: (username: string) => void;
  currentPage: number;
  totalPages: number;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onSortChange,
  onUserClick,
  currentPage,
  totalPages,
}) => {
  return (
    <div style={{ margin: "20px" }}>
      {users.length > 0 ? (
        <>
          <button onClick={() => onSortChange(true)}>
            Сортировать по возрастанию
          </button>
          <button onClick={() => onSortChange(false)}>
            Сортировать по убыванию
          </button>
        </>
      ) : (
        ""
      )}
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            style={{
              marginTop: "10px",
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            data-testid="user-list-item" 
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              width="50"
              height="50"
            />
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              {user.login}
            </a>
            <p>Количество репозиториев: {user.public_repos}</p>
            <button onClick={() => onUserClick(user.login)}>Подробности</button>
          </li>
        ))}
      </ul>
      {users.length > 0 ? (
        <p>
          Страница {currentPage} из {totalPages}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};
export default UserList;
