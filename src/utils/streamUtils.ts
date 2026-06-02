import type { StreamDataPoint } from "../data/mockStreamData";

export const aggregateStreamData = (data: StreamDataPoint[], intervalMinutes: number): StreamDataPoint[] => {
    const aggregated: StreamDataPoint[] = [];

    for (let i = 0; i < data.length; i += intervalMinutes) {
        const chunk = data.slice(i, i + intervalMinutes);
        if (chunk.length === 0) continue;

        const avgViewers = Math.floor(chunk.reduce((sum, d) => sum + d.viewers, 0) / chunk.length);
        const avgChatRate = Math.floor(chunk.reduce((sum, d) => sum + d.chatRate, 0) / chunk.length);
        const sumInstant = chunk.reduce((sum, d) => sum + d.instantSuperChat, 0);
        const lastCumulative = chunk[chunk.length - 1].cumulativeSuperChat;
        const foundEvent = chunk.find(d => d.event !== "")?.event || "";

        aggregated.push({
            time: chunk[0].time,
            viewers: avgViewers,
            chatRate: avgChatRate,
            instantSuperChat: sumInstant,
            cumulativeSuperChat: lastCumulative,
            event: foundEvent
        });
    }

    return aggregated;
};