import { WechatyBuilder, ScanStatus, log } from "wechaty";
import qrcodeTerminal from "qrcode-terminal";

const wechaty = WechatyBuilder.build({
  name: "ding-bot",
  // puppet: 'wechaty-puppet-xp'
}); // get a Wechaty instance

const onScan = (qrcode, status) => {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    const qrcodeImageUrl = [
      "https://wechaty.js.org/qrcode/",
      encodeURIComponent(qrcode),
    ].join("");
    log.info(
      "StarterBot",
      "onScan: %s(%s) - %s",
      ScanStatus[status],
      status,
      qrcodeImageUrl
    );

    qrcodeTerminal.generate(qrcode, { small: true }); // show qrcode on console
  } else {
    log.info("StarterBot", "onScan: %s(%s)", ScanStatus[status], status);
  }
};

async function onMessage(msg) {
  log.info("StarterBot", msg.toString());
  console.log(`Message: ${msg}`)

  if (msg.text() === "ding") {
    await msg.say("dong");
  }
}

wechaty
  .on("scan", onScan)
  .on("login", (user) => console.log(`User ${user} logged in`))
  .on("message", onMessage);
wechaty.start();
