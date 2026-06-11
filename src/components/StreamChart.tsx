import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { mockStreamData, mockStreamList } from "../data/mockStreamData";
import styles from "./StreamChart.module.css";
import { useState } from "react";
import type { StreamDataPoint } from "../data/mockStreamData";
import { aggregateStreamData } from "../utils/streamUtils";

const METRIC_CONFIG: Record<string, { label: string; unit: string; color: string; isPrefix?: boolean }> = {
    viewers: { label: "同時接続数", unit: "人", color: "#3b82f6" },
    cumulativeSuperChat: { label: "累積スパチャ額", unit: "¥", color: "#eab308", isPrefix: true },
    instantSuperChat: { label: "スパチャ額", unit: "¥", color: "#ec4899", isPrefix: true },
    chatRate: { label: "スパチャ回数", unit: "回", color: "#10b981" }
};

const formatMetricValue = (value: number | undefined, config: typeof METRIC_CONFIG[string]) => {
    if (value === undefined) return "";
    if (!config) return value.toLocaleString();

    return config.isPrefix
        ? `${config.unit}${value.toLocaleString()}`
        : `${value.toLocaleString()}${config.unit}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) {
        return null;
    }
    const data = payload[0].payload as StreamDataPoint;

    return (
        <div className={styles.CustomTooltip}>
            <div className={styles.tooltipLabel}>{label}</div>

            {payload.map((item: any) => {
                const config = METRIC_CONFIG[item.dataKey];
                const labelText = config ? config.label : item.dataKey;


                return (
                    <div key={item.dataKey} className={styles.tooltipItem} style={{ color: item.stroke }}>
                        {labelText}: {formatMetricValue(item.value, config)}
                    </div>
                );
            })}

            {data.event && (
                <div className={styles.tooltipEvent}>{data.event}</div>
            )}
        </div >
    );
};

interface StreamChartProps {
    streamId?: string;
};

export const StreamChart = ({ streamId }: StreamChartProps) => {

    const [leftMetric, setLeftMetric] = useState<string>("viewers");
    const [rightMetric, setRightMetric] = useState<string>("cumulativeSuperChat");
    const [displayMode, setDisplayMode] = useState<"all" | "recent">("all");

    const activeStreamId = streamId || mockStreamList[0]?.id;
    const currentStreamData = mockStreamData[activeStreamId] || [];

    const leftConfig = METRIC_CONFIG[leftMetric];
    const rightConfig = METRIC_CONFIG[rightMetric];
    const chartData = displayMode === "all"
        ? aggregateStreamData(currentStreamData, 5)
        : currentStreamData.slice(-15);

    return (
        <div className={styles.chartContainer}>
            <div className={styles.controlPanel}>
                <div className={styles.selectGroupContainer}>
                    <div className={styles.selectWrapper}>
                        <span className={styles.selectLabel}>左軸</span>
                        <select
                            value={leftMetric}
                            onChange={(e) => setLeftMetric(e.target.value)}
                            className={styles.select}
                        >
                            {Object.entries(METRIC_CONFIG).map(([key, config]) => (
                                <option key={key} value={key}>{config.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.selectWrapper}>
                        <span className={styles.selectLabel}>右軸</span>
                        <select
                            value={rightMetric}
                            onChange={(e) => setRightMetric(e.target.value)}
                            className={styles.select}
                        >
                            {Object.entries(METRIC_CONFIG).map(([key, config]) => (
                                <option key={key} value={key}>{config.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.toggleContainer}>
                    <div className={`${styles.slider} ${displayMode === "recent" ? styles.slideRight : ""}`} />

                    <button
                        className={`${styles.toggleBtn} ${displayMode === "all" ? styles.active : ""}`}
                        onClick={() => setDisplayMode("all")}
                    >
                        全期間
                    </button>

                    <button
                        className={`${styles.toggleBtn} ${displayMode === "recent" ? styles.active : ""}`}
                        onClick={() => setDisplayMode("recent")}
                    >
                        直近15分
                    </button>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData} margin={{ top: 20, right: 60, left: 30, bottom: 20 }}>
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" width={75} tickFormatter={(value) => formatMetricValue(value, leftConfig)} />
                    <YAxis yAxisId="right" width={75} orientation="right" tickFormatter={(value) => formatMetricValue(value, rightConfig)} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line yAxisId="left" type="monotone" dataKey={leftMetric} stroke={leftConfig?.color || "#3b82f6"} strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey={rightMetric} stroke={rightConfig?.color || "#eab308"} strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div >
    );
};
