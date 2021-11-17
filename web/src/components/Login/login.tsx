import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase, { auth } from "../../lib/firebase";

const uiConfig = {
    signInSuccessUrl: "/",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

interface Props {}

function Login(props: Props) {
    const {} = props;

    return (
        <div className="flex flex-col items-center justify-center">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
    );
}

export default Login;
