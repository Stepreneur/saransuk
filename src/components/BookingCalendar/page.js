"use client";

import React, { useState, useMemo } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

// Icons for controls (remains unchanged)
const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);
const ZoomInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
    />
  </svg>
);
const ZoomOutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
    />
  </svg>
);

// --- Helper Functions ---
export const getWeekDays = (date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start from Sunday
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(day.getDate() + i);
    return day;
  });
};

const DEFAULT_ZOOM_LEVELS = {
  1: { interval: 60, label: "60 นาที", rowHeight: "h-20" },
  2: { interval: 30, label: "30 นาที", rowHeight: "h-12" },
  3: { interval: 15, label: "15 นาที", rowHeight: "h-10" },
};

/**
 * Reusable Booking Calendar Component with Dialog
 */
const BookingCalendar = ({
  initialDate = new Date(),
  bookedSlots = {}, // Changed from array to object: { 'isoString': count }
  bookingLimit = 1, // New prop to set max bookings per slot
  onSlotClick = () => {},
  selectedSlot = null,
  startTime = 8,
  endTime = 18,
  zoomLevelsConfig = DEFAULT_ZOOM_LEVELS,
  triggerButton, // Optional custom trigger button
  dialogTitle = "จองนัดหมาย", // Dialog title
  onConfirmBooking, // Callback when booking is confirmed
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const MIN_ZOOM = 1;
  const MAX_ZOOM = Object.keys(zoomLevelsConfig).length;

  const handlePrevWeek = () =>
    setCurrentDate(
      (prev) => new Date(new Date(prev).setDate(prev.getDate() - 7))
    );
  const handleNextWeek = () =>
    setCurrentDate(
      (prev) => new Date(new Date(prev).setDate(prev.getDate() + 7))
    );
  const handleZoomIn = () =>
    setZoomLevel((prev) => Math.min(prev + 1, MAX_ZOOM));
  const handleZoomOut = () =>
    setZoomLevel((prev) => Math.max(prev - 1, MIN_ZOOM));

  const getSlotStatus = (date) => {
    const count = bookedSlots[date.toISOString()] || 0;
    const isFull = count >= bookingLimit;
    const isBooked = count > 0;
    return { count, isBooked, isFull };
  };

  const internalSlotClickHandler = (day, hour, minute) => {
    const clickedDate = new Date(day);
    clickedDate.setHours(hour, minute, 0, 0);

    if (getSlotStatus(clickedDate).isFull) return;

    onSlotClick(clickedDate);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedSlot || !customerName.trim() || !customerPhone.trim()) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (onConfirmBooking) {
      onConfirmBooking({
        slot: selectedSlot,
        name: customerName,
        phone: customerPhone,
      });
    }

    setIsConfirmDialogOpen(false);
    setIsDialogOpen(false);
    setCustomerName("");
    setCustomerPhone("");
    onSlotClick(null);
  };

  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);

  const timeSlots = useMemo(() => {
    const slots = [];
    const { interval } = zoomLevelsConfig[zoomLevel];
    const startTimeInMinutes = startTime * 60;
    const endTimeInMinutes = endTime * 60;

    for (
      let minutes = startTimeInMinutes;
      minutes < endTimeInMinutes;
      minutes += interval
    ) {
      slots.push({
        hour: Math.floor(minutes / 60),
        minute: minutes % 60,
      });
    }
    return slots;
  }, [zoomLevel, startTime, endTime, zoomLevelsConfig]);

  const formatWeekHeader = (week) => {
    const firstDay = week[0];
    const lastDay = week[6];
    const monthNames = [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ];
    if (firstDay.getMonth() === lastDay.getMonth()) {
      return `${firstDay.getDate()} - ${lastDay.getDate()} ${
        monthNames[firstDay.getMonth()]
      } ${firstDay.getFullYear() + 543}`;
    }
    return `${firstDay.getDate()} ${
      monthNames[firstDay.getMonth()]
    } - ${lastDay.getDate()} ${monthNames[lastDay.getMonth()]} ${
      lastDay.getFullYear() + 543
    }`;
  };

  const today = new Date();
  const currentZoomConfig = zoomLevelsConfig[zoomLevel];

  const CalendarContent = () => (
    <div className="bg-white p-4 sm:p-6 rounded-2xl w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevWeek}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeftIcon />
          </button>
          <button
            onClick={handleNextWeek}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowRightIcon />
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center ml-4">
            {formatWeekHeader(weekDays)}
          </h2>
        </div>
        <div className="flex items-center gap-2 border border-gray-300 rounded-full p-1">
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel === MIN_ZOOM}
            className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ZoomOutIcon />
          </button>
          <span className="w-20 text-center text-gray-600 font-semibold">
            {currentZoomConfig.label}
          </span>
          <button
            onClick={handleZoomIn}
            disabled={zoomLevel === MAX_ZOOM}
            className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ZoomInIcon />
          </button>
        </div>
      </div>

      <div className="overflow-auto" style={{ maxHeight: "65vh" }}>
        <div className="grid grid-cols-[auto_repeat(7,1fr)] min-w-[50rem]">
          <div className="sticky top-0 left-0 bg-white -z-10"></div>

          {weekDays.map((day, index) => {
            const isToday = day.toDateString() === today.toDateString();
            return (
              <div
                key={index}
                className="text-center p-2 border-b-2 border-gray-200 sticky top-0 bg-white z-10"
              >
                <p
                  className={`text-sm ${
                    isToday ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"][day.getDay()]}
                </p>
                <p
                  className={`text-2xl font-bold ${
                    isToday
                      ? "text-blue-600 bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mx-auto"
                      : "text-gray-800"
                  }`}
                >
                  {day.getDate()}
                </p>
              </div>
            );
          })}

          {timeSlots.map(({ hour, minute }) => (
            <React.Fragment key={`${hour}-${minute}`}>
              <div className="text-right pr-2 text-xs text-gray-500 -mt-2 sticky left-0 bg-white z-10">
                {`${hour}:${String(minute).padStart(2, "0")}`}
              </div>

              {weekDays.map((day) => {
                const slotDate = new Date(day);
                slotDate.setHours(hour, minute, 0, 0);
                const status = getSlotStatus(slotDate);
                const isSelected =
                  selectedSlot?.getTime() === slotDate.getTime();

                const slotClasses = [
                  "border-t border-r border-gray-200 flex items-center justify-center text-xs text-gray-600",
                  currentZoomConfig.rowHeight,
                  isSelected
                    ? "bg-blue-500 !text-white ring-2 ring-blue-700 z-10"
                    : status.isFull
                    ? "bg-red-100 !text-red-700 cursor-not-allowed"
                    : status.isBooked
                    ? "bg-yellow-100 hover:bg-blue-50 cursor-pointer"
                    : "hover:bg-blue-50 cursor-pointer",
                ].join(" ");

                return (
                  <div
                    key={day.toISOString()}
                    className={slotClasses.trim()}
                    onClick={() => internalSlotClickHandler(day, hour, minute)}
                  >
                    {status.isBooked && (
                      <span>
                        {status.isFull ? "เต็ม" : "ว่าง"} {status.count}/
                        {bookingLimit}
                      </span>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

    </div>
  );

  return (
    <>
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger asChild>
          {triggerButton || (
            <button className="px-6 py-3 bg-[#9f0600] text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-semibold">
              จองคิวเลย
            </button>
          )}
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-[95vw] max-w-7xl translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Dialog.Title className="text-2xl font-bold text-gray-800">
                {dialogTitle}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                  aria-label="ปิด"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </Dialog.Close>
            </div>
            <div className="p-6 overflow-auto max-h-[calc(90vh-100px)]">
              <CalendarContent />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Confirmation Dialog with Form */}
      <Dialog.Root open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[60] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-[70] w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Dialog.Title className="text-xl font-bold text-gray-800">
                ยืนยันการจอง
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                  aria-label="ปิด"
                  onClick={() => {
                    setIsConfirmDialogOpen(false);
                    setCustomerName("");
                    setCustomerPhone("");
                  }}
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </Dialog.Close>
            </div>
            <div className="p-6">
              {selectedSlot && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">เวลาที่เลือก:</p>
                  <p className="text-lg font-semibold text-blue-800">
                    {selectedSlot.toLocaleString("th-TH", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                    ชื่อ-นามสกุล <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="กรอกชื่อ-นามสกุล"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-2">
                    เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="customerPhone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="กรอกเบอร์โทรศัพท์"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setIsConfirmDialogOpen(false);
                    setCustomerName("");
                    setCustomerPhone("");
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 px-6 py-3 bg-[#9f0600] text-white rounded-lg hover:bg-[#8a0500] transition-colors font-semibold"
                >
                  ยืนยันการจอง
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
export default BookingCalendar;
