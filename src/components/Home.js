import React, { useContext } from "react";
import { Table, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { ListContext } from "../contexts/ListContext";

const Home = (props) => {
  const navigate = useNavigate()
  const { listData } = useContext(ListContext);
  const listPsudoLength = listData.filter(item => item.isActive).length;

  return (
    <div>
      <h2 className="App-header mb-3">Inventory List</h2>
      <div className="d-flex justify-content-center">
        <Card className="w-50 text-center">
          <CardBody>
            <Table striped className="">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {listData.map(row => (
                  <tr key={row.id}>
                    <th scope="row">{row.id}</th>
                    <td>{row.name}</td>
                    <td>{row.quantity}</td>
                  </tr>
                ))}
                {
                  !listPsudoLength && <tr><td colSpan={3} className="text-center p-3">No Data!!</td></tr>
                }
              </tbody>
            </Table>
            <button className="btn btn-primary" onClick={() => navigate("/lists")}>Edit List</button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export { Home };
