const axios = require("axios");
const cheerio = require("cheerio");
const tabletojson = require("tabletojson").Tabletojson;

class KamarNotices {
  constructor(portal) {
    //check if URL
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
      "i"
    );

    if (pattern.test(portal)) {
      this.portal = `${portal}/index.php`;
    } else {
      throw new Error("Portal must be a valid URL");
    }
  }

  getNotices() {
    return new Promise((resolve, reject) => {
      axios
        .get(this.portal)
        .then((data) => {
          const $ = cheerio.load(data.data);
          const html = $(".table-responsive").last().html();
          const json = tabletojson.convert(html)[0];
          const result = [];
          for (let i = 0; i < json.length; i += 2) {
            let header = json[i];
            let content = json[i + 1];
            result.push({
              for: header["0"],
              title: header["1"],
              staff: header["2"],
              content: content["0"],
            });
          }
          resolve(result);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

module.exports = KamarNotices;
