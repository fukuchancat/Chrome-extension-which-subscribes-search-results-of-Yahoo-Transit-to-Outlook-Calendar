const subscribe = event => {
    // ルート情報の親要素を取得
    const detail = event.target.closest("div[id*=route]");

    // 時刻の各要素に年月日情報を追加する
    const searchTime = document.querySelector(".navSearchTime .time");
    const dateNumbers = searchTime.textContent.match(/(\d+)年(\d+)月(\d+)日/);
    const times = detail.querySelectorAll(".time li");
    let previousDate = new Date(dateNumbers[1], dateNumbers[2] - 1, dateNumbers[3]); // ひとつ前の時刻
    for (let time of times) {
        const timeNumbers = time.textContent.match(/(\d+):(\d+)/);
        const currentDate = new Date(previousDate.getFullYear(), previousDate.getMonth(), previousDate.getDate(), timeNumbers[1], timeNumbers[2]);

        // ひとつ前の時刻より巻き戻っているように見えたら、日を跨いでるので1日加算
        while (currentDate < previousDate) {
            currentDate.setDate(currentDate.getDate() + 1);
        }
        previousDate = currentDate;

        time.dataset.date = currentDate.toISOString();
    }

    // 各駅と、その駅間の要素を取得
    const stations = detail.querySelectorAll(".station");
    const accesses = detail.querySelectorAll(".access");
    for (let i = 0; i < accesses.length; i++) {
        const origin = stations[i]; // 出発駅の要素
        const destination = stations[i + 1]; // 到着駅の要素
        const access = accesses[i]; // 駅間の要素

        // 歩きの場合は飛ばす
        if (access.matches(".walk")) {
            continue;
        }

        // 出発駅
        const location = origin.querySelector("dl>dt>a").textContent;

        // 列車名
        const transport = access.querySelector(".transport div");
        const subject = transport.textContent.replace(/(\n|\[.*\])/g, "");

        // 発着番線
        const platform = access.querySelector(".platform");
        const body = platform ? platform.textContent : "";

        // 出発・到着時刻
        const departureTime = origin.querySelector(".time li:last-child");
        const arrivalTime = destination.querySelector(".time li:first-child");
        const startdt = departureTime.dataset.date;
        const enddt = arrivalTime.dataset.date;

        // OutlookカレンダーのURL生成
        const url = new URL("https://outlook.office.com/owa/");
        url.searchParams.append("path", "/calendar/action/compose")
        url.searchParams.append("location", location);
        url.searchParams.append("subject", subject);
        url.searchParams.append("body", body);
        url.searchParams.append("startdt", startdt);
        url.searchParams.append("enddt", enddt);

        // URLを開く
        window.open(url.toString());
    }
}

(() => {
    // 「時刻なし」で検索している場合は何もしない
    const type = new URLSearchParams(window.location.search).get("type");
    if (type == 5) {
        return;
    }

    // 既存の「カレンダーに登録」ボタンを取得し、隣に新しいボタンを追加する
    const shareCals = document.querySelectorAll(".shareCal");
    for (let yahooShareCal of shareCals) {
        // 「Outlookカレンダーに登録」ボタンを作成
        const li = document.createElement("li");
        const icon = yahooShareCal.closest("li").querySelector(".icnCal").cloneNode(true);
        const outlookShareCal = document.createElement("a");

        // ボタンにイベントを設定
        outlookShareCal.href = "javascript:void(0);";
        outlookShareCal.addEventListener("click", subscribe);

        // ボタンの文言変更
        yahooShareCal.textContent = "Yahoo!カレンダーに登録";
        outlookShareCal.textContent = "Outlookカレンダーに登録";

        // ボタンをDOMに追加
        li.append(icon, outlookShareCal);
        yahooShareCal.closest("ul").appendChild(li);
    }
})();
