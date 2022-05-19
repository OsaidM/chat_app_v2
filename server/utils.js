//////////////////////////////////////////////////////////////////////////
///  Utils file contains connected users information through session   ///
//////////////////////////////////////////////////////////////////////////

///////////////
// constants //
///////////////
let users = [];

const isNotInside = (user, id)=> {
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
    isNotInside(user, id);
    return users;
}

const getListOfUsers = ()=>{
    return users
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

module.exports = {createPlayer, removePlayer, getListOfUsers};