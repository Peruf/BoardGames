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
    cercaCommenti(gioco, autore) {
        console.log(" - Ora cercherò tutti i commenti per il gioco in questione nel database");
        console.log(" - Ecco il gioco:" + gioco);

        console.log(" - Noi siamo:" + autore);

        return db
        .collection('commenti')
        .where('gioco', '==', gioco)
        .get().then((data) => {
            
            console.log(" - Dovrei aver preso dei dati:");
            
            let arrayCommenti = [];
            let autorePresente = false;
            let commentoAutore = null;

            data.forEach(doc => {
                console.log("   -> " + doc.data().commento + " >>> " + doc.data().autore);
                arrayCommenti.push(doc.data().commento);

                if (doc.data().autore === autore) {
                    autorePresente = true;
                    commentoAutore = doc.data().commento;
                }

            });

            console.log(" - Ecco l'array che si è creato con tutti i commenti:");
            console.log(arrayCommenti);

            if (autorePresente) {
                console.log(" - Noi abbiamo già scritto un commento! >>> " + commentoAutore);
            } else {
                console.log(" - Noi NON abbiamo già scritto un commento!");
            }

            console.log("<<< FINE DELLA FUNZIONE CERCA COMMENTI >>>");
            return {
                arrayCommenti: arrayCommenti,
                autorePresente: autorePresente,
                commentoAutore: commentoAutore
            }
            
        });
    },
    saveCommento(testo, autore, gioco) {
        console.log("<<< Sono all'interno di SAVE COMMENTO >>>");

        console.log("- Ora andrò a salvare i seguenti dati nel database:");
        console.log("  -> testo: " + testo);
        console.log("  -> autore: " + autore);
        console.log("  -> gioco: " + gioco);

        let nomeDoc = autore+"-"+gioco;
        console.log("Il nome del doc creato sarà: " + nomeDoc);

        return db
        .collection('commenti')
        .doc(nomeDoc)
        .set({

            commento: testo,
            autore: autore,
            gioco: gioco
        });
    }
}