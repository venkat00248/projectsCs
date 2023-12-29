import "./APIMetaData.scss";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { saveAs } from 'file-saver';
import htmlDocx from 'html-docx-js/dist/html-docx';
export default function APIMetaData({ item }: any) {

  const data = JSON.parse(sessionStorage.userDetails);
      const fullname = data.fullname;
  const downloadData = () => {
    const tableStyles = `
      <style>
      body {
       font-size: 1rem;
       font-weight: 400;
       line-height: 1.45;
       font-family: Roboto,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif !important;
   }
        table {
          border-collapse: collapse;
          width: 100%;
        }
  
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
        }
  
        th {
          background-color: #f2f2f2;
        }
  
        .ResponseWrapper {
          margin-top: 20px;
        }
        h3{
          text-align:center;
        }
        .ResponseWrapper{
          margin: 20px 0px;
      }
      </style>
    `;
  
    const tableContent = `
      ${tableStyles}
      <h3>API Document</h3>
      <h5>createdAt :  ${item.createdAt}</h5>
      <h5>createdBy :  ${fullname}</h5>
      <table>
        <tr>
          <td>API URL</td>
          <td>${item.url}</td>
        </tr>
        <tr>
          <td>Method</td>
          <td>${item.method}</td>
        </tr>
        <tr>
          <td>Parameter Name</td>
          <td>${item.url}</td>
        </tr>
        <tr>
          <td>Header Key</td>
          <td>${item.url}</td>
        </tr>
        <tr>
          <td>Header Value</td>
          <td>${item.url}</td>
        </tr>
        <tr>
          <td>Data Params</td>
          <td>${item.url}</td>
        </tr>
      </table>
      <div class="ResponseWrapper">
      <h4>Response codes</h4>
      </div>
      <table>
      <tr>
          <th>Response Code</th>
          <th>Response Message</th>
        </tr>
        <tr>
          <td>200</td>
          <td>Success</td>
        </tr>
        <tr>
          <td>400</td>
          <td>Bad Request</td>
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
        </tr>
        <tr>
          <td>403</td>
          <td>Forbidden Access</td>
        </tr>
        <tr>
          <td>404</td>
          <td>Function Not Available</td>
        </tr>
        <tr>
          <td>401</td>
          <td>Authentication Failure</td>
        </tr>
      </table>
    `;
    const converted = htmlDocx.asBlob(tableContent);

    // Save the document
    saveAs(converted, 'APIMetaData.docx');


    // Create a Blob containing the HTML content for download html file
    // const blob = new Blob([`<html><head>${tableStyles}</head><body>${tableContent}</body></html>`], { type: 'text/html' });
  
    // // Create a download link
    // const downloadLink = document.createElement('a');
    // downloadLink.href = URL.createObjectURL(blob);
    // downloadLink.download = 'APIMetaData.html';
  
    // // Append the link to the document and trigger the download
    // document.body.appendChild(downloadLink);
    // downloadLink.click();
  
    // // Remove the link from the document
    // document.body.removeChild(downloadLink);
  };
  return (
    <div className="MetaDataWrapper">
        <div className="headerWrapper">
        <button style={{background:"none", float:"right"}} onClick={downloadData}>
        <FileDownloadIcon style={{fontSize:"30px"}}/>
        </button>
        <h6>createdAt :  {item.createdAt}</h6>
        <h6>createdBy :  {fullname}</h6>
        </div>
      <table>
        <tr>
          <td>API URL</td>
          <td>{item.url}</td>
        </tr>
        <tr>
          <td>Method</td>
          <td>{item.method}</td>
        </tr>
        <tr>
          <td>Parameter Name</td>
          <td>{item.url}</td>
        </tr>
        <tr>
          <td>Header Key</td>
          <td>{item.url}</td>
        </tr>
        <tr>
          <td>Header Value</td>
          <td>{item.url}</td>
        </tr>
        <tr>
          <td>Data Params</td>
          <td>{item.url}</td>
        </tr>
      </table>
      <div className="ResponseWrapper">
      <h4>Response codes</h4>
      </div>
      <table>
      <tr>
          <th>Response Code</th>
          <th>Response Message</th>
        </tr>
        <tr>
          <td>200</td>
          <td>Success</td>
        </tr>
        <tr>
          <td>400</td>
          <td>Bad Request</td>
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
        </tr>
        <tr>
          <td>403</td>
          <td>Forbidden Access</td>
        </tr>
        <tr>
          <td>404</td>
          <td>Function Not Available</td>
        </tr>
        <tr>
          <td>401</td>
          <td>Authentication Failure</td>
        </tr>
      </table>
    </div>
  );
}
