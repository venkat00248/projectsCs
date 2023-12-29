import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';

export const handleDownload = (format: string, data: any[]) => {
    if(format !== undefined) {
      const formattedData = data.map(({ ...rest }) => ({ ...rest }));
      const fileType =
        format === 'xls'
          ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          : 'text/csv';
      const fileExtension = format === 'xls' ? 'xlsx' : 'csv';
      const fileName = `data.${fileExtension}`;
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const fileData = XLSX.write(workbook, {
        bookType: fileExtension,
        type: 'array',
      });
      const blob = new Blob([fileData], { type: fileType });
      saveAs(blob, fileName);
    }
};
