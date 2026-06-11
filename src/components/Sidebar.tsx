import { mockStreamList } from "../data/mockStreamData";
import styles from "./Sidebar.module.css";

interface SidebarProps {
    selectedStreamId: string;
    onSelectStream: (id: string) => void;
}

export const Sidebar = ({ selectedStreamId, onSelectStream }: SidebarProps) => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>LiveStream Analytics</div>

            <div className={styles.streamSelectorSelection}>
                <div className={styles.sectionTitle}>配信枠選択</div>
                <div className={styles.streamList}>
                    {mockStreamList.map((stream) => (
                        <button
                            key={stream.id}
                            className={`${styles.streamCard} ${selectedStreamId === stream.id ? styles.streamCardActive : ""}`}
                            onClick={() => onSelectStream(stream.id)}
                        >
                            <div className={styles.streamMeta}>
                                <span className={`${styles.statusBadge} ${styles[stream.status]}`}>
                                    {stream.status === "live" ? "● LIVE" : "ARCHIVE"}
                                </span>
                                <span className={styles.streamCreator}>{stream.creator}</span>
                            </div>
                            <div className={styles.streamTitle}>{stream.title}</div>
                            <div className={styles.tagContainer}>
                                {stream.tags.map(tag => (
                                    <span key={tag} className={styles.tag}>#{tag}</span>
                                ))}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </aside >
    )
}


