/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


fetch("http://localhost:8080/guestmap/messages")
        .then(r => r.json())
        .then(body => console.log(body))

class App extends React.Component {
    render(){
        return (
                <h1>Hello world</h1>
        )
    }
}