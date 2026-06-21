import Papa from 'https://cdn.jsdelivr.net/npm/papaparse@5.4.1/+esm';

// https://vanessuniq.github.io/reading_csv_file_with_javascript
export function extract_excel_data(e) {
    const file = new FormData(e.currentTarget).get('excel_file');

    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            complete: (results) => resolve(results.data),
            error: (err) => reject("Erreur lors du parsing :", err)
        });
    });
}