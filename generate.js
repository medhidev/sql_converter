// window.addEventListener("DOMContentLoaded", () => {
//     sql_button = document.getElementById('sql_generate_btn');
//     download = document.getElementById('download_btn');

//     sql_button.addEventListener('submit', (event) => {
//         console.log('envoie formulaire');
//         extract_excel_data(event);
//         generateSQL();
//     });
// });

const form = document.querySelector("form");
const sql_button = document.getElementById('sql_generate_btn');
const download = document.getElementById('download_btn');

form.addEventListener("submit", async e => {
    e.preventDefault();
    console.log('execution formulaire');

    const data = await extract_excel_data(e);
    const table = document.getElementById('table_name').value;

    generateSQL(table, data);
});

// https://vanessuniq.github.io/reading_csv_file_with_javascript
function extract_excel_data(e) {
    console.log('extraction excel');
    const file = new FormData(e.currentTarget).get('excel_file');

    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                resolve(results.data);
            },
            error: (err) => reject("Erreur lors du parsing :", err)
        });
    });
}

function generateSQL(table, data) {
    sql_area = document.getElementById('sql_area');
    console.log(data);
    rows = '';

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach#examples
    for (let i = 0; i < data.length; i++) {
        rows += '(';
        data[i].forEach((value, key, map) => {
            rows += `${value}`;
        });

        rows += ')';
    }

    sql_area.textContent = `
    INSERT INTO ${table} VALUES ${rows}
    `;
    download.hidden = false;
}
