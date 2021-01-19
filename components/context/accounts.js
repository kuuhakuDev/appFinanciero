import React,{createContext,useState} from 'react';

export default ({ children }) =>{
    const [state,setState] = useState([]);
    return (
            <AccountContext.Provider value={[state,setState]}>
                {children}
            </AccountContext.Provider>
    );
}

export const AccountContext = createContext([]);