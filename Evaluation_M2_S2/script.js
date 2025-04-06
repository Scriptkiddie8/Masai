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
            if(!student.subjects[subject]){
                student.subjects[subject] = null; 
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
            if(!student.subjects[subject]){
                console.log(` ${subject} subject not present`);
            }
            else{
                student.subjects[subject] = score;
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

    }

}

let add = createStudentManager();
add.addStudent("1", "Kartik");
console.log(add.student);