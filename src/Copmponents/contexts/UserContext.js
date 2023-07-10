

import React, { createContext, useState } from 'react'

export const UserContext = createContext( );

export default function UserProvider(props){
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined,
  })
  return (
    <UserContext.Provider value={{userData, setUserData}}>
      {props.children}
    </UserContext.Provider>
  )
}



// const RecoveryContext = React.createContext({
//   resetPassword: false,
//   setResetPassword: () => {},
//   recoveryCode: null,
//   setRecoveryCode: () => {},
// });

// function RecoveryContextProvider(props) {
//   const [resetPassword, setResetPassword] = useState(false);
//   const [recoveryCode, setRecoveryCode] = useState(null);

//   const handleRecoveryCodeSubmit = (code) => {
//     // handle submission of recovery code
//     setRecoveryCode(code);
//     setResetPassword(true);
//   };

//   const handleSetNewPassword = () => {
//     // handle setting of new password
//     // call API endpoint, etc.
//   };

//   const handleCancelResetPassword = () => {
//     // handle canceling reset password
//     setResetPassword(false);
//     setRecoveryCode(null);
//   };

//   const handleGoToRecoveryCodePage = () => {
//     // handle going back to recovery code page
//     setResetPassword(false);
//   };

//   return (
//     <RecoveryContext.Provider
//       value={{
//         resetPassword,
//         setResetPassword,
//         recoveryCode,
//         setRecoveryCode,
//         handleRecoveryCodeSubmit,
//         handleSetNewPassword,
//         handleCancelResetPassword,
//         handleGoToRecoveryCodePage,
//       }}
//     >
//       {props.children}
//     </RecoveryContext.Provider>
//   );
// }

// export { RecoveryContext, RecoveryContextProvider };



