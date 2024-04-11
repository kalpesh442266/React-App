import { createContext, useEffect, useState } from "react";

const ListContext = createContext();
const defaultValue = [];

const ListContextProvider = ({ children }) => {

    const [listData, setListData] = useState(() => {
        const storedValue = localStorage.getItem('listData') || null;
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem('listData', JSON.stringify(listData));
    }, [listData]); // Re-run only when items change


    const addNewRow = (newRow) => {
        // add new and update localstorage
        setListData((prevData) => [...prevData, newRow]);
    }

    const updateRow = (id, updatedRow) => {
        // update and update localstorage
        setListData((prevData) =>
            prevData.map((item) => (item.id === id ? updatedRow : item))
        );
    }

    const deleteRow = (id) => {
        // delete and update localstorage
        setListData((prevData) => prevData.map((item) => (item.id === id ? { ...item, isActive: false } : item)));
    }

    const clearAllData = () => {
        setListData([])
    }

    return (
        <ListContext.Provider value={{ listData, addNewRow, updateRow, deleteRow, clearAllData }}>
            {children}
        </ListContext.Provider>
    )
}

export { ListContextProvider, ListContext };