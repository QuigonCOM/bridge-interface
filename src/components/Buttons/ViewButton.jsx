import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { googleAnalyticsCategories, handleGA4Event } from "../../services/GA4";
import { setNFTsListView } from "../../store/reducers/generalSlice";
import { ReactComponent as ListComp } from "../../assets/img/icons/ListView.svg";
import { ReactComponent as GridComp } from "../../assets/img/icons/GridView.svg";

export default function ViewButton() {
  const dispatch = useDispatch();
  const NFTListView = useSelector((state) => state.general.NFTListView);

  const handleView = () => {
    dispatch(setNFTsListView());
    handleGA4Event(googleAnalyticsCategories.Button, "Change view button");
  };

  return (
    <div onClick={() => handleView()} className="change-view__button">
      {NFTListView ? (
        <div className="grid-icon">
          <GridComp className="svgWidget" />
        </div>
      ) : (
        <div className="list-icon">
          <ListComp className="svgWidget" />
        </div>
      )}
    </div>
  );
}
