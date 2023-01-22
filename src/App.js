import "./App.css";
import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const getlocalitems = () => {
        let data = localStorage.getItem("lists")
        if (data) {
            return JSON.parse(localStorage.getItem("lists"))
        }
        else {
            return []
        }
    }
    const [input, setinput] = useState("");
    const [items, setitems] = useState(getlocalitems);
    const [changeitem, setchangeitem] = useState(null);
    const [togglebtn, settogglebtn] = useState(true);

    const itemEvent = (event) => {
        setinput(event.target.value);
    };
    const clearall = () => {
        setitems([])
    }

    const addItem = () => {
        if (!input) {
            alert("plz type something in the box");
        }
        else if (input && !togglebtn) {
           
            setitems(items.map((ele) => {
                if (ele.id === changeitem) {
                    return { ...ele, input} 
                }
                return input;
            }))
            settogglebtn(true)
            setinput("")
        }
        else {
            setitems((olditems) => {
                return [...olditems, input];
            });
            setinput("");
        }
    };
    const deleteitem = (id) => {
        const updateditems = items.filter((ele, index) => { return id !== index })
        setitems(updateditems)
    }
    const edititem = (id) => {
        const updateditems = items.find((ele, index) => { return id === index })
        setinput(updateditems);
        settogglebtn(false)
        setchangeitem(id)

        /* setinput(updateditems.index) */
    }


    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify(items))
    }, [items])


    return (
        <div className="App">
            <div className="center-div">
                <h2 className="heading my-3">TO DO LIST</h2>
                <input
                    className="mx-1"
                    value={input}
                    type="text"
                    onChange={itemEvent}
                    placeholder="Type your items here"
                />
                {togglebtn ? <button onClick={addItem} className="addicon mx-1 my-1" type="submit">
                    +
                </button> : <button onClick={addItem} className="addicon mx-1 my-1" type="submit">
                    ✏️
                </button>}
                <button className="reset" onClick={() => setinput("")}>reset</button>
                <ol className="orderedlist">
                    {items.map((elem, id) => {
                        return <li> {elem.toUpperCase()}<button onClick={() => { edititem(id) }} className="editicon">✏️​</button><button className="deleteicon" onClick={() => { deleteitem(id) }}>X</button></li>;
                    })}
                </ol>
                <button className="clearall" onClick={clearall}>Clear All</button>
            </div>
        </div>
    );
};

export default App;
