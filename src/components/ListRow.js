import React, { useContext } from "react";
import { ListContext } from "../contexts/ListContext";
import arrowDown from "../images/chevron_down_small.svg";
import arrowUp from "../images/chevron_up_small.svg";
import glyph from "../images/glyph_x.svg";
import refresh from "../images/refresh_FILL1_wght400_GRAD0_opsz24.svg";


const ListRow = ({ row, index }) => {

    const { deleteRow, updateRow } = useContext(ListContext);

    const removeRow = (id) => {
        deleteRow(id)
    }

    const updateQuantity = (id, row, quantity) => {
        if (quantity < 1) return;
        updateRow(id, {
            ...row, quantity
        })
    }

    const cursor = (bool) => {
        return bool < 1 ? "cursor-pointer" : "cursor-disabled";
    }
    const isDisabled = (bool) => {
        return bool ? "text-black" : "text-secondary"
    }
    return (
        <tr key={row.id}>
            <td colSpan={1} className={isDisabled(row.isActive)}>{row.name}</td>
            <td colSpan={1} className="text-center">
                <div className="d-flex flex-row justify-content-center align-items-center">
                    <span className={isDisabled(row.isActive)}>
                        Quantity: {row.quantity}
                    </span>
                    <span className="d-flex flex-column mx-2">
                        <img onClick={() => row.isActive && updateQuantity(row.id, row, row.quantity + 1)} src={arrowUp} className={`pb-1 ${cursor(!row.isActive)}`} />
                        <img onClick={() => row.isActive && updateQuantity(row.id, row, row.quantity - 1)} className={`pb-1 ${cursor(!row.isActive || row.quantity <= 1)}`} src={arrowDown} />
                    </span>
                </div>
            </td>
            <td colSpan={1} className="text-end">{row.isActive ? <img data-testid="remove" className="cursor-pointer" src={glyph} onClick={() => removeRow(row.id)} alt="remove" /> : <img className="cursor-pointer" aria-label="refresh" onClick={() => updateRow(row.id, { ...row, isActive: true })} src={refresh} />}</td>
        </tr>
    )
}


export default ListRow;