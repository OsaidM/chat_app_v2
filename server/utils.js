//////////////////////////////////////////////////////////////////////////
///  Utils file contains connected users information through session   ///
//////////////////////////////////////////////////////////////////////////

///////////////
// constants //
///////////////
let users = [];
const rooms = {};


const addIfNotInside = (user, id)=> {
    /** 
     * takes user as object and id string,
     * if is inside users array don't add if not then add and return the user object 
     */
    let status = true;
    for(let i = 0; i < users.length; i++){
        if(users[i].id === id){
            status = false;
            break;
        }
        status = true;
    }

    status? users.push(user) : status;
    return user;
}

const createPlayer = (id, username,room)=>{
    /**
     * takes username string and room object and insert the player into the users array,
     * and returns list of users
     */
    const user = {id, username, room};
    addIfNotInside(user, id);
    return user;
}

const getListOfUsersByRoomId = (roomId)=>{
    return rooms[roomId] && rooms[roomId].players
}

const removePlayer = (id, username, room)=>{
    /**
     * takes username string and room object return the final users list after deleting user
     */
    let newUsers = users.filter((val,key)=>{
        console.log(key)
        return val.id !== id 
    })
    users = newUsers;
    return users;
}

const createRoom = (roomId, username, isOpen = true, newPlayer)=>{

    if (!rooms[roomId]) {
        rooms[roomId] = {}
        rooms[roomId].host = username;
        rooms[roomId].isOpen = isOpen;
        rooms[roomId].players = [];
    }
    addPlayerToRoom(newPlayer.id, newPlayer.username, newPlayer.room);
    // rooms[roomId].players.push(newPlayer)
    console.log("from create function",rooms[roomId]);
    return rooms[roomId];
}

const addPlayerToRoomIfNotInside = (roomId, user)=> {
    /** 
     * takes user as object and id string,
     * if is inside users array don't add if not then add and return the user object 
     */
    let status = true;
    for(let i = 0; i < rooms[roomId].players.length; i++){
        if(rooms[roomId].players[i].id === user.id){
            status = false;
            break;
        }
        status = true;
    }

    status? rooms[roomId].players.push(user): status;
    
    return user;
}

const addPlayerToRoom = (id, username,room)=>{
    /**
     * takes username string and room object and insert the player into the users array,
     * and returns list of users
     */
    const user = {id, username, room};
    addPlayerToRoomIfNotInside(room, user);
    return user;
}


const removePlayerFromRoom = (id, username, room)=>{
    /**
     * takes username string and room object return the final users list after deleting user
     */
    if(rooms[room]){
        let newUsers = rooms[room].players.filter((val,key)=>{
            console.log(key)
            return val.id !== id 
        })
        rooms[room].players = newUsers;
        return rooms[room].players;
    }
}


const removeRoomById = (roomId)=>{
    console.log("from remove function...", roomId, rooms[roomId])
    delete rooms[roomId];
}

const getRoomById = (roomId)=>{
    return rooms[roomId];
}

const getListOfRooms = ()=>{
    return rooms;
}
module.exports = {createPlayer, removePlayer, getListOfUsersByRoomId,
    getListOfRooms, createRoom, getRoomById,
    removeRoomById, removePlayerFromRoom, addPlayerToRoom};