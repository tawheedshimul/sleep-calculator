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
  };

  const calculateSleepHour = (wakeUpHour) => {
    if (ageRange === "0-3" || ageRange === "4-11") {
      return wakeUpHour - 16;
    } else if (ageRange === "1-2") {
      return wakeUpHour - 14;
    } else if (ageRange === "3-5") {
      return wakeUpHour - 13;
    } else if (ageRange === "6-13") {
      return wakeUpHour - 12;
    } else if (ageRange === "14-17" || ageRange === "18-25") {
      return wakeUpHour - 11;
    } else if (ageRange === "26-64") {
      return wakeUpHour - 10;
    } else {
      return wakeUpHour - 9;
    }
  };

  const calculateWakeUpHour = (bedHour) => {
    if (ageRange === "0-3" || ageRange === "4-11") {
      return bedHour + 16;
    } else if (ageRange === "1-2") {
      return bedHour + 14;
    } else if (ageRange === "3-5") {
      return bedHour + 13;
    } else if (ageRange === "6-13") {
      return bedHour + 12;
    } else if (ageRange === "14-17" || ageRange === "18-25") {
      return bedHour + 11;
    } else if (ageRange === "26-64") {
      return bedHour + 10;
    } else {
      return bedHour + 9;
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
                ageRange === "6-13" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setAgeRange("6-13")}
            >
              6-13 years
            </button>
            <button
              className={`p-2 border border-gray-300 rounded ${
                ageRange === "14-17" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setAgeRange("14-17")}
            >
              14-17 years
            </button>
            <button
              className={`p-2 border border-gray-300 rounded ${
                ageRange === "18-25" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setAgeRange("18-25")}
            >
              18-25 years
            </button>
            <button
              className={`p-2 border border-gray-300 rounded ${
                ageRange === "26-64" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setAgeRange("26-64")}
            >
              26-64 years
            </button>
            <button
              className={`p-2 border border-gray-300 rounded ${
                ageRange === "65+" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setAgeRange("65+")}
            >
              65+ years
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
            onClick={() => setSelectedTime("wakeUp")}
            className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 ${
              selectedTime === "wakeUp" ? "bg-blue-600" : ""
            }`}
          >
            Wake Up Time
          </button>
          <button
            onClick={() => setSelectedTime("goToBed")}
            className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 ${
              selectedTime === "goToBed" ? "bg-blue-600" : ""
            }`}
          >
            Go To Bed Time
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
      </div>
    </div>
  );
};

export default SleepCalculator;
