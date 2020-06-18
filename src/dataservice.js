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
        return axios.get("https://www.boardgameatlas.com/api/search?client_id=vuxWmH7cLW"); 
    },
    getGamesbyYear(year){  //le chiamate sono asincrone
        return axios.get("https://www.boardgameatlas.com/api/search?year_published=" + year + "&client_id=vuxWmH7cLW"); 
    },
    getGamesbyPerson(min, max){  //le chiamate sono asincrone
        return axios.get("https://www.boardgameatlas.com/api/search?min_players=" + min +"&max_players="+ max + "&client_id=vuxWmH7cLW"); 
    },
    getGame(name){
        return axios.get("https://www.boardgameatlas.com/api/search?name=" + name + "&client_id=vuxWmH7cLW");
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


    // metodi per gestire l'array dei preferiti 

    setFavorite(id, valore){ // id =id del gioco, valore= è preferito? (booleano)  Metodo che serve per caricare/eliminare su database un gioco preferito
        let key=id+localStorage.getItem('username'); // creo una chiave per chiamare il documento del database come voglio io in modo tale che non sia lui a decidere (id gioco piu nome del utente)
        if (valore) {
             /* return */ db.collection('preferiti').doc(key).set({ //query per inserire
                username: localStorage.getItem('username'),
                id: id,
                favorite: true,
            })
        } else {
            db.collection("preferiti").doc(key).delete(); // query per eliminarlo 
        }
    },

    getFavorite(){ // Salvo in array tutti i giochi preferiti che sono presenti sul database
        let fav=[];
        let idT=null;
        let f=null;
                db.collection('preferiti').where('username', '==', localStorage.getItem('username')).get().then((data) => {
                    data.forEach(doc => {
                        idT=doc.data().id;
                        f=doc.data().favorite;
                        fav[idT]=f; // array è costruito: array[ id del gioco ]= è preferito? (booleano)
                    });
                });
        return fav; //ritorno l'array alla pagina home che lo salverà nel suo array
    },
}