function traverse(user){

    for(let key in user){
        console.log(key + ":" + " " + user[key])
    }

}


let book = { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 };

traverse(book);