import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./lib/firebase";
import Login from "./components/Login/login";

function App() {
    const [user, loading, error] = useAuthState(auth);

    return (
        <div className="bg-bluegray-800 flex flex-col items-center text-white h-screen ">
            <h1 className="text-5xl font-bold mt-10 mb-12">Resttrafik</h1>

            {loading && <h2>Laddar...</h2>}
            {user && !loading ? <Dashboard /> : <Login />}
        </div>
    );
}

export default App;
