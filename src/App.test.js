import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders inventory list", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText("Inventory List")).toBeInTheDocument();
});

test("navigates to edit inventory list", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  fireEvent.click(screen.getAllByText("Edit List")[0]);
  expect(screen.getByText("Inventory List")).toBeInTheDocument();
});

test("adds item to list", () => {
  render(
    <MemoryRouter initialEntries={["/lists"]}>
      <App />
    </MemoryRouter>
  );


  const quantityInput = screen.getByLabelText("quantity");
  const textInput = screen.getByLabelText("name");
  const addButton = screen.getByText("Add");

  fireEvent.change(quantityInput, { target: { value: '' } }); // Clear any initial values
  fireEvent.change(textInput, { target: { value: '' } }); // Clear any initial values

  // Enter data
  fireEvent.change(quantityInput, { target: { value: 9767 } });
  fireEvent.change(textInput, { target: { value: 'This is a test input' } });

  // Click add button
  fireEvent.click(addButton);

  expect(screen.queryByText("This is a test input")).toBeTruthy();

  expect(screen.queryByText(/9767/i)).toBeTruthy();
  expect(quantityInput.value).toBe('1');
  expect(textInput.value).toBe('');
});

test("removes items from list", () => {
  render(
    <MemoryRouter initialEntries={["/lists"]}>
      <App />
    </MemoryRouter>
  );


  const quantityInput = screen.getByLabelText("quantity");
  const textInput = screen.getByLabelText("name");
  const addItem = screen.getByText("Add");

  fireEvent.change(quantityInput, { target: { value: '' } }); // Clear any initial values
  fireEvent.change(textInput, { target: { value: '' } }); // Clear any initial values

  // Enter data row1
  fireEvent.change(quantityInput, { target: { value: 9767 } });
  fireEvent.change(textInput, { target: { value: 'This is a delete test input' } });

  // Click add button
  fireEvent.click(addItem);

  fireEvent.change(quantityInput, { target: { value: '' } }); // Clear any initial values
  fireEvent.change(textInput, { target: { value: '' } }); // Clear any initial values

  // Enter data row2
  fireEvent.change(quantityInput, { target: { value: 9768 } });
  fireEvent.change(textInput, { target: { value: 'This is a delete test input2' } });

  // Click add button
  fireEvent.click(addItem);

  // Get remove button for the last item
  const firstItemRemoveButton = screen.getAllByAltText("remove").reverse()[0];

  // Click remove button
  fireEvent.click(firstItemRemoveButton);

  // first item is removed
  expect(screen.queryByText('This is a delete test input2')).toBeFalsy();

  // only the second item remains
  expect(screen.getAllByText('This is a delete test input').length).toBe(1);

})

test("clears list", () => {
  render(
    <MemoryRouter initialEntries={["/lists"]}>
      <App />
    </MemoryRouter>
  );

  const quantityInput = screen.getByLabelText("quantity");
  const textInput = screen.getByLabelText("name");
  const addItem = screen.getByText("Add");

  fireEvent.change(quantityInput, { target: { value: '' } }); // Clear any initial values
  fireEvent.change(textInput, { target: { value: '' } }); // Clear any initial values

  // Enter data row1
  fireEvent.change(quantityInput, { target: { value: 9767 } });
  fireEvent.change(textInput, { target: { value: 'This is a delete test input' } });

  // Click add button
  fireEvent.click(addItem);

  fireEvent.change(quantityInput, { target: { value: '' } }); // Clear any initial values
  fireEvent.change(textInput, { target: { value: '' } }); // Clear any initial values

  // Enter data row2
  fireEvent.change(quantityInput, { target: { value: 9768 } });
  fireEvent.change(textInput, { target: { value: 'This is a delete test input2' } });

  // Click add button
  fireEvent.click(addItem);

  // Get remove button for the last item
  const clearBtn = screen.getByLabelText("clear-btn");

  // Click remove button
  fireEvent.click(clearBtn);

  // only the second item remains
  expect(screen.getByLabelText("empty-list")).toBeTruthy();
});
