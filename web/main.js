// iife
// immediately invoked function expression

const page = {
  init: function() {
    page
      .getStudents()
      .then(function(students) {
        page.addStudentsToPage(students.data);
      })
      .then(function() {
        page.initEvents();
      });
  },
  initEvents: function() {
    page.clickDetails();
    page.deleteStudentEvent();
    page.addNewStudent();
  },
  clickDetails: function() {
    document.addEventListener('click', function(event) {
      event.preventDefault();
      const data = event.target.dataset;
      // console.log(data.id);
      const isMoreDetail = event.target.classList.contains('detailLink');
      if (isMoreDetail) {
        page.getSingleStudent(data.id);
      }
    });
  },
  getSingleStudent: function(studentId) {
    return fetch(`http://localhost:8000/students/${studentId}`).then(function(
      student
    ) {
      return student.json();
    });
  },
  deleteStudentEvent: function() {
    const $deleteLinks = document.querySelectorAll('.deleteLink');
    // console.log('hello links', $deleteLinks);
    $deleteLinks.forEach(function(deleteLinkDom) {
      deleteLinkDom.addEventListener('click', function(event) {
        event.preventDefault();
        const data = event.target.dataset;
        const isDeleteLink = event.target.classList.contains('deleteLink');
        if (isDeleteLink) {
          page.deleteStudentFromApi(data.id);
        }
        // console.log(data.id);
      });
    });
  },
  deleteStudentFromApi: function(studentId) {
    return fetch(`http://localhost:8000/students/${studentId}`, {
      method: 'DELETE',
    })
      .then(function(res) {
        return res.json();
      })
      .then(res => {
        console.log(res.res);
      });
  },
  getStudents: function() {
    return fetch('http://localhost:8000/students')
      .then(function(students) {
        return students.json();
      })
      .catch(error => console.log('Error', error));
  },
  addStudentsToPage: function(students) {
    let html = '<ul>';
    students.forEach(function(student) {
      html += `<li>${page.singleStudentTemplate(student)}</li>`;
    });
    html += '</ul>';
    const $studentsList = document.querySelector('#studentsList');
    $studentsList.innerHTML = html;
  },
  addSingleStudentToPage: function(student) {
    const ul = document.querySelector('#studentsList > ul');
    const li = document.createElement('li');
    li.innerHTML = `${page.singleStudentTemplate(student)}`;
    ul.appendChild(li);
  },
  singleStudentTemplate: function(student) {
    return `<div data-id="${student._id}">
        <h3>${student.name}</h3>
        <img src="${student.photoUrl}">
        <p>${student.bio}</p>
        <a class="detailLink" href="#" data-id="${student._id}">More Details</a> 
        <a class="deleteLink" href="#" data-id="${student._id}">Delete student</a>
        </div>`;
  },
  addNewStudent: function(student) {
    document.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.id === 'submit' && name.value !== null) {
        const name = document.querySelector('#name');
        const age = document.querySelector('#age');
        const photoUrl = document.querySelector('#photoUrl');
        const bio = document.querySelector('#bio');

        return fetch('http://localhost:8000/students', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            name: name.value,
            age: age.value,
            photoUrl: photoUrl.value,
            bio: bio.value,
          }),
        })
          .then(res => {
            return res.json();
          })
          .then(res => {
            page.addSingleStudentToPage(res.newStudent);
          })
          .finally(() => {
            // clear input values
            document.querySelector('#name').value = '';
            document.querySelector('#age').value = '';
            document.querySelector('#photoUrl').value = '';
            document.querySelector('#bio').value = '';
          });
      } else {
        return;
      }
    });
  },
};
(function() {
  page.init();
})();
