import React from 'react';
import styled from 'styled-components'
import { useState } from "react";

type SearchProps = {
    countries: Array<String>
    adminRights: boolean
}

const Search = (props: SearchProps) => {
    const data = props.countries
    const [suggestions, setSuggestions] = useState([]);
    const [countrySelected, setCountrySelected] = useState("")
    const [text, setText] = useState("");
    const [expand, setExpand] = useState(false)
    const [newCountry, setNewCountry] = useState("")
    const [dataSet, setDataSet] = useState(data)
    
    const adminRights = props.adminRights
    console.log("the data set...." + dataSet)
    const debounce = (func: any, wait: number) => {
        let timeout: number;
      
        return function executedFunction(...args: any) {
          const later = () => {
            clearTimeout(timeout);
            func(...args);
          };
      
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      };
    function onTextChange(e: React.ChangeEvent<HTMLInputElement>){

        const value = e.target.value;
        console.log(value)
        let suggList: any = []
        if (value.length > 0) {
          const regex = new RegExp(`^${value}`, `i`);
          console.log("hello....." + regex)
          suggList = dataSet.sort().filter((v: any) => regex.test(v));
        }
        console.log("THIS IS THE TYPEEEEEE OF SUGGLIST..." + typeof(suggList))
        setSuggestions(suggList)
        setText(value)
     
    }
    function suggestionSelected(value: any){
        console.log("suggestion selected...." + value)
        setCountrySelected(value)
        console.log("country seelected...." + countrySelected)
        
      }
    function expandSelected(value: boolean) {
        setExpand(value)
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setNewCountry(value)
    }
    function appendNewCountry() {
        data.push(newCountry)
        console.log("type of data is....?????" + typeof(data))
        setDataSet(data)
    }
    function renderSuggestions() {
        console.log("suggestions :" + suggestions);
        console.log("type of suggestions...." + typeof(suggestions))
        if (suggestions.length === 0) {
          return null;
        }else if (suggestions.length >= 1 && expand === false){
            return (
                <DropDownUnorderedList>
                  {suggestions.slice(1).map((city: any) => <DropDownList key={city} onClick={(e)=>suggestionSelected(city)}>{city}</DropDownList>)}
                  <button onClick={() => expandSelected(true)}>{suggestions.slice(1).length + " more countries..."}</button>
                </DropDownUnorderedList>
              )
        }else if (suggestions.length >= 1 && expand === true){
            console.log("inside else if")
            return (
                <DropDownUnorderedList>
                  {suggestions.map((city: any) => <DropDownList key={city} onClick={(e)=>suggestionSelected(city)}>{city}</DropDownList>)}
                  <button onClick={() => expandSelected(false)}>Close</button>
                </DropDownUnorderedList>
              )
        }
    }

    return (
        <DropDownListWrapper>
            {adminRights ? 
                <div>
                    <label>
                        New country:
                        <input type="text" name="name" onChange={event => handleChange(event)}/>
                    </label>
                    <button onClick={() => appendNewCountry()}>Add</button>
                </div>
            : ""}
          <DropDownListInput onChange={event => debounce(onTextChange(event), 1000)} placeholder="Search city name" value={text} type="text" />
          {renderSuggestions()}
        </DropDownListWrapper>
    );

}
const DropDownList = styled.li`
    padding: 10px 5px ;
    cursor: pointer;
    &:hover{
        background: lightgray;
        text-decoration: underline;
    }
`;
const DropDownUnorderedList = styled.ul`
list-style-type: none;
text-align: left;
margin: 0;
padding: 0;
border-top: 1px solid gray;
`

const DropDownListWrapper = styled.div`
    width: 100%;
    border: 1px solid gray;
    box-shadow: 0 0 1px rgba(0,0,0,0.1), 0 2px 4px 1px rgba(0,0,0, .18);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.73);
`;

const DropDownListInput = styled.input`
width: 100%;
border: none;
font-family: Arial, Helvetica, sans-serif;
font-size: 14px;
color: rgba(0, 0, 0, 0.73);
padding: 10px 5px ;
box-sizing: border-box;
outline: none;
`;

export default Search