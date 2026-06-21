const form = document.querySelector("form");
const sql_button = document.getElementById('sql_generate_btn');
const download = document.getElementById('download_btn');

var table_global = '';
var content_global = '';

// ****************** EVENTS **********************

form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = await extract_excel_data(e);
    const table = document.getElementById('table_name').value;
    generateSQL(table, data);
});

download.addEventListener('click', () => {
    download_sql_file(table_global, content_global);
});

// ****************** METHODES **********************

// https://vanessuniq.github.io/reading_csv_file_with_javascript
function extract_excel_data(e) {
    const file = new FormData(e.currentTarget).get('excel_file');

    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            complete: (results) => resolve(results.data),
            error: (err) => reject("Erreur lors du parsing :", err)
        });
    });
}

function generateSQL(table, data) {
    const sql_area = document.getElementById('sql_area');
    const columns = Object.keys(data[0]);
    let rows = '';

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach#examples
    data.forEach((d, index) => {
        rows += '(';
        for (let i = 0; i < columns.length; i++) {
            rows += `${d[columns[i]]}`;
            if (i != columns.length-1) { rows += ','; }
        }
        rows += (index != data.length-1) ? '),\n' : ');';
    });

    const request = `INSERT INTO ${table} VALUES\n${rows}`;
    sql_area.textContent = request;
    download.hidden = false;

    table_global = table;
    content_global = request;
}

// https://stackoverflow.com/questions/13405129/create-and-save-a-file-with-javascript
function download_sql_file(filename, content) {
    const file = new Blob([content], {type: "sql"});
    window.open(URL.createObjectURL(file));
}
