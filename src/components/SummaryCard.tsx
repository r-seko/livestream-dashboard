import { mockStreamData, mockStreamList } from "../data/mockStreamData";
import styles from "./SummaryCard.module.css";

interface SummaryCardProps {
    streamId?: string;
};

export const SummaryCard = ({ streamId }: SummaryCardProps) => {
    const activeStreamId = streamId || mockStreamList[0]?.id;
    const currentStreamData = mockStreamData[activeStreamId] || [];

    const maxViewers = currentStreamData.length > 0 ? Math.max(...currentStreamData.map(d => d.viewers)) : 0;
    const totalSuperChat = currentStreamData[currentStreamData.length - 1]?.cumulativeSuperChat || 0;
    const totalChatRate = currentStreamData.reduce((sum, d) => sum + d.instantSuperChat, 0);
    const avgChatRate = currentStreamData.length > 0 ? Math.round(totalChatRate / currentStreamData.length) : 0;

    return (
        < div className={styles.cardsContainer} >
            <div className={styles.card}>
                <div className={styles.cardTitle}>最高同時接続数</div>
                <div className={styles.cardValue}>{maxViewers.toLocaleString()} 人</div>
            </div>

            <div className={styles.card}>
                <div className={styles.cardTitle}>総スパチャ額</div>
                <div className={styles.cardValue}>¥{totalSuperChat.toLocaleString()}</div>
            </div>

            <div className={styles.card}>
                <div className={styles.cardTitle}>平均スパチャレート</div>
                <div className={styles.cardValue}>¥{avgChatRate.toLocaleString()}/分</div>
            </div>
        </div>
    );
};