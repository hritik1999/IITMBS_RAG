const apiKey = "AIzaSyBooYHYxSM6QB4i7m-BjHZfPD_-3J2zmTE";
let pastData = [];
let upcomingData = [];
const academicEventsSheetID = '1Ug2-O0zqF-bMIK_Y_sIk3DxyjnhPE1YhcYMm1m7Xbfo';
const studentActivityEventsSheetID = '17gUQaZGSJS-rV9vXjIXR4XQKNUfXnTC7Z73K5H8gfMg';
const workshopsEventSheetID = '1UyXVvOKU5-AeBc_he7EXVSlFyLT0g2TWzUPL54uUu0k';
const othersEventSheetID = '1eaFzcK0DBbIthlJOSPSQ3GMTj7K3XKFoaSJPDqA6oAQ';

eventsPage(academicEventsSheetID);

showData = (pageName,) => {
    switch (pageName) {
        case 'academicEvents':
            pastData.length = 0;
            upcomingData.length = 0
            eventsPage(academicEventsSheetID)
            // document.getElementById('academicEventBtn').classList.toggle('tabBtn-secondary')
            document.querySelectorAll('.tabBtn').forEach((el) => {el.classList.remove('btn-primary');el.classList.add('btn-light')})
            document.getElementById('academicEventBtn').classList.remove('btn-light')
            document.getElementById('academicEventBtn').classList.add('btn-primary')
            break;
        case 'studentActivityEvents':
            pastData.length = 0;
            upcomingData.length = 0
            eventsPage(studentActivityEventsSheetID)
            document.querySelectorAll('.tabBtn').forEach((el) => {el.classList.remove('btn-primary');el.classList.add('btn-light')})
            document.getElementById('stuActEventBtn').classList.remove('btn-light')
            document.getElementById('stuActEventBtn').classList.add('btn-primary')
            break;
        case 'workshops':
            pastData.length = 0;
            upcomingData.length = 0
            eventsPage(workshopsEventSheetID)
            document.querySelectorAll('.tabBtn').forEach((el) => {el.classList.remove('btn-primary');el.classList.add('btn-light')})
            document.getElementById('workshopsBtn').classList.remove('btn-light')
            document.getElementById('workshopsBtn').classList.add('btn-primary')
            break;
        case 'others':
            pastData.length = 0;
            upcomingData.length = 0
            eventsPage(othersEventSheetID)
            document.querySelectorAll('.tabBtn').forEach((el) => {el.classList.remove('btn-primary');el.classList.add('btn-light')})
            document.getElementById('othersBtn').classList.remove('btn-light')
            document.getElementById('othersBtn').classList.add('btn-primary')
            break;
        default:
            break;
    }
}

function eventsPage(sheetId) {
    // let sheetOneId = "1m3T80A_RkR1yab0Hadkbg7CJhB47BwhXahhNLaOECDQ";
    //  let sheetOneId = "1Ug2-O0zqF-bMIK_Y_sIk3DxyjnhPE1YhcYMm1m7Xbfo"; 
    document.getElementById("past_events").innerHTML = "";
    document.getElementById("upcoming_events").innerHTML = "";
    document.getElementById("loadUpcoming").classList.add("d-none");

    let urlOne =
        "https://sheets.googleapis.com/v4/spreadsheets/" +
        sheetId +
        "/values/" +
        "Upcoming" +
        "?alt=json&key=" +
        apiKey;

    $.getJSON(urlOne, function (data) {
        upcomingData = data.values ? data.values : [];
        if (upcomingData.length <= 0) {
            document.getElementById("upcoming_events").innerHTML = "- No upcoming events at the moment.";
            return;
        }
        if (upcomingData.length > 7) {
            document.getElementById("loadUpcoming").classList.remove("d-none");
        }
        loadData("upcoming_events");
    });

    // let sheetTwoId = "1cFkaPiBUSspr-9eRFXekYp3QhwKgcpjfkcxViSPpc3Y";
    let urlTwo =
        "https://sheets.googleapis.com/v4/spreadsheets/" +
        sheetId +
        "/values/" +
        "Past" +
        "?alt=json&key=" +
        apiKey;
    $.getJSON(urlTwo, function (data) {
        pastData = data.values ? data.values : [];
        if (pastData.length <= 0) {
            document.getElementById("past_events").innerHTML = "- No Past Events Available";
            return;
        }

        if (pastData.length > 7) {
            document.getElementById("loadPast").classList.remove("d-none");
        }

        loadData("past_events");
    });
}

let startIndex = 0;
let endIndex = 7;
loadData = (id, clicked) => {
    let data = [];

    if (id == "past_events") {
        data = pastData;
    } else if (id == "upcoming_events") {
        data = upcomingData;
    }

    if (data.length > 7 && clicked) {
        startIndex = startIndex + 8;
        endIndex = endIndex + 8;
    } else if (clicked) {
        return;
    }

    for (let i = startIndex; i <= endIndex; i++) {
        if (!data[i] || data[i].length == 0) {
            continue;
        }
        let date = data[i][0];
        let event = data[i][1];
        let presenter = data[i][2];
        let video = data[i][3];
        let link = data[i][4];
        let image = data[i][5];

        let html = ''
        if (video) {
            html = `
                <div class="mb-5 bg-light row" style="height: auto;">
                    <div class="col-12 col-md-6 p-5">
                        <p class="text-dark">${date}</p>
                        <p class="h4 text-dark">${event}</p>
                        <p class="text-dark font-weight-600">${presenter}</p>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="videoContainer">
                            <div class="landingVideoCourse">
                                <iframe width="560" height="315" src="${video}" frameborder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>`;
        }
        else if (link) {
            html = `
                <div class="mb-5 bg-light row" style="height: auto; justify-content:space-between">
                    <div class="col-12 col-md-10 px-5 py-2">
                        <p class="text-dark">${date}</p>
                        <p class="h4 text-dark">${event}</p>
                        <p class="text-dark font-weight-600">${presenter}</p>
                    </div>
                    <div style="width:fit-content;margin-block:auto;">
                      <a href="${link}" target="_blank" style="margin-right:3rem" >Event Link <i class="fa fa-external-link"></i></a>
                    </div>
                </div>`;
        } else if (image) {
            html = `
                <div class="mb-5 bg-light row" style="height: auto; justify-content:space-between">
                    <div class="col-12 col-md-10 px-5 py-2">
                        <p class="text-dark">${date}</p>
                        <p class="h4 text-dark">${event}</p>
                        <p class="text-dark font-weight-600">${presenter}</p>
                    </div>
                    <div style="width:fit-content;margin-block:auto;">
                        <span onclick="showGallery('${image}','${event}')" data-toggle="modal" data-target=".bd-example-modal-lg" style="margin-right:3rem" class="event-link" >Event Link <i class="fa fa-external-link"></i></span>
                    </div>
                </div>`;
        }
        document.getElementById(id).insertAdjacentHTML("beforeend", html);
    }

    if (
        data.length > 7 &&
        document.getElementById(id).childElementCount == data.length - 1
    ) {
        document.getElementById("loadPast").classList.add("d-none");
    }
};

showGallery = (imgListString, event) => {

    document.getElementById('modal-title').innerHTML = event;

    let idArray = [];
    idArray = imgListString.split(',');
    const galel = document.getElementById('gallery');
    galel.innerHTML='';

    for (let index = 0; index < idArray.length; index++) {
        const element = idArray[index];
        galel.insertAdjacentHTML("beforeend", `<img src="https://drive.google.com/uc?id=${element}" alt="picture of the event" class="col-md-4 mb-4">`);  
    }
}
