import { render } from "@testing-library/react";
import { PageLoader } from "./PageLoader";

describe("PageLoader", () => {
  it("рендерится и содержит вложенный Loader", () => {
    const { container } = render(<PageLoader />);

    const wrapper = container.firstElementChild;

    expect(wrapper).toBeInTheDocument();
    expect(wrapper?.firstElementChild).toBeInTheDocument();
  });

  it("мержит переданный className", () => {
    const { container } = render(<PageLoader className="extra" />);

    expect(container.firstChild).toHaveClass("PageLoader", "extra");
  });
});
