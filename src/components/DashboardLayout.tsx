import { StreamChart } from "./StreamChart";
import styles from "./DashboardLayout.module.css";
import { SummaryCard } from "./SummaryCard";

export const DashboardLayout = () => {
    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>LiveStream Analytics</div>
                <nav>
                    <div className={`${styles.menuItem} ${styles.menuItemActive}`}>
                        ライブ配信分析
                    </div>
                    <div className={styles.menuItem}>過去の配信一覧</div>
                    <div className={styles.menuItem}>設定</div>
                </nav>
            </aside>
            <header className={styles.header}>
                <h1 className={styles.pageTitle}>配信リアルタイムダッシュボード</h1>
            </header>
            <main className={styles.mainContent}>
                <SummaryCard />
                <StreamChart />
            </main>
        </div >
    );
};