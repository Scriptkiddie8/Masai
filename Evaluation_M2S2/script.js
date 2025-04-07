function createStudentManager(){

    let student = {};

    return {
        addstudent(id, name){
            if(!student[id]){
                student[id] = {
                    id,
                    name,
                    subjects : {},
                    avg_marks : null,
                }
                return student[id];
            }
            else{
                console.log(`Student with ${id} already exist`);
            }
        },

        addsubject(id, subject){
            if(!student[id]){
                console.log(`student with ID:${id}  does not exist`)
            }
            if(subject in student[id].subjects){
                console.log(`${subject} is already added`)
            }
            else{
                student[id].subjects[subject] = null
            }
        },

        updatescore(id, subject, score){
            if(!student[id]){
                console.log(`student with ID:${id}  does not exist`)
            }
            if(!(subject in student[id].subjects)){
                console.log(`${subject} not found`)
            }
            else{
                student[id].subjects[subject] = score
            }

        },

        getstudentdetail(id){
            if(!student[id]){
                console.log(`Student with ID:${id} does not exist`)
            }
            else{
                return student[id];
            }
        },

        getaveragemarks(id){
            if(!student[id]){
                console.log(`Student with ID:${id} does not exist`)
            }
            else{
                let marks = Object.values(student[id].subjects)
                let total = marks.reduce((acc, curr)=>acc+=curr, 0)
                let avg = total/Object.keys(student[id].subjects).length
                student[id].avg_marks = avg;
            }
        },

        gettopstudent(){
            let max = -Infinity;
            let topid = null;
            for(let id in student){
                if(student[id].avg_marks !=null && student[id].avg_marks > max){
                    max = student[id].avg_marks;
                    topid = student[id];
                }
            }
            console.log(`${topid.name} is topper with avg score of ${max}`)
            
        },

        getdifficultsubject(){
            let difficult = {};
                for(let id in student){
                    for(let subject in student[id].subjects){
                        let marks = Object.values(student[id].subjects[subject]);
                        if(marks<40){
                            if(difficult[subject]){
                                difficult[subject]++;
                            }
                            else{
                                difficult[subject] = 1;
                            }
                        }
                    }
                }
                let half = Object.keys(student).length/2;
                for(let subject in difficult){
                    let value = Object.values(difficult[subject])
                    if(value > half){
                        console.log(`${difficult[subject]} is difficult`)
                    }
                }
        },

        getfailedstudent(){
            for(let id in student){
                for(let subject in student[id].subjects){
                    let marks = Object.values(student[id].subjects[subject]);
                    if(marks<35){
                        console.log(`${student[id].name} is failed in ${subject}`)
                        break;
                    }
                }
            }
        },

        enrolledsubjects(){
            let frequency = {};
            for(let id in student){
                for(let subject in student[id].subjects){
                    if(frequency[subject]){
                        frequency[subject]++;
                    }
                    else{
                        frequency[subject] = 1;
                    }
                }
            }
            console.log(frequency)
        }

    }
   
}

let config = createStudentManager();

config.addstudent(1, "Kartik");
config.addsubject(1, "Math");
config.addsubject(1, "English");
config.updatescore(1, "English", 100)
config.updatescore(1, "Math", 29)
config.getaveragemarks(1)
let student1 = config.getstudentdetail(1)
console.log(student1)
config.gettopstudent()
config.getfailedstudent()
config.getdifficultsubject()
config.enrolledsubjects()

