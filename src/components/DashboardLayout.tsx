import { StreamChart } from "./StreamChart";
import styles from "./DashboardLayout.module.css";
import { SummaryCard } from "./SummaryCard";
import { useState } from "react";
import { mockStreamList } from "../data/mockStreamData";
import { Sidebar } from "./Sidebar";


export const DashboardLayout = () => {
    const [selectedStreamId, setSelectedStreamId] = useState<string>(mockStreamList[0]?.id);
    const currentStreamMeta = mockStreamList.find(s => s.id === selectedStreamId);

    return (
        <div className={styles.container}>
            <Sidebar
                selectedStreamId={selectedStreamId}
                onSelectStream={setSelectedStreamId}
            />
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.headerMeta}>
                        <span className={`${styles.statusBadge} ${currentStreamMeta?.status === "live" ? styles.live : styles.archive}`}>
                            {currentStreamMeta?.status === "live" ? "LIVE" : "ARCHIVE"}
                        </span>
                        <span className={styles.streamCreator}>{currentStreamMeta?.creator}</span>
                    </div>
                    <h1 className={styles.pageTitle}>{currentStreamMeta?.title}</h1>
                </div>
            </header >
            <main className={styles.mainContent}>
                <SummaryCard streamId={selectedStreamId} />
                <StreamChart streamId={selectedStreamId} />
            </main>
        </div >
    );
};