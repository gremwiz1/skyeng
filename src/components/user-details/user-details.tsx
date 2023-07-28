import React from "react";

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

interface UserDetailsProps {
  user: User;
  resetProfile: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, resetProfile }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img src={user.avatar_url} alt={user.login} width="100" height="100" />
      <h2>{user.login}</h2>
      <p>{user.name}</p>
      <p>{user.bio}</p>
      <p>Количество репозиториев: {user.public_repos}</p>
      <p>Подписчики: {user.followers}</p>
      <p>Подписки: {user.following}</p>
      <a href={user.html_url} target="_blank" rel="noopener noreferrer">
        Перейти на профиль
      </a>
      <button
        onClick={() => {
          resetProfile();
        }}
        style={{ marginTop: "10px", width: "100px", height: "60px" }}
      >
        назад
      </button>
    </div>
  );
};

export default UserDetails;
