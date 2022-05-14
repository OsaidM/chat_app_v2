//////////////////////////////////////////////////////////////////////////
///  Utils file contains connected users information through session   ///
//////////////////////////////////////////////////////////////////////////

///////////////
// constants //
///////////////
let users = [];

const isNotInside = (user, username)=> {
    /** 
     * takes user as object and username string,
     * if is inside users array don't add if not then add and return the user object 
     */
    let status = true;
    for(let i = 0; i < users.length; i++){
        if(users[i].username === username){
            status = false;
            break;
        }
        status = true;
    }

    status? users.push(user) : status;
    return user;
}

const createPlayer = (username,room)=>{
    /**
     * takes username string and room object and insert the player into the users array,
     * and returns list of users
     */
    const user = {username, room};
    isNotInside(user, username);
    return users;
}

const getListOfUsers = ()=>{
    return users
}

const removePlayer = (username,room)=>{
    /**
     * takes username string and room object return the final users list after deleting user
     */
    let newUsers = users.filter((val,key)=>{
        console.log(key)
        return val.username !== username && val.room !== room
    })
    users = newUsers;
    return users;
}

module.exports = {createPlayer, removePlayer, getListOfUsers};