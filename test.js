const KamarNotices = require("./");
const notices = new KamarNotices("https://kamar.camhigh.school.nz");
notices.getNotices().then((d) => {
  console.log(d);
});
