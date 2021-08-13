import { FC } from "react";

import './index.css'

const OverviewCard: FC<{ title: string }> = ({ title = "title", children }) => {
  return (
    <div className="overview-card">
      <span>{title}</span>
      <div className="data">{children}</div>
    </div>
  );
};

export default OverviewCard;
