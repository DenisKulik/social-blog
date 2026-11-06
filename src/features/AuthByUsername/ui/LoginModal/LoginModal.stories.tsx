import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { LoginModal } from "./LoginModal";

const meta = {
  title: "features/AuthByUsername/LoginModal",
  component: LoginModal,
  args: {
    isOpen: true,
    onClose: () => undefined,
  },
} satisfies Meta<typeof LoginModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Opened: Story = {};

export const Closed: Story = {
  args: {
    isOpen: false,
  },
};
