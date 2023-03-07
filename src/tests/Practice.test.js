import { render, screen } from "@testing-library/react";
import ConfirmationDialog from "../components/dialog/ConfirmationDialog";
import { BrowserRouter } from "react-router-dom";
import EmptyDashboardContainer from "../components/emptyState/dashboard";
import LoginForm from "../components/auth/LoginForm";
import { store } from "../redux/store";
import { Provider } from "react-redux";
// ----------------------------------------------------------------------

test("Confirmation dialog should be rendered", () => {
  render(<ConfirmationDialog />);
  const textEl = screen.getByTestId("confirmation-dialog-container");
  expect(textEl).toBeInTheDocument();
});

test("Link in empty dashboard container should be rendered", () => {
  render(
    <BrowserRouter>
      <EmptyDashboardContainer />
    </BrowserRouter>
  );
  const linkEl = screen.getByRole("link");
  expect(linkEl).toBeInTheDocument();
});

test("Username text input should be rendered", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <LoginForm />
      </Provider>
    </BrowserRouter>
  );
  const usernameTextInputEl = screen.getByLabelText(/username/i);
  expect(usernameTextInputEl).toBeInTheDocument();
});
