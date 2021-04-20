import { FC, useEffect, useMemo, useState } from 'react';
import './index.css';
import { insertStyle } from '../../utils/insert-style';

const formatDigitalLevel = (number: number) => {
  const nums = `${number}`.split('').reverse();
    
  for (let i = 3; i < nums.length; i += 3) {
    nums.splice(i, 0, ',');
    i ++;
  }
  return nums.reverse();
};

const keyFrameCache: {
  [key: string]: string;
} = {};

/**
 * @change 1:3 8:4
 */
const insertKeyFrameByChange = (change: string) => {
  if (keyFrameCache[change]) {
    return;
  }
  const from = parseInt(change.split('-')[0]);
  const to = parseInt(change.split('-')[1]);

  if (from === to || `${from}` === 'NaN' || `${to}` === 'NaN') {
    return;
  }

  if (to < from) {
    insertKeyFrameByChange(`${from}-10`);
    insertKeyFrameByChange(`0-${to}`);
    return;
  }

  const keyFrame = `
    @keyframes countup${change}
    {
      0% { margin-top: ${-50 * from }px; }
      100% { margin-top: ${-50 * to }px;}
    }
  `;
  keyFrameCache[change] = keyFrame;
  insertStyle(keyFrame, { id: 'dynamic-style' });
};

export const Countup: FC<{ number: number }> = ({ number }) => {
  const [ loaded, setLoaded ] = useState<boolean>(false);
  const [ changes, setChanges ] = useState<string[]>([]);

  useMemo(() => {
    const splitedNums = formatDigitalLevel(number);
    setChanges(oldChanges => {
      const nums = splitedNums.map((num, index) => {
        if (num === ',') {
          return ',';
        }
        const oldNumChange = oldChanges[oldChanges.length - (splitedNums.length - index)];
        const change = `${ oldNumChange ? oldNumChange[oldNumChange.length - 1] : '' }-${num}`;
        insertKeyFrameByChange(change);
        return change;
      });
      return nums;
    });
  }, [number]);
  
  useEffect(() => setLoaded(true), []);

  return (
    <div className="numbers-container">
      {
        changes.map((change, index) => {
          const from = parseInt(change.split('-')[0] || '0');
          const to = parseInt(change.split('-')[1] || '0');
          if (change.length === 1 || change.length === 2 || from === to) {
            return <div className="numbers-box" key={index}>
              <span>
                <label>{ change[change.length - 1] }</label>
              </span>
            </div>
          }
          // let duration = (to - from) * 0.15;
          // duration = duration > 0 ? duration : -duration;
          let fromDuration = (10 - from) * 0.15;
          let toDuration = to * 0.15;
          return (
            <div className="numbers-box" key={index}>
              {
                <span style={ loaded ? {
                  animationFillMode: 'forwards',
                  animationDuration: to > from ? `${1.5}s` : `${1.5 * (fromDuration / (fromDuration + toDuration))}, ${1.5 * (toDuration / fromDuration + toDuration)}`,
                  // animationDuration: to > from ? `${duration}s` : `${fromDuration}, ${toDuration}`,
                  animationDelay: to > from ? '0s' : `0s, ${fromDuration}`,
                  animationName: to > from ? `countup${change}` : `countup${from}-10, countup0-${to}`,
                } : {} }>
                  <label>0</label>
                  <label>1</label>
                  <label>2</label>
                  <label>3</label>
                  <label>4</label>
                  <label>5</label>
                  <label>6</label>
                  <label>7</label>
                  <label>8</label>
                  <label>9</label>
                  <label>0</label>
                </span>
              }
            </div>
          );
        })
      }
    </div>
  );
};