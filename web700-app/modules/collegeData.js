const fs = require('fs');
const path = require('path');

// Class to hold the students and courses data
class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

// Declaring the variable dataCollection as null
let dataCollection = null;

// This function is to initialize and load the JSON data
function initialize() {
  return new Promise((resolve, reject) => {
    // Read students.json file
    fs.readFile(path.join(__dirname, '../data/students.json'), 'utf8', (err, studentData) => {
      if (err) { // if error found in loading the file catch it 
        reject("unable to read students.json");
        return;
      }
      // Read courses.json file
      fs.readFile(path.join(__dirname, '../data/courses.json'), 'utf8', (err, courseData) => {
        if (err) { // catch error if found
          reject("unable to read courses.json");
          return;
        }
        // Parse the JSON data and create a new Data instance
        dataCollection = new Data(JSON.parse(studentData), JSON.parse(courseData));
        resolve();
      });
    });
  });
}

// Function to get all students
function getAllStudents() {
  return new Promise((resolve, reject) => {
    if (dataCollection.students.length > 0) { // iterates through the student array to check if list is empty
      resolve(dataCollection.students); // resolves the promise if students are found
    } else {
      reject("no results returned");
    }
  });
}

// Function to get all TAs
function getTAs() {
  return new Promise((resolve, reject) => {
    const tas = dataCollection.students.filter(student => student.TA); //Filters through the students array to find those who are TAs.
    if (tas.length > 0) { //checks if any ta is found in the list 
      resolve(tas); //resolves the promise if tas are found
    } else {
      reject("no results returned"); // if no ta found output 'no results returned.
    }
  });
}

// Function to get all courses
function getCourses() {
  return new Promise((resolve, reject) => {
    if (dataCollection.courses.length > 0) { // iterates through the student array to check if list is empty
      resolve(dataCollection.courses); // resolves the promise if courses are found
    } else {
      reject("no results returned");
    }
  });
}

// Function to get students by course
function getStudentsByCourse(course) {
  return new Promise((resolve, reject) => {
      const courseStudents = students.filter(student => student.course === course);
      if (courseStudents.length === 0) {
          reject("no results returned"); // Rejecting promise if there are no student found for the specified course id
          return;
      }
      resolve(courseStudents); // Resolving the promise with filtered students for the course id
  });
}

// Function to get a student by student number
function getStudentByNum(num) {
  return new Promise((resolve, reject) => {
      const student = students.find(student => student.studentNum === num);
      if (!student) {
          reject("no results returned"); // Rejecting promise if no students found
          return;
      }
      resolve(student);// Resolving the promise with found student
  });
}



// Export the functions
module.exports = { initialize, getAllStudents, getTAs, getCourses, getStudentsByCourse, getStudentByNum };