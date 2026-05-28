export interface StreamDataPoint {
    time: string;         // 計測時刻 (X軸)
    viewers: number;      // 同時接続数 (Y軸1)
    chatRate: number;     // 分間コメント数
    cumulativeSuperChat: number; // 累積スパチャ額 (Y軸2)
    event: string;        // 配信内のトピック・イベント
}

// 1時間の配信を想定したモックデータ
export const mockStreamData: StreamDataPoint[] = [
    { time: "21:00", viewers: 8500, chatRate: 45, cumulativeSuperChat: 0, event: "配信開始" },
    { time: "21:05", viewers: 10200, chatRate: 60, cumulativeSuperChat: 15000, event: "" },
    { time: "21:10", viewers: 11500, chatRate: 55, cumulativeSuperChat: 28000, event: "" },
    { time: "21:15", viewers: 12000, chatRate: 70, cumulativeSuperChat: 42000, event: "雑談・企画告知" },
    { time: "21:20", viewers: 13500, chatRate: 95, cumulativeSuperChat: 65000, event: "" },
    { time: "21:25", viewers: 14000, chatRate: 110, cumulativeSuperChat: 90000, event: "カウントダウン開始" },
    { time: "21:30", viewers: 24500, chatRate: 480, cumulativeSuperChat: 350000, event: "★新衣装お披露目！" }, // ここで爆発
    { time: "21:35", viewers: 26000, chatRate: 320, cumulativeSuperChat: 520000, event: "スクショタイム" },
    { time: "21:40", viewers: 23000, chatRate: 180, cumulativeSuperChat: 580000, event: "" },
    { time: "21:45", viewers: 21500, chatRate: 140, cumulativeSuperChat: 630000, event: "新グッズ告知" },
    { time: "21:50", viewers: 20000, chatRate: 125, cumulativeSuperChat: 690000, event: "" },
    { time: "21:55", viewers: 19500, chatRate: 160, cumulativeSuperChat: 780000, event: "エンディング・スパチャ読み" },
    { time: "22:00", viewers: 15000, chatRate: 80, cumulativeSuperChat: 820000, event: "配信終了" }
];