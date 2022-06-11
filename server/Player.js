
var turnStatus = 0;
var boxesCount = 0;

var rndmStart =  Math.round(Math.random() * 1);


var lastPickedValue = 0;




module.exports = class Player{
    constructor(id, username, room){
        this.id = id;
        this.username = username;
        this.room = room;
        this.arr = [[],[],[],[],[]];
        this.arr[0].push(Math.floor(Math.random() * 25)+1)
        this.bingo = ['B','I','N','G','O']
    }
}