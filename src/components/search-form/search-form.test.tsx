import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "./search-form";

test("при вводе имени пользователя и нажатии на кнопку поиска вызывается обработчик с правильными параметрами", () => {
  // Мокаем функцию обработчика поиска
  const mockHandleSearch = jest.fn();

  render(<SearchForm onSearch={mockHandleSearch} />);

  // Находим поле ввода и кнопку поиска
  const searchInput = screen.getByPlaceholderText(
    /Введите имя пользователя GitHub/
  );
  const searchButton = screen.getByRole("button", { name: /Поиск/ });

  // Вводим имя пользователя
  const username = "octocat";
  fireEvent.change(searchInput, { target: { value: username } });

  // Нажимаем кнопку поиска
  fireEvent.click(searchButton);

  // Проверяем, что обработчик был вызван с правильными параметрами
  expect(mockHandleSearch).toHaveBeenCalledTimes(1);
  expect(mockHandleSearch).toHaveBeenCalledWith(username);
});
