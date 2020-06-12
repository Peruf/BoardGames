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
        return axios.get("https://www.boardgameatlas.com/api/search?limit=&client_id=vuxWmH7cLW&ordered_by=name"); 
     },
    getGame(name){
        return axios.get("https://www.boardgameatlas.com/api/search?name=" + name + "&client_id=vuxWmH7cLW&ordered_by=name");
    },
    searchGame(text){
        if(text.length < 2 || !text){
            //se il valore è minore di 3 o non esiste il testo restituiamo una promive con un array vuoto
            return new Promise(resolve => {
                resolve([]);
            })
        }else{
        return axios.get("https://www.boardgameatlas.com/api/search?client_id=vuxWmH7cLW").then(data => {
            //se la string text corrisponde all'inizio del nome del pokemon allora torno l'elemento, indexOf ritorna il primo indice a cui c'è l'elemento passato
            var i;
            console.log(text)
            for(i = 0; i< data.data.games.length; i++){
                console.log(data.data.games[i]);
                return data.data.games[i].filter((element => element.name.indexOf(text) == 0));//.map(element => element.name);
            }
        });}
    },
    getVote(name){
        return db.collection('voti').where('nome', '==', name).get().then((data) => {
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