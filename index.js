// デバイス接続ボタンを作る
(function createDeviceConnectButton() {
  // ボタンの要素を作成
  const deviceConnectButton = document.createElement("div");
  deviceConnectButton.id = "device_add_button";

  // ボタンのスタイルを設定
  const imageUrl =
    "https://sumeshi96.github.io/public-images/game-pad-icon.svg";
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
})();

// Joy-Conを接続する
const deviceConnectButton = document.getElementById("device_add_button");
deviceConnectButton.addEventListener("click", async () => {
  const devices = await navigator.hid.requestDevice({
    filters: [{ vendorId: 0x057e, productId: 0x2007 }],
  });

  const device = devices[0];

  await device.open();
  //await device.sendReport(0x01, createQuery(0x03, 0x30));
  // ボタン入力を取得する
  device.addEventListener("inputreport", (event) => handleInputReport(event));
});

// 取得した情報を元にボタン入力を判定する
const handleInputReport = (event) => {
  const data = new Uint8Array(event.data.buffer);
  const { device } = event;

  const buttonMappings = {
    0: {
      A: 0x01,
      X: 0x02,
      B: 0x04,
      Y: 0x08,
      SL: 0x10,
      SR: 0x20,
      R: 0x40,
      ZR: 0x80,
    },
    1: {
      PLUS: 0x02,
      R_Stick: 0x08,
      HOME: 0x10,
      R: 0x40,
      ZR: 0x80,
    },
    2: {
      R_Up: 0x00,
      R_Right_Up: 0x01,
      R_Right: 0x02,
      R_Right_Down: 0x03,
      R_Down: 0x04,
      R_Left_Down: 0x05,
      R_Left: 0x06,
      R_Left_Up: 0x07,
    },
  };

  for (const byteIndex in buttonMappings) {
    for (const [button, mask] of Object.entries(buttonMappings[byteIndex])) {
      if (data[byteIndex] & mask) {
        pushedButtonEvent(button, device, event);
      }
    }
  }
};

//ボタンに割り当てるキーボード
const LEFT_ARROW_KEY = "ArrowLeft";
const LEFT_ARROW_KEY_CODE = 37;
const RIGHT_ARROW_KEY = "ArrowRight";
const RIGHT_ARROW_KEY_CODE = 39;
const ESC_KEY = "Esc";
const ESC_KEY_CODE = 27;
const F5_KEY = "F5";
const F5_KEY_CODE = 116;
const HOME_KEY = "Home";
const HOME_KEY_CODE = 36;
const END_KEY = "End";
const END_KEY_CODE = 35;
const F11_KEY = "F11";
const F11_KEY_CODE = 122;

const pressKey = (key, keyCode, isCtrlPressed) => {
  const activeElement = document.activeElement;
  const targetDocument =
    activeElement.tagName === "IFRAME"
      ? activeElement.contentDocument
      : document;
  ["keydown", "keyup"].forEach((typeArg) => {
    targetDocument.body.dispatchEvent(
      new KeyboardEvent(typeArg, {
        key,
        keyCode,
        bubbles: true,
        ctrlKey: isCtrlPressed,
      })
    );
  });
};

// ボタンが押された時の処理
const pushedButtonEvent = (button, device, event) => {
  console.log(`${button} button pressed!`);
  switch (button) {
    case "A":
      pressKey(RIGHT_ARROW_KEY, RIGHT_ARROW_KEY_CODE, false);
      break;
    case "B":
      pressKey(END_KEY, END_KEY_CODE, false);
      break;
    case "X":
      pressKey(HOME_KEY, HOME_KEY_CODE, false);
      break;
    case "Y":
      pressKey(LEFT_ARROW_KEY, LEFT_ARROW_KEY_CODE, false);
      break;
    case "PLUS":
      pressKey(F5_KEY, F5_KEY_CODE, true);
      break;
    case "HOME":
      pressKey(ESC_KEY, ESC_KEY_CODE, false);
      break;
    case "ZR":
      console.log("ZR pressed!");
      pressKey(F11_KEY, F11_KEY_CODE, false);
      break;
  }
};
