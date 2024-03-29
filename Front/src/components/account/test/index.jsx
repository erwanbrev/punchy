import React from "react";
import './test.css';


export const Index = () => {

    const [fName, setFName] = React.useState('')
    const [lName, setLName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [school, setSchool] = React.useState('')

    const handleSubmit = e => {
        e.preventDefault()
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ fName, lName, email, password, phone, school })
        }
        console.log(request);
    
        // requete à l'api
        fetch(`http://localhost:5000/user/signup`, request)
        .then(res => res.json())
        .then(content => console.log(content))
        .catch(err => console.log(err))
    }

    return (
        <div className="container">
        <h1 className="text-center">Register</h1>
        <form className="registration-form" onSubmit={handleSubmit}>
            <label className="col-one-half">
                <span className="label-text">First Name</span>
                <input type="text" required value={fName} onChange={(e) => {setFName(e.target.value)}}/>
            </label>
            <label className="col-one-half">
                <span className="label-text">Last Name</span>
                <input type="text" required value={lName}  onChange={(e) => {setLName(e.target.value)}} />
            </label>
            <label>
                <span className="label-text">Email</span>
                <input type="text" required value={email} onChange={(e) => {setEmail(e.target.value)}} />
            </label>
            <label className="password">
                <span className="label-text">Password</span>
                <input type="password" required value={password} onChange={(e) => {setPassword(e.target.value)}} />
            </label>
            <label>
                <span className="label-text">Phone</span>
                <input type="text" required value={phone} onChange={(e) => {setPhone(e.target.value)}} />
            </label>
            <label>
                <span className="label-text">School</span>
                <select required value={school} onChange={(e) => {setSchool(e.target.value)}}  style={{width: "100%"}}>
                    <option value="imts">IMTS</option>
                    <option value="institutD">Institut D</option>
                </select>
            </label>
            <div className="text-center">
                <button type="submit" className="submit" name="register">Sign Me Up</button>
            </div>
        </form>
    </div>
    )
}