import { Dropdown, IconButton } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import PageIcon from '@rsuite/icons/Page';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import DetailIcon from '@rsuite/icons/Detail';
import FileDownloadIcon from '@rsuite/icons/FileDownload';

interface Props {
    modal?: boolean;
}
const Setting = () => {
    return(
        <i className="fa-solid fa-gear"></i>
    )
}
const Menu = () => {
    return(
        <i className="fa-solid fa-ellipsis-vertical"></i>
    )
}

const renderIconSetting = (props:any, ref:any) => {
  return (
    <div className="ntfc_setting">
        <IconButton {...props} ref={ref} icon={<Setting />} circle color="blue" appearance="primary"/>
    </div>
  );
};
const renderIconMenu = (props:any, ref:any) => {
    return (
      <div className="ntfc_setting">
          <IconButton {...props} ref={ref} icon={<Menu />} circle color="blue" appearance="primary"/>
      </div>
    );
};

const DropDrown: React.FC<Props> = ({modal = true}) => {
    const renderIconButton = modal ? renderIconSetting : renderIconMenu;
    const placement = modal ? 'bottomEnd' : 'leftStart';
    return(
        <>
        <Dropdown renderToggle={renderIconButton} trigger={['click']} placement= {placement} className={`${(modal)? null: "custom-dropdown-menu"}`}>
            <Dropdown.Item icon={<PageIcon />}>New File</Dropdown.Item>
            <Dropdown.Item icon={<FolderFillIcon />}>New File with Current Profile</Dropdown.Item>
        </Dropdown>
    </>
    )
    };
export default DropDrown;