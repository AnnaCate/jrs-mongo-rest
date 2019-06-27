// iife
// immediately invoked function expression

const page = {
  init: () => {
    page
      .getStudents()
      .then(students => page.addStudentsToPage(students.data))
      .then(() => page.initEvents())
      .then(() => page.addNewStudent());
  },
  initEvents: () => {
    page.clickDetails();
    page.deleteStudentEvent();
  },
  clickDetails: () => {
    document.addEventListener('click', e => {
      e.preventDefault();
      const data = e.target.dataset;
      const isMoreDetail = e.target.classList.contains('detailLink');
      if (isMoreDetail) {
        page.getSingleStudent(data.id);
        page.createModal();
      }
    });
  },
  getSingleStudent: studentId => {
    return fetch(`http://localhost:8000/students/${studentId}`).then(student =>
      student.json()
    );
  },
  deleteStudentEvent: () => {
    const $deleteLinks = document.querySelectorAll('.deleteLink');
    $deleteLinks.forEach(deleteLinkDom => {
      deleteLinkDom.addEventListener('click', e => {
        e.preventDefault();
        const data = e.target.dataset;
        const isDeleteLink = e.target.classList.contains('deleteLink');
        if (isDeleteLink) {
          page.deleteStudentFromApi(data.id).then(res => {
            page.deleteSingleStudentFromPage(res.res);
          });
        }
      });
    });
  },
  deleteStudentFromApi: studentId => {
    return fetch(`http://localhost:8000/students/${studentId}`, {
      method: 'DELETE',
    }).then(res => {
      return res.json();
    });
  },
  deleteSingleStudentFromPage: studentId => {
    if (document.querySelector(`[data-id="${studentId}"]`)) {
      const studentDiv = document.querySelector(`[data-id="${studentId}"]`);
      const studentLi = studentDiv.parentNode;
      studentLi.parentNode.removeChild(studentLi);
    }
  },
  getStudents: () => {
    return fetch('http://localhost:8000/students')
      .then(students => students.json())
      .catch(err => console.error(`Error: ${err}`));
  },
  addStudentsToPage: students => {
    let html = '<ul>';
    students.forEach(student => {
      html += `<li id="studentLi">${page.singleStudentTemplate(student)}</li>`;
    });
    html += '</ul>';
    const $studentsList = document.querySelector('#studentsList');
    $studentsList.innerHTML = html;
  },
  addSingleStudentToPage: student => {
    const ul = document.querySelector('#studentsList > ul');
    const li = document.createElement('li');
    li.innerHTML = `${page.singleStudentTemplate(student)}`;
    ul.appendChild(li);
    page.initEvents();
  },
  singleStudentTemplate: student => {
    let photoUrl = '';
    if (student.photoUrl) {
      photoUrl = student.photoUrl;
    } else {
      photoUrl = 'http://lorempixel.com/188/188/people';
    }
    return `<div data-id="${student._id}">
        <h3>${student.name}</h3>
        <img src="${photoUrl}">
				<p>${student.bio}</p>
				<div id="container-links">
				<a class="detailLink" href="#" data-id="${student._id}">See details</a> 
				<a class="editLink" href="#" data-id="${student._id}">Edit</a>
        <a class="deleteLink" href="#" data-id="${student._id}">Delete</a>
				</div>
        </div>`;
  },
  addNewStudent: () => {
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
          .then(res => res.json())
          .then(res => page.addSingleStudentToPage(res.newStudent))
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
  createModal: () => {
    const main = document.querySelector('main');
    const modalContainer = document.createElement('section');
    modalContainer.classList.add('modal-container');
    main.appendChild(modalContainer);

    const modal = document.createElement('div');
    modal.classList.add('modal');
    modalContainer.appendChild(modal);

    // create info container
    const modalInfo = document.createElement('div');
    modalInfo.classList.add('modal-info-container');
    modal.appendChild(modalInfo);

    // get info that we'll need
    // const photo = activeEmployees[index].picture.large;
    // const name = makeProperCase(`
    //   ${activeEmployees[index].name.first} ${activeEmployees[index].name.last}`);
    // const email = activeEmployees[index].email;
    // const city = makeProperCase(activeEmployees[index].location.city);
    // const phone = activeEmployees[index].phone;
    // const address = makeProperCase(
    //   `${activeEmployees[index].location.street}, ${
    //     activeEmployees[index].location.city
    //   }, ${abbreviateState(activeEmployees[index].location.state)} ${
    //     activeEmployees[index].location.postcode
    //   }`
    // );
    // const dobFull = new Date(activeEmployees[index].dob.date);
    // const dob = `${("0" + dobFull.getDate()).slice(-2)}/${(
    //   "0" + dobFull.getMonth()
    // ).slice(-2)}/${dobFull.getYear()}`;

    // add info to DOM
    modalInfo.innerHTML = '<p>Hello</p>';
    // modalInfo.innerHTML = `<img class="modal-img"
    //   src=${photo} alt="profile picture">
    //   <h3 id="name" class="modal-name cap">${name}</h3>
    //   <p class="modal-text">${email}</p>
    //   <p class="modal-text cap">${city}</p>
    //   <hr>
    //   <p class="modal-text">${phone}</p>
    //   <p class="modal-text">${address}</p>
    //   <p class="modal-text">Birthday: ${dob}</p>
    // `;
  },
};

(() => page.init())();

// function to remove model
// const removeModal = () => {
//   body.removeChild(modalContainer);
// };

// create button
//   const btn = document.createElement("button");
//   btn.setAttribute("type", "button");
//   btn.setAttribute("id", "modal-close-btn");
//   btn.setAttribute("class", "modal-close-btn");
//   btn.innerHTML = "<strong>X</strong>";
//   modal.appendChild(btn);
//   btn.addEventListener("click", removeModal);
// }
