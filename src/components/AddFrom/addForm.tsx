import React, {SyntheticEvent, useState} from "react";
import './addForm.css'
import {Btn} from "../common/Btn";
import {geocode} from "../../utils/geocoding";

export const AddForm = () =>{
    const [Loading, setLoadning] = useState(false);
    const [id, setId] = useState('');
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: 0,
        url: '',
        address: ''
    });
    const savAdd = async (e:SyntheticEvent) => {
        e.preventDefault();

        setLoadning(true);

        try{
            const {lat, lon} = await geocode(form.address);
            const res = await fetch('http://localhost:3001/ad', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    ...form,
                    lat,
                    lon,
                })
            })
            const data = await res.json();
            setId(data.id);
        } finally {
            setLoadning(false)
        }

    }
    const updateFrom = (key: string, value:any) =>{
        setForm(form =>({
            ...form,
            [key]:value,
        }))
    }
    if (Loading){
        return <h2>Trwa dodawanie ogłoaszenia</h2>
    }
    if (id){
        return <h2>Twoje ogłosznie "{form.name}" zostałow daodane do seriwsu poda adresem {id}</h2>
    }

    return (<form action="" className="add-form" onSubmit={savAdd}>
        <h1>Dodawanie ogłoszenia</h1>
        <p>
            <label htmlFor="">
                Nazwa: <br/>
                <input type="text" name="name" required maxLength={99} value={form.name} onChange={e => updateFrom('name', e.target.value)}/>
            </label>
        </p>
        <p>
            <label htmlFor="">
                Opis: <br/>
                <textarea name="description"  maxLength={999}
                          value={form.description} onChange={e => updateFrom('description', e.target.value)}
                />
            </label>
        </p>
        <p>
            <label htmlFor="">
                Cena: <br/>
                <input type="number" name="price" value={form.price} onChange={e => updateFrom('price', Number(e.target.value))} />
                <em>Pozostaw zero w polu, aby nie wyświetlać ceny.</em>
            </label>
        </p>
        <p>
            <label htmlFor="">
                Adres URL <br/>
                <input type="url" name="url" value={form.url} onChange={e => updateFrom('url', e.target.value)} maxLength={100}/>

            </label>
        </p>
        <p>
            <label htmlFor="">
                Adres fizyczny na mamie : <br/>
                <input type="text" name="address" value={form.address} onChange={e => updateFrom('address', e.target.value)} required />
            </label>
        </p>
        <Btn text="zapisz"/>
    </form>)
};
