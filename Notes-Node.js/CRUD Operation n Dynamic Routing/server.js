//install express
//import

const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json());

//test route
app.get("/test", (req, res) => {
  res.json({ msg: "This is test route" });
});

//get Route that read all the courses
app.get("/all-courses", (req, res) => {
  //read the db.json file
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  // console.log(data.courses);
  let courses = data.courses;
  res.json({ msg: "List of the course", courses });
});

app.post("/add-courses", (req, res) => {
  let newCourses = req.body;
  // console.log(newCourses);
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let courses = data.courses;

  let id = courses[courses.length - 1].id;

  newCourses = { ...newCourses, id };
  // console.log(id);

  courses.push(newCourses);
  //update in the db as well
  fs.writeFileSync("./db.json", JSON.stringify(data));
  res.json({ msg: "New Courses Added" });
});

//Update

app.put("/update-course/:id", (req, res) => {
  let id = req.params.id;
  // console.log(id);

  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let courses = data.courses;

  //check whether the id is present or not
  let index = courses.forEach((course) => {
    course.id == id;
    if (index == -1) {
      res.json({ msg: "Course Not Found" });
    } else {
      res.json({ msd: "Course Updated" });
    }
  });
  console.log(index);
});

app.listen(3000, () => {
  console.log("SErver is running onn 3000 port");
});
