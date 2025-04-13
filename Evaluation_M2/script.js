function calculate(arr){
    //original
    let original = arr.reduce((sum,ele) =>sum + ele.baseSalary,0);
    console.log(`Original salary total: $${original}`);


    //performance and servise
    let update = arr.map(ele=>{

        let newsalary = ele.baseSalary;
        if(ele.yearsOfService > 3){
            newsalary *= 1.05;
        }

        return {...ele, baseSalary : newsalary};
    })

    update = update.map(ele => {
        let newsalary = ele.baseSalary;
        if(ele.performanceScore > 8){
            newsalary *=1.1;
        }
        return {...ele, baseSalary: newsalary};
    })

    let total1 = update.reduce((sum, ele)=>sum+ele.baseSalary, 0);
    console.log(`After service and performance bonuses: $${total1}`)

    //engineering
    update = update.map(ele =>{
        let newsalary = ele.baseSalary;
        if(ele.department == "Engineering"){
            newsalary *= 1.15;
        }
        return {...ele, baseSalary: newsalary}
    })

    let totatl2 = update.reduce((sum, ele) => sum+ele.baseSalary, 0);
    console.log(`After department adjustments: $${totatl2}`)

    //tax
    let final = Math.floor(totatl2*0.93);
    console.log(`Final salary after all calculations: $${final}`)



    
}





// Salary strategies:
// - 5% annual bonus for employees with 3+ years of service
// - 10% performance bonus for scores 8+
// - 15% extra for Engineering department
// - 7% tax deduction on total salary


// Original salary total: $21000.00
// After service and performance bonuses: $24600.00
// After department adjustments: $26400.00
// Final salary after all calculations: $24552.00



let Employees = [
    { name: "Alice", baseSalary: 5000, department: "Engineering", yearsOfService: 4, performanceScore: 8 },
    { name: "Bob", baseSalary: 4500, department: "Marketing", yearsOfService: 2, performanceScore: 7 },
    { name: "Charlie", baseSalary: 6000, department: "Engineering", yearsOfService: 7, performanceScore: 9 },
    { name: "Diana", baseSalary: 5500, department: "HR", yearsOfService: 3, performanceScore: 6 }
  ]

calculate(Employees);
