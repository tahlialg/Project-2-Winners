// this is the student id that the mentor clicked

const { Appointment } = require("../../models");

let studentSelectedId = null;

let elements = {
  // Calendar element
  calendar: document.getElementById("events-calendar"),
  // Input element
  events: document.getElementById("events"),
};

// Create the calendar
elements.calendar.className = "clean-theme";
let calendar = jsCalendar.new(elements.calendar);

// Create events elements
elements.title = document.createElement("div");
elements.title.className = "title";
elements.events.appendChild(elements.title);
elements.subtitle = document.createElement("div");
elements.subtitle.className = "subtitle";
elements.events.appendChild(elements.subtitle);
elements.list = document.createElement("div");
elements.list.className = "list";
elements.events.appendChild(elements.list);
elements.actions = document.createElement("div");
elements.actions.className = "action";
elements.events.appendChild(elements.actions);
elements.addButton = document.createElement("input");
elements.addButton.type = "button";
elements.addButton.value = "Book Session";
elements.actions.appendChild(elements.addButton);

let events = {};
let date_format = "DD/MM/YYYY";
let current = null;

let showEvents = function (date) {
  // Date string
  let id = jsCalendar.tools.dateToString(date, date_format, "en");
  // Set date
  current = new Date(date.getTime());
  // Set title
  elements.title.textContent = id;
  // Clear old events
  elements.list.innerHTML = "";
  // Add events on list
  if (events.hasOwnProperty(id) && events[id].length) {
    // Number of events
    elements.subtitle.textContent =
      events[id].length + " " + (events[id].length > 1 ? "events" : "event");

    let div;
    let close;
    // For each event
    for (let i = 0; i < events[id].length; i++) {
      div = document.createElement("div");
      div.className = "event-item";
      div.textContent = i + 1 + ". " + events[id][i].name;
      elements.list.appendChild(div);
      close = document.createElement("div");
      close.className = "close";
      close.textContent = "×";
      div.appendChild(close);
      close.addEventListener(
        "click",
        (function (date, index) {
          return function () {
            removeEvent(date, index);
          };
        })(date, i),
        false
      );
    }
  } else {
    elements.subtitle.textContent = "No events";
  }
};

let removeEvent = function (date, index) {
  // Date string
  let id = jsCalendar.tools.dateToString(date, date_format, "en");

  // If no events return
  if (!events.hasOwnProperty(id)) {
    return;
  }
  // If not found
  if (events[id].length <= index) {
    return;
  }

  // Remove event
  events[id].splice(index, 1);

  // Refresh events
  showEvents(current);

  // If no events uncheck date
  if (events[id].length === 0) {
    calendar.unselect(date);
  }
};

// Show current date events
showEvents(new Date());

let dateSelected = "";

// Add events
calendar.onDateClick(function (event, date) {
  // Update calendar date
  calendar.set(date);
  // Show events
  showEvents(date);
  dateSelected = date;
});

elements.addButton.addEventListener(
  "click",
  function () {
    // Get event name
    let names = [""];
    let name = prompt(
      "Event info",
      names[Math.floor(Math.random() * names.length)] + "Book Session."
    );

    //Return on cancel
    if (name === null || name === "") {
      return;
    }

    // Date string
    let id = jsCalendar.tools.dateToString(current, date_format, "en");

    // If no events, create list
    if (!events.hasOwnProperty(id)) {
      // Create list
      events[id] = [];
    }

    // If where were no events
    if (events[id].length === 0) {
      // Select date
      calendar.select(current);
    }

    // Add event
    events[id].push({ name: name });

    // Refresh events
    showEvents(current);

    // call api to make a new appt

    // 1. get the date [done]

    // 2. get the student info (student id) [done]

    // 3. get them mentor id [done]
    if (!dateSelected || !studentSelectedId) {
      console.error(" date not selected or student not selected");
      return;
    }

    fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date_time: dateSelected,
        student_id: studentSelectedId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload();
      });
  },
  false
);

function sessionBtn(event) {
  console.log(event);
  const button = event.target;
  studentSelectedId = button.getAttribute("data-student-id");

  const showCalender = document.getElementById("hide");

  showCalender.style.visibility = "visible";
}

setTimeout(() => {
  const sessionButtons = document.querySelectorAll(".sessionBtn");
  console.log(sessionButtons);
  sessionButtons.forEach((button) =>
    button.addEventListener("click", sessionBtn)
  );
}, 1500);

function closeBtn() {
  const closeCalender = document.getElementById("hide");
  closeCalender.style.visibility = "hidden";
}

//delete appointment fetch
function deleteAppointment(){

  fetch("/api/appointments/" + Appointment.id , {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      location.reload();
    });
}

//onclick get the id from the appointment itself, maybe set data value to appintment id then run delete appointment
