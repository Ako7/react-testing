import { render, screen } from "@testing-library/react";
import UserList from "../../src/components/UserList";
import { User } from "../../src/entities";

describe("UserList", () => {
  it("should render no users when the user array is empty", () => {
    const users: User[] = [];
    render(<UserList users={users} />);
    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  it("should render a list of users", () => {
    const users: User[] = [
      { id: 1, name: "Tom" },
      { id: 2, name: "Mot" },
    ];
    render(<UserList users={users} />);

    users.forEach((user) => {
      const userLink = screen.getByRole("link", { name: user.name });
      expect(userLink).toBeInTheDocument();
      expect(userLink).toHaveAttribute("href", `/users/${user.id}`);
      expect(userLink).toHaveTextContent(user.name);
    });
    // const usersList = screen.getByRole("link");
    // expect(usersList).toBeInTheDocument();
    // expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });
});
