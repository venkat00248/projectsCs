import { FC } from "react";
import { useTranslation } from "react-i18next";
import "./DashboardTile.scss";
import { config } from "../../config/config";
import PopOver from "../molecules/PopOver";
import { useDispatch } from 'react-redux';
import { ActionTypes } from '../../redux/constants/action-types';

interface Props {
  title?: string;
  p1?: any;
  p2?: any;
  p3?: any;
  isThreeColumns?: boolean;
  className?:string
}

export const DashboardTile: FC<Props> = ({
  className,
  title,
  p1= {length: 0},
  p2={length: 0},
  p3={length: 0},
  isThreeColumns,
}) => {
  const { t } = useTranslation();

  const totalTickets = p1.length + p2.length + p3.length;
  const dispatch = useDispatch();
  const handleClick = (props:any, type:any) => {
    dispatch({ type: ActionTypes.SET_STATUS_COUNT, payload: {title:title, type: type, props: props}});
    const itemElement = document.getElementById('relatedItem');
    if (itemElement) {
      const { top } = itemElement.getBoundingClientRect();
      const scrollPosition = window.scrollY + top - 20;
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }
  };
  return (
    <div key={title} className="dashBoardTileWrapper">
      <div className={`tile ${className}`}>
        <h3 className="title">
          {
            (title == 'Activity')?
            t('Pending On Activity'):
            t(`${title}`)
          }
          <span className="badge badge-light">{totalTickets}</span>
        </h3>

        <div className="row">
          <div className="col-sm-4">
            <p>{t("P1")}</p>

            <p>
              {p1.length ? (
                // <a href={config.MYSHIFT_URL}>{p1.length}</a>
                // <PopOver title={title} counts ={p1.length} ticketstatus= {p1}/>
                <button onClick={() => {handleClick(p1, ("P1"))}} className="statusBtn">{p1.length}</button>
              ) : (
                <span>{p1.length}</span>
              )}
            </p>
          </div>

          <div className="col-sm-4">
            <p>{t("P2")}</p>

            <p>
              {p2.length ? (
                // <a href={config.MYSHIFT_URL}>{p2.length}</a>
                // <PopOver title={title} counts ={p2.length} ticketstatus= {p2}/>
                <button onClick={() => {handleClick(p2, ("P2"))}} className="statusBtn">{p2.length}</button>
              ) : (
                <span>{p2.length}</span>
              )}
            </p>
          </div>

          <div className="col-sm-4">
            <p>{t("P3")}</p>

            <p>
              {p3.length ? (
                // <a href={config.MYSHIFT_URL}>{p3.length}</a>
                // <PopOver title={title} counts ={p3.length} ticketstatus= {p3}/>
                <button onClick={() => {handleClick(p3, ("P3"))}} className="statusBtn">{p3.length}</button>
              ) : (
                <span>{p3.length}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
