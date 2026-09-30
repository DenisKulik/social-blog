import { render } from "@testing-library/react";
import { Loader } from "./Loader";

describe("Loader", () => {
  it("рендерится без пропсов", () => {
    const { container } = render(<Loader />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("мержит переданный className", () => {
    const { container } = render(<Loader className="extra" />);

    expect(container.firstChild).toHaveClass("Loader", "extra");
  });
});
