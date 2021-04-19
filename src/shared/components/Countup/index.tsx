import { FC, useMemo } from 'react';
import './index.css';

export const Countup: FC<{ num: number }> = ({ num }) => {
  const numberList = useMemo(() => {
    const nums = `${num}`.split('').reverse();
    
    for (let i = 3; i < nums.length; i += 3) {
      nums.splice(i, 0, ',');
      i ++;
    }
    return nums.reverse();
  }, [num]);
  return (
    <div className="numbers-container">
      {
        numberList.map((number, index) => {
          if (number === ',') {
            return <div className="numbers-box" key={index}>
              <span>
                <label>,</label>
              </span>
            </div>
          }
          const scrollClass = number === '0' ?
            `numbers-scroll0${Math.ceil(Math.random() * 5)}`
            :
            `numbers-scroll${number}`;

          return (
            <div className="numbers-box" key={index}>
              {
                num > 0 ?
                  <span className={scrollClass}>
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
                  :
                  <span>
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