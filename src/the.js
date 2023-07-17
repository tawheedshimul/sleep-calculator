import React, { useState, useEffect } from 'react';

const CircleScrollProgress = () => {
  const [percent, setPercent] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  const circumference = 30 * 2 * Math.PI;

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = Math.round((winScroll / height) * 100);
      setPercent(scrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setPercent(value);
  };

  return (
    <div className="container">
      <div className="fixed inline-flex items-center justify-center overflow-hidden rounded-full bottom-5 left-5">
        <svg className="w-20 h-20">
          <circle
            className="text-gray-300"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
            r="30"
            cx="40"
            cy="40"
          />
          <circle
            className="text-blue-600"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (percent / 100) * circumference}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="30"
            cx="40"
            cy="40"
          />
        </svg>
        <input
          type="number"
          className="ml-4 p-2 border"
          value={inputValue}
          onChange={handleInputChange}
        />
        <span className="ml-2 text-xl text-blue-700">{`${percent}%`}</span>
      </div>
    </div>
  );
};

export default CircleScrollProgress;
