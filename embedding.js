const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourse(courseId){
  const course = await Course.findByIdAndUpdate({ _id: courseId }, {
    $set: {
      'author': 'Wafula'
    }
  });
}

async function addAuthor(courseId, author){
  const course = await Course.findById(courseId);
  course.authors.push(author);
  console.log(await course.save());
}

async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  var theAuthor = course.authors.id(authorId);
  theAuthor.remove();
  console.log(await course.save());
}

removeAuthor('616da1ea877585b0d1592968', '616da1ea877585b0d1592966');
//  addAuthor('616da1ea877585b0d1592968', new Author({ name: 'Allan' }))
// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'Josh' })
// ]); 
// updateCourse('5b8d857af88923ade835645c');
