import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
  it("should render a name", () => {
    const user: User = { id: 1, name: "Tom", isAdmin: true };
    render(<UserAccount user={user} />);
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });
  it("should render an edit button if user is admin", () => {
    const user: User = { id: 1, name: "Tom", isAdmin: true };
    render(<UserAccount user={user} />);
    const editbutton = screen.getByRole("button");
    expect(editbutton).toBeInTheDocument();
    expect(editbutton).toHaveTextContent(/edit/i);
  });
  it("should not render an edit button if user is not admin", () => {
    const user: User = { id: 1, name: "Tom", isAdmin: false };
    render(<UserAccount user={user} />);
    const editbutton = screen.queryByRole("button");
    expect(editbutton).not.toBeInTheDocument();
  });
});
