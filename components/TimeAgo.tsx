"use client";

import { useEffect, useState } from "react";
import { formatDistance } from "date-fns";

interface TimeAgoProps {
  date: Date | number | string;
}

export default function TimeAgo({ date }: TimeAgoProps) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    setTimeAgo(formatDistance(new Date(date), new Date(), { addSuffix: true }));
  }, [date]);

  return timeAgo;
}
