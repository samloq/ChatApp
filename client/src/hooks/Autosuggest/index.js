import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import useDataFetching from '../Fetch';
import './hint.css';






function UseAutoSuggest() {
    const ENDPOINT = `http://localhost:5000/api/v1/users`;
    const { loading, results, error } = useDataFetching(ENDPOINT);
    
    
    const key = 'user';
    
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');
    const [data, setData] = useState([]);



    // if (loading || error) {
    //     return loading ? "Loading..." : error.message;
    // }

    const renderSuggestion = suggestion => (
        <div className={'hint'}>
            {suggestion[`${key}`]}
        </div>
    );
    
    
    const getSuggestions = v => {
        const inputValue = v.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : data.filter(e =>
            e[`${key}`].toLowerCase().slice(0, inputLength) === inputValue    
        );
    };
    
    const getSuggestionValue = suggestion => suggestion[`${key}`];



    useEffect(() => {
        setData(results.users);
    },[results]);

    const inputProps = {
        placeholder: 'Type username',
        value,
        onChange: (e, {newValue}) => setValue(newValue) 
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    }

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    }


    return (
    <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
    />)


}

export default UseAutoSuggest;