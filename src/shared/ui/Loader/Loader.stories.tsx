import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Loader } from "./Loader";

const meta = {
  title: "shared/Loader",
  component: Loader,
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Default: Story = {};

export const Large: Story = {
  args: {
    size: "large",
  },
};
