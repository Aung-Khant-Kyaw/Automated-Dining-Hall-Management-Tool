import React, {useEffect, useState} from 'react';
// useEffect is a react hook that allows to initiate some method before rendering
// useState is for store the data
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PersonalSchedule from './PersonalSchedulePage'
import Footer from '../Components/Footer'
import TradeShiftPage  from './TradeShiftPage';
import DailySchedulesPage from './DailySchedulesPage';
import { NavLink } from "react-router-dom"

function Login() {
    const [ user, setUser ] = useState({});
    const [lakerID, setLakerID ] = useState();

    function handleCallbackRespone(response){
        // console.log("Encoded JWT ID Token" + response.credential);
        var userObject = jwt_decode(response.credential);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true; 
        setLakerID(userObject.email.slice(0,userObject.email.indexOf("@")));
    }

    function handleSignOut (event) {
        // if sign out, set the user to empty again
        setUser({});
        document.getElementById("signInDiv").hidden = false; 
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
        client_id: "254436481739-eoprpsnju5v5i7p3kkrvnaid21fp55nb.apps.googleusercontent.com",
        callback: handleCallbackRespone
        });

        google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outtline", size: "large"}
        );

        // google.accounts.id.prompt();
    }, [])

  // if no user, sign in button
  // if a user, show log out button
    return (
        <div>
            <div id="signInDiv"></div>
            { Object.keys(user).length !== 0 && 
                <Router>
                    <div className="navigation">
                        <nav className="navbar navbar-expand navbar-primary bg-primary">
                            <div className="container">
                                <NavLink className="navbar-brand" to="/">
                                    Automated Dining-Hall Management Tool
                                </NavLink>
                                <div>
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/">
                                            My Schedule
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/tradeshift">
                                            Trade Shifts
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/dailyschedules">
                                            Daily Schedules
                                            </NavLink>
                                        </li>
                                        <li>
                                            <button className="bg-warning" onClick = { (e) => handleSignOut(e)}>Sign Out</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <Routes>
                        <Route path="/" element={<PersonalSchedule id={lakerID}/>} />
                        <Route path="/tradeshift" element={<TradeShiftPage id={lakerID}/>} />
                        <Route path="/dailyschedules" element={<DailySchedulesPage id={lakerID}/>} />
                    </Routes>
                    <Footer/>
                </Router>
            }
            {/* { Object.keys(user).length !== 0 && 
                <button onClick = { (e) => handleSignOut(e)}>Sign Out</button>
            } */}
        </div>
    );
}

export default Login;

