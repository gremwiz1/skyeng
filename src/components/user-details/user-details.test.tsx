import { render, screen } from "@testing-library/react";
import UserDetails from "./user-details";

test("компонент UserDetails должен правильно отображать переданные данные пользователя", () => {
  // Подготавливаем данные пользователя
  const user = {
    login: "octocat",
    name: "Octo Cat",
    public_repos: 10,
    followers: 100,
    following: 50,
    id: 1,
    avatar_url: "https://example.com/avatar.png",
    html_url: "https://example.com/avatar.png",
    bio: "ss",
  };

  render(<UserDetails user={user} resetProfile={() => {}} />);

  // Проверяем, что компонент отобразил переданные данные пользователя
  expect(screen.getByText("Octo Cat")).toBeInTheDocument();
  expect(screen.getByText("octocat")).toBeInTheDocument();
});
