"use client";

import React, { useState, useMemo, useEffect } from "react";
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

const DEFAULT_DURATION_OPTIONS = [
  { value: 60, label: "60 นาที", rowHeight: "h-10" },
  { value: 90, label: "90 นาที", rowHeight: "h-12" },
  { value: 120, label: "120 นาที", rowHeight: "h-20" }
];

const DEFAULT_MASSAGE_TYPES = [
  { 
    value: "thai", 
    label: "นวดไทย", 
    description: "นวดแผนไทยแบบดั้งเดิม",
    prices: { 60: 199, 90: 299, 120: 399 }
  },
  { 
    value: "deep-tissue", 
    label: "นวดรีดเส้น", 
    description: "นวดลึกเพื่อคลายกล้ามเนื้อ",
    prices: { 60: 299, 90: 399, 120: 499 }
  },
  { 
    value: "oil", 
    label: "นวดน้ำมัน", 
    description: "นวดด้วยน้ำมันหอมระเหย",
    prices: { 60: 399, 90: 499, 120: 599 }
  },
  { 
    value: "foot", 
    label: "นวดเท้า", 
    description: "นวดเท้าและน่อง",
    prices: { 60: 199, 90: 299, 120: 399 }
  },
  { 
    value: "neck-shoulder", 
    label: "นวดคอ-ไหล่", 
    description: "นวดเฉพาะส่วนคอและไหล่",
    prices: { 60: 299, 90: 399, 120: 499 }
  },
  { 
    value: "aromatherapy", 
    label: "อโรม่า", 
    description: "นวดอโรม่าแบบพรีเมียม",
    prices: { 60: 499, 90: 599, 120: 699 }
  },
  { 
    value: "bodyscrub", 
    label: "ขัดผิว", 
    description: "ขัดผิวแบบพรีเมียม",
    prices: { 60: 499, 90: 599, 120: 699 }
  },
];

/**
 * Reusable Booking Calendar Component with Dialog
 */
