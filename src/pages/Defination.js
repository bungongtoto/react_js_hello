import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { v4 as uuidv4 } from 'uuid';
import NotFound from "../components/NotFound";
import DefinationSearch from "../components/DefinationSearch";

export default function Defination(){
    const [word, setWord] = useState();
    const [notFound, setNotFound] = useState(false);
    let {search} = useParams();
    //const navigate = useNavigate();

    useEffect(() => {
        fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + search)
        .then((response) => {
            if(response.status === 404){
                setNotFound(true);
                return null;
            }
           return response.json();
        })
        .then((data) => {
            setWord(data ? data[0].meanings: null);
        });
    }, []);

    if(notFound === true){
        return (
            <>
                <NotFound />
                <Link to='/dictionary'>Search another</Link>
            </>
        );
    }

    return (
        <>
           
            {word ? 
            <>
                <h1>Here is a defination: {search}</h1>
                {word.map((meaning) => {
                    return(
                        <p key={uuidv4()}>
                            {meaning.partOfSpeech + ': '}
                            {meaning.definitions[0].definition}
                        </p>
                    );
                })}
                <p>Search Again:</p>
                <DefinationSearch /> 
            </> : <p>Loading .....</p> }
        </>
    );
}