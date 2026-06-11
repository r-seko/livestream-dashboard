import { useEffect, useState } from "react"
import { mockStreamData, mockStreamList } from "../data/mockStreamData";


export const useLiveStreamTicker = (selectedStreamId: string) => {
    const [, setTick] = useState<number>(0);
    const currentStreamMeta = mockStreamList.find(s => s.id === selectedStreamId);

    useEffect(() => {
        if (currentStreamMeta?.status !== "live") return;

        const interval = setInterval(() => {
            const currentData = mockStreamData[selectedStreamId];
            if (!currentData || currentData.length === 0) return;

            const lastPoint = currentData[currentData.length - 1];

            const [hour, minute] = lastPoint.time.split(":").map(Number);
            let nextMin = minute + 1;
            let nextHour = hour;
            if (nextMin >= 60) {
                nextMin = 0;
                nextHour = (nextHour + 1) % 24;
            }
            const nextTime = `${String(nextHour).padStart(2, "0")}:${String(nextMin).padStart(2, "0")}`;

            const nextViewers = Math.max(1000, lastPoint.viewers + Math.floor(Math.random() - 0.45) * 600);
            let currentMinuteSC = 0;
            const scRole = Math.random();
            if (scRole > 0.92) {
                currentMinuteSC = Math.floor(Math.random() * 8000) + 2000;
            } else if (scRole > 0.75) {
                currentMinuteSC = Math.floor(Math.random() * 1400) + 100;
            } else {
                currentMinuteSC = 0;
            }
            const nextChatRate = currentMinuteSC;
            const nextInstantSC = currentMinuteSC;
            const nextCumulativeSC = lastPoint.cumulativeSuperChat + currentMinuteSC;
            const nextEvent = "";


            currentData.push({
                time: nextTime,
                viewers: nextViewers,
                chatRate: nextChatRate,
                instantSuperChat: nextInstantSC,
                cumulativeSuperChat: nextCumulativeSC,
                event: nextEvent
            });

            setTick(t => t + 1);
        }, 2000);
        return () => clearInterval(interval);
    }, [selectedStreamId, currentStreamMeta?.status]);

    return {
        currentStreamMeta
    };
};