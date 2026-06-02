export interface StreamDataPoint {
    time: string;                 // 計測時刻 (X軸)
    viewers: number;              // 同時接続数
    chatRate: number;             // 分間コメント数
    cumulativeSuperChat: number;  // 累積スパチャ額
    instantSuperChat: number;     // 分間スパチャ額
    event: string;                // 配信内のトピック
}

// 5分刻みのデータを「チェックポイント」として定義
const checkpoints = [
    { min: 0, time: "21:00", viewers: 8500, chatRate: 45, instant: 0, event: "配信開始" },
    { min: 5, time: "21:05", viewers: 10200, chatRate: 60, instant: 3000, event: "" },
    { min: 10, time: "21:10", viewers: 11500, chatRate: 55, instant: 2600, event: "" },
    { min: 15, time: "21:15", viewers: 12000, chatRate: 70, instant: 2800, event: "雑談・企画告知" },
    { min: 20, time: "21:20", viewers: 13500, chatRate: 95, instant: 4600, event: "" },
    { min: 25, time: "21:25", viewers: 14000, chatRate: 110, instant: 5000, event: "カウントダウン開始" },
    { min: 30, time: "21:30", viewers: 24500, chatRate: 480, instant: 260000, event: "★新衣装お披露目！" }, // 瞬間最高
    { min: 35, time: "21:35", viewers: 26000, chatRate: 320, instant: 170000, event: "スクショタイム" },
    { min: 40, time: "21:40", viewers: 23000, chatRate: 180, instant: 12000, event: "" },
    { min: 45, time: "21:45", viewers: 21500, chatRate: 140, instant: 10000, event: "新グッズ告知" },
    { min: 50, time: "21:50", viewers: 20000, chatRate: 125, instant: 12000, event: "" },
    { min: 55, time: "21:55", viewers: 19500, chatRate: 160, instant: 18000, event: "エンディング・スパチャ読み" },
    { min: 60, time: "22:00", viewers: 15000, chatRate: 80, instant: 8000, event: "配信終了" }
];

const generateOneMinuteData = (): StreamDataPoint[] => {
    const data: StreamDataPoint[] = [];
    let currentCumulative = 0;

    // 0分から60分まで、1分刻みでループ（計61ポイント）
    for (let i = 0; i <= 60; i++) {
        // 現在の分が、どのチェックポイントの間にあるかを特定
        const startIndex = checkpoints.findIndex((cp, idx) => i >= cp.min && i < (checkpoints[idx + 1]?.min ?? 61));
        const startCp = checkpoints[startIndex];
        const endCp = checkpoints[startIndex + 1] || startCp;

        // 線形補間の比率を計算 (0.0 〜 1.0)
        const ratio = startCp.min === endCp.min ? 1 : (i - startCp.min) / (endCp.min - startCp.min);

        // 1分ごとの時間を文字列化
        const hour = 21 + Math.floor(i / 60);
        const minStr = String(i % 60).padStart(2, "0");
        const timeStr = `${hour}:${minStr}`;

        // 同接数とコメント数を滑らかに補間し、リアルな微細ノイズを加算
        const noise = Math.floor((Math.random() - 0.5) * 150);
        const viewers = Math.max(0, Math.floor(startCp.viewers + (endCp.viewers - startCp.viewers) * ratio) + noise);
        const chatRate = Math.max(0, Math.floor(startCp.chatRate + (endCp.chatRate - startCp.chatRate) * ratio) + Math.floor(noise / 10));

        // スパチャは「イベントの瞬間」にピンポイントでドカンと発生させ、平時はゆるやかに散らす
        let instantSuperChat = 0;
        if (i === startCp.min) {
            instantSuperChat = startCp.instant; // チェックポイントぴったりの分に元の額を発生
        } else {
            // 平時の1分間のマイルドなスパチャ
            instantSuperChat = Math.random() > 0.7 ? Math.floor(Math.random() * 2000) : Math.floor(Math.random() * 300);
        }

        // 累積スパチャ額を毎分正しく加算
        currentCumulative += instantSuperChat;

        // イベントテキストは元の分にのみ付与
        const event = i === startCp.min ? startCp.event : "";

        data.push({
            time: timeStr,
            viewers,
            chatRate,
            cumulativeSuperChat: currentCumulative,
            instantSuperChat,
            event
        });
    }

    return data;
};

export const mockStreamData = generateOneMinuteData();