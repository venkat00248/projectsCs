import { DateFormat } from "./DateFormat";

export const filterTableRecord = (filteredData?:any , selectedOption?:any) => {
    let filteredDatas = filteredData;
    if (selectedOption) {
        filteredDatas = filteredData?.filter(
        (ticket:any) => selectedOption?.value && ticket?.deptid == selectedOption.value
      );
    }
    return filteredDatas;
  }
export const filterTableByText = (filteredData?:any, filterText?:any) => {
    let filteredDatas = filteredData;
    if (filterText) {
      filteredDatas = filteredData.filter((ticket:any) => {
        const searchData = `${ticket?.rfcno} ${ticket?.ticketowner} 
                            ${ticket?.lastreplier} ${ticket?.wingname}
                            ${ticket?.lob_name} ${ticket?.createdname}
                            ${ticket?.dept_title} ${ticket?.userstaffid}
                            ${ticket?.organizationname} ${ticket?.fullname} 
                            ${ticket?.dept_title} ${ticket?.departmentname} 
                            ${ticket?.organization} ${ticket?.statustitle} 
                            ${ticket?.prioritytitle} ${ticket?.orgtype} 
                            ${DateFormat(ticket?.createdon, false)} ${DateFormat(ticket?.lastactivity, false)} 
                            ${DateFormat(ticket?.createdon, true)} ${DateFormat(ticket?.lastactivity, true)}`.toUpperCase();
        const filterDatas = filterText.toUpperCase();
        return searchData.includes(filterDatas);
      });
      return filteredDatas;
    }
}