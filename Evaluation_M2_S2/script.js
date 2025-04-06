function createStudentManager(){

    let student = {};

    return{
    addStudent: function(id, name){
        if(!student[id]){
            student[id] = {
                id,
                name,
                subjects : {},
            };
            return student[id];
        }
        else{
            console.log(`Student with ${id} already presnt`);
        }
    },

    addSubject: function(id, subject){
        if(!student[id]){
            console.log(`Student with ${id} not found`)
        }
        else{
            if(!(subject in student[id].subjects)){
                student[id].subjects[subject] = null; 
            }
            else{
                console.log(`${subject} subject already present`);
            }
        }
    },

    updateScore: function(id, subject, score){
        if(!student[id]){
            console.log(`Student with ${id} not found`)
        }
        else{
            if(!(subject in student[id].subjects)){
                console.log(` ${subject} subject not present`);
            }
            else{
                student[id].subjects[subject] = score;
            }
        }
    },

    getStudentDetails: function(id){
        if(!student[id]){
            console.log(`Student with ${id} not found`)
        }
        else{
            return student;
        }
    },

    averageMarks: function(id){
        if(!(subject in student[id].subjects)){
            console.log(`Had no subjects to calculate`)
        }
        else{
            let marks =  Object.values(student[id].subjects);
            let total_marks = marks.reduce((acc, curr)=>{acc+curr}, 0);
            let avg = total_marks/marks.length;
            console.log(`Average marks are ${avg}`);
        }
    }

    }

}


let add = createStudentManager();
let student1 = add.addStudent("1", "Kartik");
add.addSubject("1", "JavaScript")
add.addSubject("1", "C++")
add.addSubject("1", "DSA")
add.updateScore("1", "JavaScript", 99)
add.updateScore("1", "C++", 100)
add.updateScore("1", "DSA", 100)
console.log(student1);

let student2 = add.addStudent("2", "Jack");
add.addSubject("2", "JavaScript")
add.addSubject("2", "C++")
add.addSubject("2", "DSA")
add.updateScore("2", "JavaScript", 30)
add.updateScore("2", "C++", 19)
add.updateScore("2", "DSA", 55)
console.log(student2);



let student3 = add.addStudent("3", "Richard");
add.addSubject("3", "JavaScript")
add.addSubject("3", "C++")
add.addSubject("3", "DSA")
add.updateScore("3", "JavaScript", 78)
add.updateScore("3", "C++", 23)
add.updateScore("3", "DSA", 88)
console.log(student3);


console.log(student1.averageMarks)