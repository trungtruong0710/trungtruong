import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Hàm để lấy đường dẫn hiện tại
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Đường dẫn đến file CSV
const logFilePath = path.join(__dirname, 'test-report.csv');

// Hàm ghi tên cột vào CSV nếu chưa tồn tại
const ensureCSVHeaders = () => {
    if (!fs.existsSync(logFilePath)) {
        const headers = 'ID,Test Running Time,Test Name,Status,Error Log\n';
        fs.writeFileSync(logFilePath, headers);
    }
}

// Hàm ghi kết quả vào CSV
export const logResultsToCSV = (fileName: string, testName: string, status: string, errorMessage: string = '') => {
    ensureCSVHeaders();
    const logMessage = `${fileName},${new Date().toISOString()},${testName},${status},${status},"${errorMessage}"\n`;
    fs.appendFileSync(logFilePath, logMessage);
}