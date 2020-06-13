import axios from 'axios'
import firebase from 'firebase/app' //npm install firebase
import 'firebase/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyDhWigM8wrQDa_TCRfZCksA1HLK87z2Y7A",
    authDomain: "boardgames-3eea4.firebaseapp.com",
    projectId: "boardgames-3eea4",
});

var db = firebase.firestore();
export default{
    isAuthenticated(){
        return !!localStorage.getItem("username");
    },
    Login(username){
        localStorage.setItem("username",username);
    },
    Logout(){
        localStorage.removeItem("username");
    },
    getGames(){  //le chiamate sono asincrone
        return axios.get("https://www.boardgameatlas.com/api/search?limit=&client_id=vuxWmH7cLW"); 
    },
    getGame(name){
        return axios.get("https://www.boardgameatlas.com/api/search?name=" + name + "&client_id=vuxWmH7cLW&order_by=name");
    },
    searchGioco(text) {
        if (!text || text.length < 2) {
            return new Promise(resolve => {
                resolve([]);
            });
        }
        return axios.get("https://www.boardgameatlas.com/api/search?client_id=vuxWmH7cLW")
        .then(data => {
            return data.data.games.filter(
                element => element.name.indexOf(text) >= 0
                ).map(element => element.name);
        });
    },
    getVote(name){
        return db.collection('voti').where('gioco', '==', name).get().then((data) => {
            let sum = 0;
            let username = localStorage.getItem('username');
            let userVote = null;
            let avg = 0;
            data.forEach(doc => {
                sum += doc.data().voto;
                if(doc.data().username === username){
                    userVote = doc.data().voto;
                }
            });
            if(data.size != 0){ avg = sum/data.size; }
            else avg = null;
            return{
                total: data.size,
                avg: avg,
                userVote: userVote
            };
        });
    },
    setVote(name, valore){
        return db.collection('voti').doc().set({
            voto: valore,
            gioco: name,
            username: localStorage.getItem('username')
        })
    },
}