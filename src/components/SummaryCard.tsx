import { mockStreamData } from "../data/mockStreamData";
import styles from "./SummaryCard.module.css";

export const SummaryCard = () => {
    const maxViewers = Math.max(...mockStreamData.map(d => d.viewers));
    const totalSuperChat = mockStreamData[mockStreamData.length - 1]?.cumulativeSuperChat || 0;
    const totalChatRate = mockStreamData.reduce((sum, d) => sum + d.instantSuperChat, 0);
    const avgChatRate = mockStreamData.length > 0 ? Math.round(totalChatRate / mockStreamData.length) : 0;

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