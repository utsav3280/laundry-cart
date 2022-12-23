import React, { useEffect } from "react";
import Data from "./data";
import { useState } from "react";
import axios from "axios";

function CreateOrderTable() {
    const [info] = useState(Data);
    console.log(info);
    const [update, setUpdate] = useState(0);

    const handleChange = (val, id) => {
        [...info][id].quantity = val;
        setUpdate(val);
    };

    const washType = (opt, id) => {
        if (info[id].quantity !== "") {
            if (![...info][id].washOption.includes(opt)) {
                [...info][id].washOption.push(opt);
            }
            else {
                let arr = [];
                for (let i = 0; i < [...info][id].washOption.length; i++) {
                    if ([...info][id].washOption[i] === opt) continue
                    arr.push([...info][id].washOption[i]);
                }
                [...info][id].washOption = arr;
            }
            let sum = 0;
            for (let i = 0; i < [...info][id].washOption.length; i++) {
                console.log([...info][id].washOption[i])
                switch ([...info][id].washOption[i]) {
                    case "wash": { sum += 20; break; }
                    case "press": { sum += 15; break; }
                    case "fold": { sum += 10; break; }
                    case "pack": { sum += 25; break; }
                }
            }
            [...info][id].serviceSum = sum;
            [...info][id].totalPrice = [...info][id].serviceSum * [...info][id].quantity;
            setUpdate(sum);
        }
        console.log(info);
    };

    const reset = (id) => {
        [...info][id].quantity = "";
        [...info][id].washOption = [];
        [...info][id].serviceSum = "-";
        [...info][id].totalPrice = 0;
        setUpdate(1);
        console.log(info);
    }

    const sendData = async () => {
        let reqData = [];
        for (let i = 0; i < info.length; i++) {
            if (info[i].quantity !== "") reqData.push(info[i])
        }
        await axios.post("http://localhost:5000/orders/create", reqData, { headers: { authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzE3MDk0MzIsImRhdGEiOiI2M2EyOTkzOTkxNTJiMzQ5MTZmMmZjOWUiLCJpYXQiOjE2NzE3MDU4MzJ9.Nui4dieUFwZEPPTbfNqMeNZra53UcQLKtlrqZtuDBDA" } })
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>produt type</th>
                        <th>quantity</th>
                        <th>wash type</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {info.map((ele, id) => {
                        return (
                            <tr key={id}>
                                <td>{ele.product}</td>
                                <td>
                                    <input
                                        placeholder="0"
                                        value={info[id].quantity}
                                        onChange={(e) => handleChange(e.target.value, id)}
                                    />
                                </td>
                                <td>
                                    <button onClick={() => washType("wash", id)}>
                                        wash
                                    </button>

                                    <button onClick={() => washType("press", id)}>
                                        press
                                    </button>
                                    <button onClick={() => washType("fold", id)}>
                                        fold
                                    </button>
                                    <button onClick={() => washType("pack", id)}>
                                        pack
                                    </button>
                                </td>
                                {(info[id].quantity && info[id].washOption.length !== 0) ? <td>{`${info[id].quantity} x ${info[id].serviceSum} = ${info[id].totalPrice}`}</td> : <td>-</td>}
                                {(info[id].quantity) ? <td> <button onClick={() => reset(id)}>Reset</button> </td> : null}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button onClick={sendData}>Proceed</button>
        </div>
    );
}

export default CreateOrderTable;