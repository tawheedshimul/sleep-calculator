import React, { useState } from "react";

const SleepCalculator = () => {
  const [ageRange, setAgeRange] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [timeInput, setTimeInput] = useState({ hour: "", minute: "", period: "AM" });
  const [suggestedSleepTime, setSuggestedSleepTime] = useState("");
  const [suggestedWakeUpTime, setSuggestedWakeUpTime] = useState("");

  const handleAgeRangeChange = (event) => {
    setAgeRange(event.target.value);
  };

  const handleSelectedTime = (time) => {
    setSelectedTime(time);
    setSuggestedSleepTime("");
    setSuggestedWakeUpTime("");
  };

  const handleTimeInput = (event) => {
    const { name, value } = event.target;
    setTimeInput((prevTimeInput) => ({ ...prevTimeInput, [name]: value }));
    setSuggestedSleepTime("");
    setSuggestedWakeUpTime("");
  };

  const handleCalculate = () => {
    if (selectedTime === "wakeUp") {
      calculateSleepTime();
    } else if (selectedTime === "goToBed") {
      calculateWakeUpTime();
    }
  };

  const calculateSleepTime = () => {
    const hour = parseInt(timeInput.hour);
    const minute = parseInt(timeInput.minute);
    const amPm = timeInput.period;
    const sleepHour = calculateSleepHour(hour);
    const sleepMinute = minute;
    setSuggestedSleepTime(
      `${formatHour(sleepHour)}:${formatMinute(sleepMinute)} ${amPm}`
    );
    setSuggestedWakeUpTime("");
  };

  const calculateWakeUpTime = () => {
    const hour = parseInt(timeInput.hour);
    const minute = parseInt(timeInput.minute);
    const amPm = timeInput.period;
    const wakeUpHour = calculateWakeUpHour(hour);
    const wakeUpMinute = minute;
    setSuggestedWakeUpTime(
      `${formatHour(wakeUpHour)}:${formatMinute(wakeUpMinute)} ${amPm}`
    );
    setSuggestedSleepTime("");
  };

  const calculateSleepHour = (wakeUpHour) => {
    if (ageRange === "0-3") {
      return wakeUpHour - 16;
    } else if (ageRange === "4-11") {
      return wakeUpHour - 12;
    } else if (ageRange === "1-2") {
      return wakeUpHour - 14;
    } else if (ageRange === "3-5") {
      return wakeUpHour - 13;
    } else if (ageRange === "6-12") {
      return wakeUpHour - 9;
    } else if (ageRange === "13-18") {
      return wakeUpHour - 8;
    } else {
      return wakeUpHour - 7;
    }
  };

  const calculateWakeUpHour = (bedHour) => {
    if (ageRange === "0-3") {
      return bedHour + 16;
    } else if (ageRange === "4-11") {
      return bedHour + 12;
    } else if (ageRange === "1-2") {
      return bedHour + 14;
    } else if (ageRange === "3-5") {
      return bedHour + 13;
    } else if (ageRange === "6-12") {
      return bedHour + 9;
    } else if (ageRange === "13-18") {
      return bedHour + 8;
    } else {
      return bedHour + 7;
    }
  };

  const formatHour = (hour) => {
    if (hour === 0) {
      return "12";
    } else if (hour > 12) {
      return (hour - 12).toString().padStart(2, "0");
    } else {
      return hour.toString().padStart(2, "0");
    }
  };

  const formatMinute = (minute) => {
    return minute.toString().padStart(2, "0");
  };

  const getSleepDuration = () => {
    if (ageRange === "0-3") {
      return "12-16 hours (including naps)";
    } else if (ageRange === "4-11") {
      return "12-16 hours (including naps)";
    } else if (ageRange === "1-2") {
      return "11-14 hours (including naps)";
    } else if (ageRange === "3-5") {
      return "10-13 hours (including naps)";
    } else if (ageRange === "6-12") {
      return "9-12 hours";
    } else if (ageRange === "13-18") {
      return "8-10 hours";
    } else {
      return "7 or more hours";
    }
  };

  const getSleepTimeForCycles = (numCycles) => {
    const sleepDuration = getRecommendedSleepDuration();
    const sleepTimeMinutes = sleepDuration * 60;
    const cycleDuration = 90;
    const totalSleepTime = numCycles * cycleDuration;
    const remainingTime = sleepTimeMinutes - totalSleepTime;
    const sleepHour = Math.floor(remainingTime / 60);
    const sleepMinute = remainingTime % 60;

    return `${formatHour(sleepHour)}:${formatMinute(sleepMinute)}`;
  };

  const getRecommendedSleepDuration = () => {
    if (ageRange === "0-3") {
      return 16;
    } else if (ageRange === "4-11") {
      return 14;
    } else if (ageRange === "1-2") {
      return 13;
    } else if (ageRange === "3-5") {
      return 12;
    } else if (ageRange === "6-12") {
      return 9;
    } else if (ageRange === "13-18") {
      return 8.5;
    } else {
      return 7.5;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Sleep Calculator</h2>
      <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col space-y-2">
          <label htmlFor="ageRange" className="text-lg font-semibold">
            Age Range:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              className={`p-2 border border-gray-300 rounded ${
                ageRange === "0-3" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setAgeRange("0-3")}
            >
              0-3 months
            </button>
            <button
              className={`p-2 border border-gray-300 rounded ${
                ageRange === "4-11" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setAgeRange("4-11")}
            >
              4-11 months
            </button>
            <button
              className={`p-2 border border-gray-300 rounded ${
                ageRange === "1-2" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setAgeRange("1-2")}
            >
              1-2 years
            </button>
            <button
              className={`p-2 border border-gray-300 rounded ${
                ageRange === "3-5" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setAgeRange("3-5")}
            >
              3-5 years
            </button>
            <button
              className={`p-2 border border-gray-300 rounded ${
                ageRange === "6-12" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setAgeRange("6-12")}
            >
              6-12 years
            </button>
            <button
              className={`p-2 border border-gray-300 rounded ${
                ageRange === "13-18" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setAgeRange("13-18")}
            >
              13-18 years
            </button>
            <button
              className={`p-2 border border-gray-300 rounded ${
                ageRange === "18+" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setAgeRange("18+")}
            >
              18+ years
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="selectedTime" className="text-lg font-semibold">
            {selectedTime === "wakeUp" ? "Wake Up Time" : "Go To Bed Time"}
          </label>
          <div className="flex items-center">
            <input
              type="number"
              min="1"
              max="12"
              name="hour"
              value={timeInput.hour}
              onChange={handleTimeInput}
              className="p-2 border border-gray-300 rounded mr-2 w-16"
              placeholder="Hour"
            />
            <span className="mr-2">:</span>
            <select
              name="minute"
              value={timeInput.minute}
              onChange={handleTimeInput}
              className="p-2 border border-gray-300 rounded mr-2 w-24"
            >
              <option value="">Select Minute</option>
              <option value="00">00</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
            </select>
            <select
              name="period"
              value={timeInput.period}
              onChange={handleTimeInput}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        {suggestedSleepTime && (
          <div className="flex flex-col space-y-2">
            <p className="text-lg font-semibold">Suggested Sleep Time:</p>
            <p className="text-2xl font-bold">{suggestedSleepTime}</p>
          </div>
        )}
        {suggestedWakeUpTime && (
          <div className="flex flex-col space-y-2">
            <p className="text-lg font-semibold">Suggested Wake Up Time:</p>
            <p className="text-2xl font-bold">{suggestedWakeUpTime}</p>
          </div>
        )}
        <div className="flex space-x-4">
          <button
            onClick={() => handleSelectedTime("wakeUp")}
            className={`px-4 py-2 font-semibold rounded ${
              selectedTime === "wakeUp" ? "bg-blue-500 text-white" : "border"
            }`}
          >
            Wake Up
          </button>
          <button
            onClick={() => handleSelectedTime("goToBed")}
            className={`px-4 py-2 font-semibold rounded ${
              selectedTime === "goToBed" ? "bg-blue-500 text-white" : "border"
            }`}
          >
            Go To Bed
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleCalculate}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            Calculate
          </button>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-lg font-semibold">Recommended Daily Sleep:</p>
          <p>{getSleepDuration()}</p>
        </div>
        {suggestedSleepTime && (
          <div className="flex flex-col space-y-2">
            <p className="text-lg font-semibold">Sleep Time for 5 Cycles:</p>
            <p>{getSleepTimeForCycles(5)}</p>
          </div>
        )}
        {suggestedSleepTime && (
          <div className="flex flex-col space-y-2">
            <p className="text-lg font-semibold">Sleep Time for 4 Cycles:</p>
            <p>{getSleepTimeForCycles(4)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SleepCalculator;
