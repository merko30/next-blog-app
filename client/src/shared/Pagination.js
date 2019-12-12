import React, { useEffect, useState } from "react";

const Pagination = ({ numberOfPages = 0, onClick }) => {
  const [numbers, setNumbers] = useState([]);
  const [active, setActive] = useState(1);

  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= numberOfPages; i++) {
      arr.push(i);
    }
    setNumbers(arr);
  }, [numberOfPages]);

  const click = num => {
    setActive(num);
    onClick(num);
  };

  return (
    <div className="flex justify-center">
      {numbers.length > 1 &&
        numbers.map(n => (
          <span
            key={n}
            onClick={() => click(n)}
            className={`${
              active === n ? "bg-gray-200 " : "bg-white"
            } cursor-pointer hover:bg-gray-200 pagination-item py-2 px-4`}
          >
            {n}
          </span>
        ))}
    </div>
  );
};

export default Pagination;
