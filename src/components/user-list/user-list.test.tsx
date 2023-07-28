import React from "react";
import { render, screen } from "@testing-library/react";
import UserList from "./user-list";

// Фиктивные данные пользователей для тестирования
const mockUsers = [
  {
    id: 1,
    login: "user1",
    avatar_url: "avatar1",
    html_url: "user1",
    public_repos: 3,
  },
  {
    id: 2,
    login: "user2",
    avatar_url: "avatar2",
    html_url: "user2",
    public_repos: 4,
  },
  {
    id: 3,
    login: "user3",
    avatar_url: "avatar3",
    html_url: "user3",
    public_repos: 6,
  },
];

test("компонент отображает список пользователей", () => {
  render(
    <UserList
      users={mockUsers}
      currentPage={1}
      totalPages={1}
      onSortChange={() => {}}
      onUserClick={() => {}}
    />
  );

  // Проверяем, что все пользователи отображаются на странице
  const userListItems = screen.getAllByTestId("user-list-item");
  expect(userListItems).toHaveLength(mockUsers.length);

  // Проверяем, что каждый пользователь отображает правильное имя и количество репозиториев
  mockUsers.forEach((user, index) => {
    const userListItem = userListItems[index];
    expect(userListItem).toHaveTextContent(user.login);
    expect(userListItem).toHaveTextContent(
      `Количество репозиториев: ${user.public_repos}`
    );
  });
});
