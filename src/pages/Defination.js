import { useEffect, useState } from "react";
import { Link, useFetcher, useParams } from "react-router-dom";

import { v4 as uuidv4 } from 'uuid';
import NotFound from "../components/NotFound";
import DefinationSearch from "../components/DefinationSearch";
import useFetch from "../hooks/UseFetch";

export default function Defination(){
    // const [word, setWord] = useState();
    //const [notFound, setNotFound] = useState(false);
    let {search} = useParams();
    //const navigate = useNavigate();

    const [word, errorStatus ]= useFetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + search);

    // useEffect(() => {
    //     fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + search)
    //     .then((response) => {
    //         if(response.status === 404){
    //             setNotFound(true);
    //             return null;
    //         }
    //        return response.json();
    //     })
    //     .then((data) => {
    //         setWord(data ? data[0].meanings: null);
    //     });
    // }, []);

    if(errorStatus === 404){
        return (
            <>
                <NotFound />
                <Link to='/dictionary'>Search another</Link>
            </>
        );
    }

    if(errorStatus){
        return (
            <>
                <p>there is a problem with the server, try again later.</p>
                <Link to='/dictionary'>Search another</Link>
            </>
        );
    }

    return (
        <>
           
            {word?.[0]?.meanings ? (
            <>
                <h1>Here is a defination: {search}</h1>
                {word[0].meanings.map((meaning) => {
                    return(
                        <p key={uuidv4()}>
                            {meaning.partOfSpeech + ': '}
                            {meaning.definitions[0].definition}
                        </p>
                    );
                })}
                <p>Search Again:</p>
                <DefinationSearch /> 
            </> ): <p>Loading .....</p> }
        </>
    );
}