import React, { useContext, useRef, useState } from "react";
import { Button, Card, FormGroup, FormText, Input, InputGroup, Label, Table } from "reactstrap";
import { ListContext } from "../contexts/ListContext";
import ListRow from "./ListRow";


const initialState = { name: "", quantity: 1 }

const Lists = (props) => {

  const { listData, addNewRow, clearAllData } = useContext(ListContext);

  // const [inputVal, setInputVal] = useState({});
  const [formData, setFormData] = useState(initialState);

  const [toggleVal, setToggleVal] = useState(false);

  const ref = useRef(listData.length ? listData[listData.length - 1].id : 0);

  const listPsudoLength = listData.filter(item => item.isActive).length || toggleVal;

  const addRow = () => {
    if (!formData.name || !formData.quantity) return
    ref.current += 1
    addNewRow({
      id: ref.current,
      name: formData.name,
      quantity: formData.quantity,
      isActive: true
    })
    setFormData(initialState)
  }

  const clearData = () => {
    setToggleVal(false);
    clearAllData();
  }

  const oncFormDataChange = (key, val) => {
    setFormData(prevData => ({ ...prevData, [key]: val }))
  }
  return (
    <div>
      <h2 className="App-header">Edit List</h2>
      <div className="d-flex justify-content-center">
        <Card className="w-50">
          <div className="p-5">
            <div className="row">
              <div className="col-8">
                <Label>
                  Item Name *
                </Label>
                <InputGroup>
                  <Input aria-label="name" value={formData.name} onChange={(e) => oncFormDataChange("name", e.target.value)} />
                </InputGroup>
                <FormText>
                  To get started, add 1 or more items
                </FormText>
              </div>
              <div className="col-4">
                <Label>
                  Quantity *
                </Label>
                <InputGroup>
                  <Input aria-label="quantity" type="number" value={formData.quantity} onChange={(e) => oncFormDataChange("quantity", e.target.value)} />
                  <Button onClick={addRow} color="primary" className="px-4">
                    Add
                  </Button>
                </InputGroup>
              </div>
            </div>

            <Table responsive className="mt-3">
              <thead >
                <tr className="table-secondary">
                  <th colSpan={3} className="w-40">Inventory List</th>
                </tr>
              </thead>
              <tbody aria-label="list-body">
                {listData.map((row, i) => {
                  if (toggleVal) return <ListRow key={row.id} row={row} index={i} />
                  return row.isActive && <ListRow key={row.id} row={row} index={i} />
                })}
                {
                  !listPsudoLength && <tr><td aria-label="empty-list" colSpan={3} className="text-center p-3">No Data!!</td></tr>
                }
              </tbody>
            </Table>
            <div className="d-flex justify-content-between">
              <FormGroup switch>
                <Input
                  disabled={!listData.length}
                  type="switch"
                  checked={toggleVal}
                  onChange={() => {
                    setToggleVal(!toggleVal);
                  }}
                />
                <Label check>View Deleted</Label>
              </FormGroup>
              <Button aria-label="clear-btn" onClick={clearData} outline color="secondary">Clear All</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export { Lists };

