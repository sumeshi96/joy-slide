// デバイス接続ボタンを作る
(function createDeviceConnectButton(){
    // ボタンの要素を作成
    const deviceConnectButton = document.createElement("div");
    deviceConnectButton.id = "device_add_button";

    // ボタンのスタイルを設定
    const imageUrl = "https://sumeshi96.github.io/public-images/game-pad-icon.svg";
    const deviceConnectButtonImage = document.createElement("img");
    deviceConnectButtonImage.src = imageUrl;
    deviceConnectButtonImage.alt = "game-pad-icon";
    deviceConnectButtonImage.width = 22;
    deviceConnectButtonImage.height = 22;
    deviceConnectButtonImage.style.margin = "5px 5px 0 0";

    // ボタンをページに追加
    deviceConnectButton.appendChild(deviceConnectButtonImage);
    const targetElement = document.getElementsByClassName(
        "docs-titlebar-buttons"
    )[0];
    targetElement.insertAdjacentElement("afterbegin", deviceConnectButton);
} ());

//
const deviceConnectButton = document.getElementById("device_add_button");
deviceConnectButton.addEventListener("click", async () => {
    console.log("deviceConnectButton pushed!");
});