const BookingCalendar = ({
  initialDate = new Date(),
  bookedSlots = {}, // Changed from array to object: { 'isoString': count }
  bookingLimit = 1, // New prop to set max bookings per slot
  onSlotClick = () => {},
  selectedSlot = null,
  startTime = 11,
  endTime = 22,
  durationOptions = DEFAULT_DURATION_OPTIONS,
  massageTypes = DEFAULT_MASSAGE_TYPES,
  preSelectedService = null, // Pre-selected service type from benefit card
  triggerButton, // Optional custom trigger button
  dialogTitle = "จองนัดหมาย", // Dialog title
  onConfirmBooking, // Callback when booking is confirmed
}) => {
  // allow a small overtime window (minutes) so late slots can still be booked
  const overtimeMinutes = 30;
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [fetchedBookedSlots, setFetchedBookedSlots] = useState({});
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(60); // Default to 60 minutes
  const [selectedMassageType, setSelectedMassageType] = useState(preSelectedService || "");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isServiceSelectionOpen, setIsServiceSelectionOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Update selected massage type when preSelectedService changes
  useEffect(() => {
    if (preSelectedService) {
      setSelectedMassageType(preSelectedService);
    }
  }, [preSelectedService]);

  // Fetch booked slots for the current week from backend
  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const fetchSlots = async () => {
      setIsLoadingSlots(true);
      setSlotsError(null);
      try {
        // Calculate week range (ISO strings)
        const week = getWeekDays(currentDate);
        const start = new Date(week[0]);
        start.setHours(0, 0, 0, 0);
        const end = new Date(week[6]);
        end.setHours(23, 59, 59, 999);

        const params = new URLSearchParams({
          start: start.toISOString(),
          end: end.toISOString(),
        });

        const res = await fetch(`/api/bookings/slots?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('Failed to load slots');
        const data = await res.json();

        if (cancelled) return;

        // If backend returns an array of bookings (with slot & duration), keep it
        // If backend returns an object map (legacy), keep the map
        if (Array.isArray(data)) {
          // ensure each booking has slot and duration
          const normalized = data.map(b => ({ slot: b.slot, duration: b.duration }));
          setFetchedBookedSlots(normalized);
        } else if (data && typeof data === 'object') {
          setFetchedBookedSlots(data);
        } else {
          setFetchedBookedSlots({});
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error('Error fetching slots', err);
        setSlotsError(err.message || String(err));
      } finally {
        setIsLoadingSlots(false);
      }
    };

    fetchSlots();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [currentDate]);

  {/* Handle next week */}
  const handlePrevWeek = () =>
    setCurrentDate(
      (prev) => new Date(new Date(prev).setDate(prev.getDate() - 7))
    );
  const handleNextWeek = () =>
    setCurrentDate(
      (prev) => new Date(new Date(prev).setDate(prev.getDate() + 7))
    );

  const getSlotStatus = (date) => {
    // determine if this slot is in the past based on slot end time
    const now = new Date();
    // prefer fetchedBookedSlots (live data), fallback to prop bookedSlots
    if (Array.isArray(fetchedBookedSlots) && fetchedBookedSlots.length) {
      // candidate slot interval [date, date + selectedDuration minutes)
      const slotStart = new Date(date);
      const slotEnd = new Date(slotStart.getTime() + selectedDuration * 60 * 1000);

      // consider slot past only when its end time is <= now
      const isPast = slotEnd <= now;

      // closing time for this day, allow small overtime window
      const closing = new Date(slotStart);
      closing.setHours(endTime, 0, 0, 0);
      const closingWithOvertime = new Date(closing.getTime() + overtimeMinutes * 60 * 1000);
      const isTooLate = slotEnd > closingWithOvertime;

      let count = 0;
      for (const b of fetchedBookedSlots) {
        if (!b || !b.slot) continue;
        const bookingStart = new Date(b.slot);
        const bookingDuration = Number(b.duration) || 0;
        const bookingEnd = new Date(bookingStart.getTime() + bookingDuration * 60 * 1000);

        // overlap if bookingStart < slotEnd && bookingEnd > slotStart
        if (bookingStart < slotEnd && bookingEnd > slotStart) {
          count += 1;
        }
      }
      const isFull = count >= bookingLimit;
      const isBooked = count > 0;
      return { count, isBooked, isFull, isPast, isTooLate };
    }

    // fallback to legacy map
    const map = Object.keys(fetchedBookedSlots).length ? fetchedBookedSlots : bookedSlots;
    const count = map[date.toISOString()] || 0;
    const slotStart = new Date(date);
    const slotEnd = new Date(slotStart.getTime() + selectedDuration * 60 * 1000);
    // consider slot past only when its end time is <= now
    const isPast = slotEnd <= now;
    const closing = new Date(slotStart);
    closing.setHours(endTime, 0, 0, 0);
    const closingWithOvertime = new Date(closing.getTime() + overtimeMinutes * 60 * 1000);
    const isTooLate = slotEnd > closingWithOvertime;

    const isFull = count >= bookingLimit;
    const isBooked = count > 0;
    return { count, isBooked, isFull, isPast, isTooLate };
  };

  const internalSlotClickHandler = (day, hour, minute) => {
    const clickedDate = new Date(day);
    clickedDate.setHours(hour, minute, 0, 0);

    if (getSlotStatus(clickedDate).isFull) return;

    onSlotClick(clickedDate);
    setIsConfirmDialogOpen(true);
  };

  const handleServiceSelection = () => {
    if (!selectedMassageType) {
      alert("กรุณาเลือกประเภทการนวด");
      return;
    }
    setIsServiceSelectionOpen(false);
    setIsDialogOpen(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedSlot || !customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    const payload = {
      slot: selectedSlot.toISOString(),
      duration: selectedDuration,
      massageType: selectedMassageType,
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
    };

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || 'ไม่สามารถบันทึกการจองได้');
      }
      const { booking } = await res.json();

      if (onConfirmBooking) {
        onConfirmBooking({
          ...payload,
          slot: new Date(payload.slot),
          price: getCurrentPrice(),
          bookingId: booking?.id,
        });
      }

      setIsConfirmDialogOpen(false);
      setIsDialogOpen(false);
      setIsSuccessDialogOpen(true);
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
      onSlotClick(null);
    } catch (e) {
      alert(e.message || 'เกิดข้อผิดพลาดขณะบันทึกการจอง');
    } finally {
      setIsSubmitting(false);
    }
  };

  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);

  const timeSlots = useMemo(() => {
    const slots = [];
    const startTimeInMinutes = startTime * 60;
    const endTimeInMinutes = endTime * 60;

    for (
      let minutes = startTimeInMinutes;
      minutes < endTimeInMinutes;
      minutes += selectedDuration
    ) {
      slots.push({
        hour: Math.floor(minutes / 60),
        minute: minutes % 60,
      });
    }
    return slots;
  }, [selectedDuration, startTime, endTime]);

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
  const currentDurationConfig = durationOptions.find(option => option.value === selectedDuration) || durationOptions[0];
  
  const getCurrentPrice = () => {
    const selectedType = massageTypes.find(type => type.value === selectedMassageType);
    if (!selectedType || !selectedType.prices) return 0;
    return selectedType.prices[selectedDuration] || 0;
  };

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
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="massage-type-select" className="text-sm font-medium text-gray-700 whitespace-nowrap">
              ประเภทการนวด:
            </label>
            <select
              id="massage-type-select"
              value={selectedMassageType}
              onChange={(e) => setSelectedMassageType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm min-w-[150px]"
            >
              {massageTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="duration-select" className="text-sm font-medium text-gray-700 whitespace-nowrap">
              ระยะเวลา:
            </label>
            <select
              id="duration-select"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm min-w-[120px]"
            >
              {durationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {selectedMassageType && (
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
              <span className="text-sm font-medium text-gray-700">ราคา:</span>
              <span className="text-lg font-bold text-green-800">
                {getCurrentPrice()} บาท
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-auto" style={{ maxHeight: "65vh" }}>
        <div className="grid grid-cols-[auto_repeat(7,1fr)] min-w-0 w-full">
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
                  currentDurationConfig.rowHeight,
                  isSelected
                    ? "bg-blue-500 !text-white ring-2 ring-blue-700 z-10"
                    : status.isFull
                    ? "bg-red-100 !text-red-700 cursor-not-allowed"
                    : status.isBooked
                    ? "bg-yellow-100 hover:bg-blue-50 cursor-pointer"
                    : status.isPast || status.isTooLate
                    ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                    : "hover:bg-blue-50 cursor-pointer",
                ].join(" ");

                return (
                  <div
                    key={day.toISOString()}
                    className={slotClasses.trim()}
                    onClick={() => {
                      if (status.isFull || status.isPast || status.isTooLate) return;
                      internalSlotClickHandler(day, hour, minute);
                    }}
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

          {/* End time row (show closing time like 22:00) */}
          <React.Fragment key="end-time-row">
            <div className="text-right pr-2 text-xs text-gray-500 -mt-2 sticky left-0 bg-white z-10">
              {`${endTime}:00`}
            </div>
            {weekDays.map((day) => (
              <div
                key={`end-${day.toISOString()}`}
                className={[
                  "border-t border-r border-gray-200 flex items-center justify-center text-xs text-gray-600",
                  currentDurationConfig.rowHeight,
                  "bg-white",
                ].join(" ")}
              >
                {/* closing time label row - intentionally empty */}
              </div>
            ))}
          </React.Fragment>
        </div>
      </div>

    </div>
  );

  return (
    <>
      <Dialog.Root open={isServiceSelectionOpen} onOpenChange={setIsServiceSelectionOpen} >
        <Dialog.Trigger asChild>
          {triggerButton || (
            <button className="px-6 py-3 bg-[#9f0600] text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-semibold">
              จองคิวเลย
            </button>
          )}
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-[95vw] sm:w-[90vw] max-w-md sm:max-w-2xl translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <Dialog.Title className="text-2xl font-bold text-gray-800">
                เลือกบริการ
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
            <div className="p-4 sm:p-6">
              <div className="space-y-6">
                {/* Massage Type Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">ประเภทการนวด</h3>
                  <div className="grid items-center justify-center grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {massageTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setSelectedMassageType(type.value)}
                        className={`p-2 sm:p-4 text-center border-2 rounded-lg transition-all flex items-center justify-center ${
                          selectedMassageType === type.value
                            ? "border-[#9f0600] bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <div>
                            <div className="font-semibold text-gray-800 flex text-sm sm:text-base">{type.label}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">ระยะเวลา</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {durationOptions.map((option) => {
                      const selectedType = massageTypes.find(type => type.value === selectedMassageType);
                      const price = selectedType?.prices?.[option.value] || 0;
                      
                      return (
                        <button
                          key={option.value}
                          onClick={() => setSelectedDuration(option.value)}
                          className={`p-3 text-center border-2 rounded-lg transition-all ${
                            selectedDuration === option.value
                              ? "border-[#9f0600] bg-red-50 text-[#9f0600]"
                              : "border-gray-200 hover:border-gray-300 text-gray-700"
                          }`}
                        >
                          <div className="font-semibold">{option.label}</div>
                          {selectedMassageType && price > 0 && (
                            <div className="text-xs mt-1 font-semibold text-[#9f0600]">
                              {price} บาท
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price Summary */}
                {selectedMassageType && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">ราคารวม</div>
                      <div className="text-2xl font-bold text-green-800">
                        {getCurrentPrice()} บาท
                      </div>
                      <div className="text-sm text-green-700 mt-1">
                        {massageTypes.find(type => type.value === selectedMassageType)?.label} • {durationOptions.find(opt => opt.value === selectedDuration)?.label}
                      </div>
                    </div>
                  </div>
                )}

                {/* Continue Button */}
                <div className="pt-4">
                  <button
                    onClick={handleServiceSelection}
                    disabled={!selectedMassageType}
                    className="w-full px-6 py-3 bg-[#9f0600] text-white rounded-lg hover:bg-[#8a0500] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-semibold"
                  >
                    เลือกเวลานัดหมาย
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Calendar Dialog */}
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-[95vw] sm:w-[90vw] max-w-5xl sm:max-w-7xl translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] max-h-[90vh] overflow-hidden">
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
            <div className="p-4 sm:p-6 overflow-auto max-h-[calc(90vh-100px)]">
              <CalendarContent />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Confirmation Dialog with Form */}
      <Dialog.Root open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[60] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-[70] w-[95vw] sm:w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
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
            <div className="p-4 sm:p-6">
              {selectedSlot && (
                <div className="mb-6 space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
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
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">บริการที่เลือก:</p>
                    <p className="text-lg font-semibold text-green-800">
                      {massageTypes.find(type => type.value === selectedMassageType)?.label || selectedMassageType}
                    </p>
                    <p className="text-sm text-green-700">
                      ระยะเวลา: {durationOptions.find(opt => opt.value === selectedDuration)?.label || selectedDuration + " นาที"}
                    </p>
                    <div className="mt-2 pt-2 border-t border-green-200">
                      <p className="text-sm text-gray-600">ราคารวม:</p>
                      <p className="text-xl font-bold text-green-800">
                        {getCurrentPrice()} บาท
                      </p>
                    </div>
                  </div>
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
                  <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    อีเมล <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="customerEmail"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="กรอกอีเมล"
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
                  disabled={isSubmitting}
                  className={`flex-1 px-6 py-3 rounded-lg transition-colors font-semibold ${
                    isSubmitting
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-[#9f0600] text-white hover:bg-[#8a0500]'
                  }`}
                >
                  {isSubmitting ? 'กำลังบันทึก...' : 'ยืนยันการจอง'}
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Success Dialog */}
      <Dialog.Root open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[80] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-[90] w-[95vw] sm:w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            <div className="p-6 text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              
              {/* Success Message */}
              <Dialog.Title className="text-2xl font-bold text-gray-800 mb-2">
                จองสำเร็จ!
              </Dialog.Title>
              <p className="text-gray-600 mb-6">
                การจองของคุณได้รับการบันทึกเรียบร้อยแล้ว
              </p>
              
              {/* Booking Details */}
              {selectedSlot && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-semibold text-gray-800 mb-2">รายละเอียดการจอง</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">บริการ:</span> {massageTypes.find(type => type.value === selectedMassageType)?.label || selectedMassageType}</p>
                    <p><span className="font-medium">ระยะเวลา:</span> {durationOptions.find(opt => opt.value === selectedDuration)?.label || selectedDuration + " นาที"}</p>
                    <p><span className="font-medium">วันที่:</span> {selectedSlot.toLocaleDateString("th-TH", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}</p>
                    <p><span className="font-medium">เวลา:</span> {selectedSlot.toLocaleTimeString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</p>
                    <p><span className="font-medium">ราคา:</span> <span className="font-bold text-green-600">{getCurrentPrice()} บาท</span></p>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsSuccessDialogOpen(false)}
                  className="flex-1 px-6 py-3 bg-[#9f0600] text-white rounded-lg hover:bg-[#8a0500] transition-colors font-semibold"
                >
                  ตกลง
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
