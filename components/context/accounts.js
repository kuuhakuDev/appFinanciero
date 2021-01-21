import React,{createContext,useState} from 'react';

export default ({ children, value }) =>{
    const [state,setState] = useState(value);
    return (
            <AccountContext.Provider value={[state,setState]}>
                {children}
            </AccountContext.Provider>
    );
}

export const AccountContext = createContext([]);