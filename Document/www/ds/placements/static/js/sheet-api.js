const api="AIzaSyAvhJdsMNIXubo8y5Y-94RFTCCkjyTmvxM"
const base_url="https://sheets.googleapis.com/v4/spreadsheets/"

function student_faq(){
    load=document.getElementById("student-faq-load")
    // load.style.display="block";
    let faq_section=document.getElementById("student-faq");
    let doc_id="1xP6IhQAngGAcpffJhnG5ybDYrstj_NvcAbl7RVrSupQ";
    let sheet="Sheet1";
    fetch(base_url+doc_id+"/values/"+sheet+"?alt=json&key="+api, {
        method:'GET'
    })
    .then(res => res.json())
    .then(data => {
        vals=data.values;
        for (i in vals){
            new_faq=document.createElement("div");
            new_faq.className="accordion-item";
            render=`
                <h2 class="accordion-header" id="qstn${i+1}">
                <button class="accordion-button collapsed faq-q" type="button" data-bs-toggle="collapse" data-bs-target="#ans${i+1}" aria-expanded="false" aria-controls="collapseOne">
                    ${vals[i][0]}
                </button>
                </h2>
                <div id="ans${i+1}" class="accordion-collapse collapse" aria-labelledby="qstn${i+1}" data-bs-parent="#student-faq">
                <div class="accordion-body">
                    ${vals[i][1]}
                </div>
                </div>`;
            new_faq.innerHTML=render;
            faq_section.appendChild(new_faq);
        }
        load.style.display="none";
    });
}

function activities(){
    t_load=document.getElementById("training-loading")
    // load.style.display="block";
    let mytable=document.getElementById("activities");
    let table_head=mytable.getElementsByTagName("thead")[0]; 
    let table_body=mytable.getElementsByTagName("tbody")[0]
    let doc_id="13bZKnNf-bLv5jQP5aUt7W5hBV0ziU85Ds8yMjVK2o0M";
    let sheet="Sheet1!E3:G6";
    fetch(base_url+doc_id+"/values/"+sheet+"?alt=json&key="+api, {
        method:'GET'
    })
    .then(res => res.json())
    .then(data => {
        vals=data.values;
        headings=vals[0]
        table_head.innerHTML=`
        <tr>
            <th>${headings[0]}</th>
            <th>${headings[1]}</th>
            <th>${headings[2]}</th>
        </tr>`
        for (i=1;i<vals.length;i++){
            new_event=document.createElement("tr");
            render=`
                <td>${vals[i][0]}</td>
                <td>${vals[i][1]}</td>
                <td>${vals[i][2]}</td>`;
            new_event.innerHTML=render;
            table_body.appendChild(new_event);
        }
        t_load.style.display="none";
    });
}

function news_events(){
    n_load=document.getElementById("news-loading")
    // load.style.display="block";
    let news= document.getElementById("news-items")
    let doc_id="1QZsWLIPU1yGs0UEFtdHlgraOSpEdKDINJZPnHPJIiMA";
    let sheet="Sheet1!A:B";
    fetch(base_url+doc_id+"/values/"+sheet+"?alt=json&key="+api, {
        method:'GET'
    })
    .then(res => res.json())
    .then(data => {
        vals=data.values;
        for (i=1;i<vals.length;i++){
            let new_news= document.createElement("div")
            new_news.className="news-entry"
            new_news.innerHTML=`
            <b class="news-time">${vals[i][0]} : </b>
            <span class="news-content">${vals[i][1]} </span>`
            news.appendChild(new_news)
        }
        n_load.style.display="none";
    });
    
}

function highlights(){
    h_load=document.getElementById("highlight-loading")
    // load.style.display="block";
    let highlights= document.getElementById("highlights")
    let doc_id="1zMwBs1uL9qxNbkmpGl9QBDxqlv6THgGgw-P702jO1S8";
    let sheet="Sheet1!A:D";
    fetch(base_url+doc_id+"/values/"+sheet+"?alt=json&key="+api, {
        method:'GET'
    })
    .then(res => res.json())
    .then(data => {
        vals=data.values;
        for (i=1;i<vals.length;i++){
            let new_high= document.createElement("div")
            new_high.className="highlight-card"
            new_high.innerHTML=`
            <h3> ${vals[i][0]} </h3>
            <p class="email-id"> ${vals[i][1]} </p>
            <p class="project">${vals[i][2]}</p>
            <a class="simple-link" target="blank" href="${vals[i][3]}">View Presentation <i class='bx bx-link-external'></i></a>`
            highlights.appendChild(new_high)
        }
        h_load.style.display="none";
    });
    
}

