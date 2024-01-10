const images = [
  "https://res.cloudinary.com/dtnixnyfz/image/upload/v1701232291/carousel-images/drvh248dfklffwhjl317.png",
  "https://res.cloudinary.com/dtnixnyfz/image/upload/v1693366004/ckzdihywlnsudfpebvzh.png",
  "https://res.cloudinary.com/dtnixnyfz/image/upload/v1635574944/slide-1604603698852-3298390421-3034163542f9a763d759a79927a83f281604603888-1920-1920_vd5imm.jpg",
  "https://res.cloudinary.com/dtnixnyfz/image/upload/v1635574944/7_tienda_ant83631-db727160425454aac716326815857906-1024-1024_oorvge.jpg",
  "https://res.cloudinary.com/dtnixnyfz/image/upload/v1701232543/carousel-images/jtysufkypqrqy5g0zxve.png",
  "https://res.cloudinary.com/dtnixnyfz/image/upload/v1701232606/carousel-images/dzm5qqc6lmndxp6wloux.png",
  "https://res.cloudinary.com/dtnixnyfz/image/upload/v1701232718/carousel-images/fifhpdnqthqth3wk1rak.png",
  "https://res.cloudinary.com/dtnixnyfz/image/upload/v1701232812/carousel-images/qhti38yh63jo8m0gvmsg.png",
  "https://res.cloudinary.com/dtnixnyfz/image/upload/v1701232984/carousel-images/naku5tfhr39eycr01c9z.png",
  "https://res.cloudinary.com/dtnixnyfz/image/upload/v1701233087/carousel-images/foyhi3qxjeaheeteavn1.png",
  "https://res.cloudinary.com/dtnixnyfz/image/upload/v1701233193/carousel-images/jvygkiuclb9mlw7z6a40.png",
  "https://res.cloudinary.com/dtnixnyfz/image/upload/v1701233262/carousel-images/cukntlfmfqxzlvtyn4fr.png",
  "https://res.cloudinary.com/dtnixnyfz/image/upload/v1701233386/carousel-images/digwg8l3hyu6mhcq5ydq.png",
  "https://res.cloudinary.com/dtnixnyfz/image/upload/v1701233574/carousel-images/lblxidl1mja75yij3rcg.jpg",
  "https://res.cloudinary.com/dtnixnyfz/image/upload/v1701233697/carousel-images/jhpkiah5ekjvsutfley1.jpg",
  "https://res.cloudinary.com/dtnixnyfz/image/upload/v1701233803/carousel-images/uppy2hahojl4k0zqahue.jpg",
  "https://res.cloudinary.com/dtnixnyfz/image/upload/v1701233866/carousel-images/yze8lakwpskrymgamnla.jpg",
  "https://res.cloudinary.com/dtnixnyfz/image/upload/v1701234106/carousel-images/q8a5diokv38hfzxpdunz.jpg",
  "https://res.cloudinary.com/dtnixnyfz/image/upload/v1701234189/carousel-images/bddj4ths6rj0pj60yi0w.jpg",
  "https://res.cloudinary.com/dtnixnyfz/image/upload/v1701234276/carousel-images/uwyitprzrfvxefkjf94u.jpg",
];

export class ImagesController {
  static getAll(req, res) {
    return res.json(images);
  }
}
