import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { mockStreamData } from "../data/mockStreamData";
import styles from "./StreamChart.module.css";
import { useState } from "react";

export const StreamChart = () => {

    const [scMode, setScMode] = useState<"cumulative" | "instant">("cumulative");

    return (
        <div className={styles.chartContainer}>
            <div className={styles.btnContainer}>
                <button
                    onClick={() => setScMode("cumulative")}
                    className={scMode === "cumulative" ? styles.activeBtn : styles.btn} />
                <button
                    onClick={() => setScMode("instant")}
                    className={scMode === "instant" ? styles.activeBtn : styles.btn} />
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={mockStreamData} margin={{ top: 20, right: 50, left: 20, bottom: 20 }}>
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" tickFormatter={(value) => `${value.toLocaleString()}`} />
                    <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `¥${value.toLocaleString()}`} />
                    <Line yAxisId="left" type="monotone" dataKey="viewers" stroke="#3b82f6" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey={scMode === "cumulative" ? "cumulativeSuperChat" : "instantSuperChat"} stroke="#eab308" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div >
    );
};
