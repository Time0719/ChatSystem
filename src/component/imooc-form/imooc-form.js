import React,{useState} from 'react';


const imoocForm = (Comp) => {
    return function WrapperComp(props){
        const [state, setState] = useState({});
    
        const handleChange=(key, val)=> {
            setState({...state, [key]: val });
        };
    
        return <Comp handleChange={handleChange} state={state} {...props}></Comp>
    };
};

export default imoocForm;


