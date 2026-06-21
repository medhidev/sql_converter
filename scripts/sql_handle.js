export let TABLE;
export let CONTENT;

function get_field_type(data) {
    return '';
}

// Gestion oracle21c wip
function create_table(tablename, data, sgbd) {
    let table = `CREATE TABLE ${tablename}`; // default
    if (['postgres', 'mysql', 'mariadb', 'sqlite', 'oracle23c'].includes(sgbd)) {
        table = `CREATE TABLE IF NOT EXISTS ${tablename} `;
    } else if (sgdb === 'sqlserver') {
        table = `
        IF OBJECT_ID('dbo.${tablename}', 'U') IS NULL\n
        BEGIN\n
            CREATE TABLE dbo.${tablename} (\n
        END;\n`.trim();
    }

    table += get_field_type(data);

    return table;
}

export function generate_sql(table, data, sgbd, is_create) {

    const sql_area = document.getElementById('sql_area');
    const columns = Object.keys(data[0]);
    let request = is_create ? create_table(table, data, sgbd) : '' ;
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

    request += `\n\nINSERT INTO ${table} VALUES\n${rows}`;
    sql_area.textContent = request;
    download_btn.hidden = false;

    TABLE = table;
    CONTENT = request;
}


// https://stackoverflow.com/questions/13405129/create-and-save-a-file-with-javascript
export function download_sql_file(filename, content) {
    const file = new File([content], `${filename}.sql`, {type: "text/plain"});
    const url = URL.createObjectURL(file);

    // Simulation d'un lien dans le DOM 
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.sql`;
    a.click();
    URL.revokeObjectURL(url); // garbage collector
}