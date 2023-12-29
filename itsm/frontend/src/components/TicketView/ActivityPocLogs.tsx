import GovernanceDataTable from "./GovernanceDataTable";
import data from "./auditlogsdata.json";
export const ActivityPoc = () => {
  return (
    <div className="m-5">
      <GovernanceDataTable data={data} />
    </div>
  );
};
export default ActivityPoc;
