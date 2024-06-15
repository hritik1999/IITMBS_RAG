///////////////////  Chart Data :: DO NOT TOUCH

const expec_term_data = {
    labels: [
        "Aug 2022",
        "Dec 2022",
        "Apr 2023",
        "Aug 2023"
    ],
    datasets: [{
        label: "Expected term of completion of both diplomas",
        data: [196,345,73,41],
        backgroundColor: 'rgb(208,0,0)'
    }]
}

const field_data = {
    labels: [
        "Engineering/Technology",
        "Arts/Science/Commerce",
        "Management",
        "Computer Application",
        "Others"
    ],
    datasets: [{
        label: "Educational background of learners",
        data: [69.0,25.6,1.5,0.2,3.7],
        backgroundColor: [
            'rgb(208, 0, 0)',
            'rgb(255, 183, 0)',
            'rgb(74, 146, 70)',
            'rgb(123, 123, 123)',
            'rgb(74, 146, 70)'
        ],
    }]
}


const cgpa = {
    labels: [
        "< 7",
        "7-8",
        "8-9",
        "9-10"
    ],
    datasets: [{
        label: "Percentage of learners with CGPA in range",
        data: [3.4,21.8,45.8,29],
        backgroundColor: "rgb(208, 0, 0)",
    }]
}

const age = {
    labels: [
        "< 21",
        "21-30",
        "31-40",
        "41-50"
    ],
    datasets: [{
        label: "Number of learners in age-group",
        data: [373, 243, 35, 6],
        backgroundColor: "#f5ab00"
    }]
}

const wps = {
    labels: [
        "Students",
        "Working Professionals"
    ],
    datasets: [{
        label: "Learners in this category",
        data: [560,101],
        backgroundColor: ["rgb(208, 0, 0)","#f5ab00"]
    }]
}

const wps_chart = new Chart(
    document.getElementById("wps"),
    {
        type: 'pie',
        data: wps,
        options:{responsive: true}
    }
)

const age_chart = new Chart(
    document.getElementById('age'),
    {
        type: 'bar',
        data: age,
        options :{responsive: true}
    }
)

const cgpa_chart = new Chart(
    document.getElementById("cgpa"),
    {
        type: 'bar',
        data: cgpa,
        options: {responsive: true}   
    }
)


const expec_term_chart = new Chart(
    document.getElementById("expec-term"),
    {
        type: 'bar',
        data: expec_term_data,
        options: {responsive: true},
    }
);

const fields_chart = new Chart(
    document.getElementById("field"),
    {
        type: 'pie',
        data: field_data,
        options: {responsive: true}
    }
);