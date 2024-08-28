import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("should render nothing if an arry is empty", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should render a list of images", () => {
    const urls = ["/img/asd", "/img/asdasdaw"];
    render(<ProductImageGallery imageUrls={urls} />);
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(2);

    urls.forEach((url, index) => {
      expect(imgs[index]).toHaveAttribute("src", urls[index]);
      //   const img = screen.getByRole("img");
      //   expect(img).toBeInTheDocument();
      //   expect(img).toHaveAttribute("src", url);
    });
  });
});
