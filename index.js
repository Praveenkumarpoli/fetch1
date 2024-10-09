const URL = "https://fakestoreapi.com/products";

function fetchData() {
    fetch(URL)
        .then(response => response.json())
        .then(data => createTable(data));
}

function createTable(arr) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    thead.appendChild(trHead);
    const theadData = ["id", "title", "price", "description", "category", "image", "rating", "action"];
    for (let data of theadData) {
        const th = document.createElement("th");
        th.innerText = data;
        trHead.appendChild(th);
    }

    const tbody = document.createElement("tbody");
    arr.forEach((obj) => {
        const tr = document.createElement("tr");
        for (let key in obj) {
            const td = document.createElement("td");
            if (key === 'image') {
                const img = document.createElement("img");
                img.setAttribute("src", obj[key]);
                td.appendChild(img);
            } else if (key === "rating") {
                td.innerText = `${obj[key].rate} (${obj[key].count})`;
            } else {
                td.innerText = obj[key];
            }
            tr.appendChild(td);
        }

        // Create delete button
        const tdDelete = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.onclick = function () {
            tr.classList.add('shake');
            setTimeout(() => {
                tr.classList.add('slide-up');
                tr.classList.add('fade-out');
                setTimeout(() => {
                    tbody.removeChild(tr);
                    updateIds(tbody);
                }, 500); 
            }, 500);
        };
        tdDelete.appendChild(deleteButton);
        tr.appendChild(tdDelete);

        tbody.appendChild(tr);
    });

    table.append(thead, tbody);
    document.body.appendChild(table);
}

function updateIds(tbody) {
    const rows = tbody.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        const idCell = rows[i].cells[0];
        idCell.innerText = i + 1;
    }
}

fetchData();