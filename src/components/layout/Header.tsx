import React, {FormEvent, FormEventHandler, useContext, useState} from "react";
import './Header.css'
import {Btn} from "../common/Btn";
import {SearchContext} from "../../contexts/search.context";

export const Header = ()=>{
    const {search, setSearch} = useContext(SearchContext)
    const [inputVal, setInputVal] = useState(search)

    function setSearchFromLocalStates(e:FormEvent) {
        e.preventDefault();
        setSearch(inputVal)
    }

    return(
    <header>
        <h1> <strong>Mega</strong>  Ogłoszenia</h1>
        <Btn text="Doodaj ogłoszenie"/>
        <form className="search" onSubmit={setSearchFromLocalStates}>
            <input type="text" value={inputVal} onChange={e => setInputVal(e.target.value)}/><Btn text="Szukaj"/>
        </form>
    </header>
);
};