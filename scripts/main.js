// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

import * as excel from './excel.js';
import * as sql from './sql_handle.js';

// ****************** COMPONENTS **********************

const form = document.querySelector("form");
// const drop_area = document.querySelector(".drop-zone");
const create_table_check = document.getElementById('checkmark_field');
const sgbd_list = document.getElementById('sgbd');
const sql_generate_btn = document.getElementById('sql_generate_btn');
const download_btn = document.getElementById('download_btn');

let table_field = document.getElementById("table_name");

// ****************** EVENTS **********************

form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = await excel.extract_excel_data(e);
    const table = table_field.value;
    const sgbd = sgbd_list.value;
    console.log(create_table_check.checked);
    sql.generate_sql(table, data, sgbd, create_table_check.checked);
});

download_btn.addEventListener('click', () => {
    sql.download_sql_file(sql.TABLE, sql.CONTENT);
});


