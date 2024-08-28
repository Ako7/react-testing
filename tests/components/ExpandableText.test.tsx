import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  const limit = 255;
  const longText =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur magnam excepturi dicta totam, dolores amet saepe ipsa modi qui officiis tempora quos neque tenetur! Quisquam beatae ut iusto. Fugit quam iste ad ipsa consequatur consequuntur! Adipisci eveniet ratione reprehenderit ea nulla delectus cumque facilis odio modi natus soluta magnam corporis provident aliquam vel, nostrum id eum excepturi laboriosam? Commodi tempore amet ex repellat iure in? Assumenda aperiam doloribus veniam. Quos delectus ipsa nihil. Molestiae voluptas animi possimus saepe non repudiandae optio autem nam, eveniet, amet rem ut provident, distinctio enim eaque blanditiis atque sequi? Aspernatur cupiditate fugit harum vitae sint?";
  const truncatedText = longText.substring(0, limit) + "...";

  it("should show unwraped text if its shorter than 255 chars", () => {
    const text = "Hello World";
    render(<ExpandableText text={text} />);

    const article = screen.getByText(text);

    expect(article).toBeInTheDocument();
  });
  it("should show wraped text if its longer than 255 chars", () => {
    render(<ExpandableText text={longText} />);

    const article = screen.getByText(truncatedText);
    expect(article).toBeInTheDocument();

    const smlbutton = screen.getByRole("button");
    expect(smlbutton).toBeInTheDocument();
    expect(smlbutton).toHaveTextContent(/more/i);
  });
  it("should show unwraped text if user cliks the more button", async () => {
    render(<ExpandableText text={longText} />);

    const smlbutton = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(smlbutton);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(smlbutton).toHaveTextContent(/less/i);
  });
  it("should show wraped text if user cliks the less button", async () => {
    render(<ExpandableText text={longText} />);
    const showMoreButton = screen.getByRole("button", { name: /more/i });
    const user = userEvent.setup();
    await user.click(showMoreButton);

    const showLessButton = screen.getByRole("button", { name: /less/i });
    await user.click(showLessButton);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(showLessButton).toHaveTextContent(/more/i);
  });
});
