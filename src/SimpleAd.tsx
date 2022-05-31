import React, {useEffect, useState} from "react";
import {AddEntity} from "types";
interface Props{
    id:string;
}

export const SimpleAd = (props:Props) =>{
    const [ad,setAd] =  useState<AddEntity | null>(null)

    useEffect(()=>{
        (async ()=>{
            const res = await fetch(`http://localhost:3001/ad/${props.id}`);
            const ads = await res.json();
            setAd(ads)
        })()
    },[]);

    if(ad === null){
        return <p>Wczytywanie...</p>
    }

    return (<>
            <h2> {ad.name}</h2>
            <p>{ad.description}</p>
            {ad.price && <p>{ad.price} zł</p>}
            <hr/>
            <a href={ad.url} target="_blank" rel="noreferrer">Otwórz ogłoszenia </a>
        </>)
}