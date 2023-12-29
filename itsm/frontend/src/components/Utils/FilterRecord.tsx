
export const filterRecord = (data:any, title?:any) => {
    let filteredData;
    console.log(`title :: ${title}`)
    if(title) {
        filteredData = data?.filter((item:any) => {
        return item.statustitle.toLowerCase() === title.toLowerCase() &&
              (item.prioritytitle === "P1 Critical" ||
                item.prioritytitle === "P2 High" ||
                item.prioritytitle === "P3 Normal");
      });
    } else {
      filteredData = data?.filter((item:any) => {
        return (item.prioritytitle === "P1 Critical" ||
                item.prioritytitle === "P2 High" ||
                item.prioritytitle === "P3 Normal");
        });
    }
    
    if(filteredData) {
      const separatedData = filteredData?.reduce((result:any, item:any) => {
        if (item.prioritytitle === "P1 Critical") {
            result.p1.push(item);
        } else if (item.prioritytitle === "P2 High") {
            result.p2.push(item);
        } else if (item.prioritytitle === "P3 Normal") {
            result.p3.push(item);
        }
        return result;
      }, { p1: [], p2: [], p3: [] });
      if(title) {
        const finalData:any = [{
          title: "Activity",
          ...separatedData
        }];
        return finalData;
      } else {
        const finalData:any = [{
          title: "Un Assigned",
          ...separatedData
        }];
        return finalData;
      }
      
    }
}