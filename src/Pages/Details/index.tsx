import React, { useEffect, useRef, useState } from "react";
import { message, Spin } from "antd";
import echarts from "echarts";
import { useTranslation} from "react-i18next";

import { bytesToSize ,combineObjectInList} from "../../shared/utils/index";
import { WSS_ENDPOINTS_URL, ENDPOINTS_URL } from "../../config/origin";

import {
  apiGetWeekDetails,
  apiGetProjectDetail,
  apiGetDayDetail,
} from "../../core/data/api";
import { time, statusActive } from "../../shared/utils/index";

import "./index.css";
import { APIError, APIErrorType } from '../../core/types/classes/error';

interface childProps {
  location: any;
}

const Details: React.FC<childProps> = (props) => {
  const { t,i18n } = useTranslation();


  return (
    <div className="project-detail">
      <div className="project-card project-status">
      </div>
      <div className="project-card project-30days-request">
        <h2 className="card-h2">{t('Details.30days-request-counts')}</h2>
      </div>
      <div className="project-card project-30days-bandwidth">
        <h2 className="card-h2">{t('Details.30days-bandwidth')}</h2>
      </div>
    </div>
  );
};

export default Details;
