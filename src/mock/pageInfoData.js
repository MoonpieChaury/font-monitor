// export {
//     pageCardList,
//     pageToday,
//     pageWeek,
//     pageList,
//     pageWater,
//     pageSystem,
//     pageNetwork,
//     pageBrowser
// }

export { pageData };


const pageCardList = [
  {
    title: "首字节",
    value: "205 ms",
    rate: "-1.91%"
  },
  {
    title: "DOM Ready",
    value: "1645 ms",
    rate: "+2.34%"
  },
  {
    title: "页面完全加载",
    value: "2,482 ms",
    rate: "+1.26%"
  },
  {
    title: "2s快开比",
    value: "57.45%",
    rate: "-1.15%"
  }
];

//11.23
const pageToday = [
  {
    tcp: 21,
    res: 996,
    dprs: 1716,
    ctdl: 15,
    dns: 4,
    ttfb: 160,
    docPV: 523,
    t0: 197,
    t1: 1934,
    t2: 2931,
    key: "2022-11-23 00:00:00"
  },
  {
    tcp: 21,
    res: 754,
    dprs: 1407,
    ctdl: 16,
    dns: 4,
    ttfb: 157,
    docPV: 624,
    t0: 195,
    t1: 1625,
    t2: 2380,
    key: "2022-11-23 01:00:00"
  },
  {
    tcp: 43,
    res: 860,
    dprs: 1401,
    ctdl: 18,
    dns: 4,
    ttfb: 153,
    docPV: 566,
    t0: 209,
    t1: 1635,
    t2: 2496,
    key: "2022-11-23 02:00:00"
  },
  {
    tcp: 26,
    res: 815,
    dprs: 1431,
    ctdl: 19,
    dns: 3,
    ttfb: 156,
    docPV: 522,
    t0: 195,
    t1: 1653,
    t2: 2468,
    key: "2022-11-23 03:00:00"
  },
  {
    tcp: 27,
    res: 863,
    dprs: 1481,
    ctdl: 17,
    dns: 3,
    ttfb: 154,
    docPV: 549,
    t0: 201,
    t1: 1705,
    t2: 2569,
    key: "2022-11-23 04:00:00"
  },
  {
    tcp: 50,
    res: 792,
    dprs: 1513,
    ctdl: 16,
    dns: 3,
    ttfb: 150,
    docPV: 516,
    t0: 219,
    t1: 1755,
    t2: 2548,
    key: "2022-11-23 05:00:00"
  },
  {
    tcp: 23,
    res: 1003,
    dprs: 1437,
    ctdl: 19,
    dns: 3,
    ttfb: 164,
    docPV: 604,
    t0: 201,
    t1: 1662,
    t2: 2666,
    key: "2022-11-23 06:00:00"
  },
  {
    tcp: 18,
    res: 787,
    dprs: 1533,
    ctdl: 19,
    dns: 3,
    ttfb: 154,
    docPV: 604,
    t0: 187,
    t1: 1747,
    t2: 2534,
    key: "2022-11-23 07:00:00"
  },
  {
    tcp: 24,
    res: 906,
    dprs: 1372,
    ctdl: 20,
    dns: 3,
    ttfb: 154,
    docPV: 623,
    t0: 194,
    t1: 1593,
    t2: 2499,
    key: "2022-11-23 08:00:00"
  },
  {
    tcp: 20,
    res: 933,
    dprs: 1469,
    ctdl: 13,
    dns: 3,
    ttfb: 159,
    docPV: 588,
    t0: 198,
    t1: 1686,
    t2: 2619,
    key: "2022-11-23 09:00:00"
  },
  {
    tcp: 20,
    res: 803,
    dprs: 1358,
    ctdl: 12,
    dns: 3,
    ttfb: 161,
    docPV: 558,
    t0: 195,
    t1: 1573,
    t2: 2377,
    key: "2022-11-23 10:00:00"
  },
  {
    tcp: 24,
    res: 898,
    dprs: 1425,
    ctdl: 20,
    dns: 3,
    ttfb: 155,
    docPV: 648,
    t0: 195,
    t1: 1647,
    t2: 2545,
    key: "2022-11-23 11:00:00"
  },
  {
    tcp: 31,
    res: 737,
    dprs: 1491,
    ctdl: 17,
    dns: 5,
    ttfb: 151,
    docPV: 566,
    t0: 207,
    t1: 1721,
    t2: 2459,
    key: "2022-11-23 12:00:00"
  },
  {
    tcp: 29,
    res: 892,
    dprs: 1487,
    ctdl: 18,
    dns: 5,
    ttfb: 154,
    docPV: 585,
    t0: 206,
    t1: 1718,
    t2: 2611,
    key: "2022-11-23 13:00:00"
  },
  {
    tcp: 41,
    res: 747,
    dprs: 1507,
    ctdl: 13,
    dns: 4,
    ttfb: 147,
    docPV: 625,
    t0: 203,
    t1: 1730,
    t2: 2478,
    key: "2022-11-23 14:00:00"
  },
  {
    tcp: 63,
    res: 867,
    dprs: 1355,
    ctdl: 16,
    dns: 4,
    ttfb: 161,
    docPV: 636,
    t0: 240,
    t1: 1617,
    t2: 2484,
    key: "2022-11-23 15:00:00"
  },
  {
    tcp: 45,
    res: 750,
    dprs: 1352,
    ctdl: 15,
    dns: 5,
    ttfb: 150,
    docPV: 607,
    t0: 215,
    t1: 1588,
    t2: 2339,
    key: "2022-11-23 16:00:00"
  },
  {
    tcp: 42,
    res: 857,
    dprs: 1442,
    ctdl: 26,
    dns: 2,
    ttfb: 157,
    docPV: 578,
    t0: 213,
    t1: 1689,
    t2: 2547,
    key: "2022-11-23 17:00:00"
  },
  {
    tcp: 47,
    res: 799,
    dprs: 1443,
    ctdl: 27,
    dns: 4,
    ttfb: 154,
    docPV: 632,
    t0: 229,
    t1: 1707,
    t2: 2506,
    key: "2022-11-23 18:00:00"
  },
  {
    tcp: 23,
    res: 787,
    dprs: 1402,
    ctdl: 24,
    dns: 4,
    ttfb: 160,
    docPV: 632,
    t0: 203,
    t1: 1636,
    t2: 2423,
    key: "2022-11-23 19:00:00"
  },
  {
    tcp: 49,
    res: 713,
    dprs: 1291,
    ctdl: 13,
    dns: 4,
    ttfb: 146,
    docPV: 527,
    t0: 211,
    t1: 1522,
    t2: 2235,
    key: "2022-11-23 20:00:00"
  },
  {
    tcp: 47,
    res: 837,
    dprs: 1422,
    ctdl: 25,
    dns: 3,
    ttfb: 144,
    docPV: 578,
    t0: 205,
    t1: 1657,
    t2: 2494,
    key: "2022-11-23 21:00:00"
  },
  {
    tcp: 27,
    res: 824,
    dprs: 1381,
    ctdl: 15,
    dns: 4,
    ttfb: 163,
    docPV: 577,
    t0: 208,
    t1: 1610,
    t2: 2434,
    key: "2022-11-23 22:00:00"
  },
  {
    tcp: 25,
    res: 851,
    dprs: 1498,
    ctdl: 14,
    dns: 5,
    ttfb: 151,
    docPV: 565,
    t0: 192,
    t1: 1713,
    t2: 2564,
    key: "2022-11-23 23:00:00"
  }
];

//11.16-11.23
const pageWeek = [
  {
    tcp: 40,
    res: 859,
    dprs: 1400,
    ctdl: 18,
    dns: 4,
    ttfb: 155,
    docPV: 13819,
    t0: 214,
    t1: 1637,
    t2: 2497,
    key: "2022-11-16 00:00:00"
  },
  {
    tcp: 36,
    res: 829,
    dprs: 1398,
    ctdl: 19,
    dns: 3,
    ttfb: 156,
    docPV: 14126,
    t0: 210,
    t1: 1634,
    t2: 2463,
    key: "2022-11-17 00:00:00"
  },
  {
    tcp: 36,
    res: 828,
    dprs: 1433,
    ctdl: 18,
    dns: 4,
    ttfb: 156,
    docPV: 13772,
    t0: 210,
    t1: 1668,
    t2: 2497,
    key: "2022-11-18 00:00:00"
  },
  {
    tcp: 35,
    res: 875,
    dprs: 1405,
    ctdl: 19,
    dns: 3,
    ttfb: 155,
    docPV: 14291,
    t0: 208,
    t1: 1638,
    t2: 2514,
    key: "2022-11-19 00:00:00"
  },
  {
    tcp: 41,
    res: 855,
    dprs: 1413,
    ctdl: 17,
    dns: 3,
    ttfb: 156,
    docPV: 13787,
    t0: 216,
    t1: 1653,
    t2: 2508,
    key: "2022-11-20 00:00:00"
  },
  {
    tcp: 37,
    res: 851,
    dprs: 1429,
    ctdl: 17,
    dns: 4,
    ttfb: 156,
    docPV: 14104,
    t0: 212,
    t1: 1664,
    t2: 2515,
    key: "2022-11-21 00:00:00"
  },
  {
    tcp: 35,
    res: 833,
    dprs: 1388,
    ctdl: 21,
    dns: 4,
    ttfb: 157,
    docPV: 14180,
    t0: 210,
    t1: 1625,
    t2: 2459,
    key: "2022-11-22 00:00:00"
  },
  {
    tcp: 33,
    res: 836,
    dprs: 1441,
    ctdl: 18,
    dns: 4,
    ttfb: 155,
    docPV: 14033,
    t0: 205,
    t1: 1670,
    t2: 2507,
    key: "2022-11-23 00:00:00"
  }
];

//t0首字节， t1 dom ready， t2 页面完全加载
const pageList = [
  {
    docPV: 62,
    t0: 365,
    t1: 4791,
    t2: 6394,
    key: "https://www.demo.com/api/t13745z"
  },
  {
    docPV: 56,
    t0: 241,
    t1: 7346,
    t2: 8821,
    key: "https://www.demo.com/api/t13yggb"
  },
  {
    docPV: 49,
    t0: 185,
    t1: 785,
    t2: 1044,
    key: "https://sfa.demo-inc.com/api/t13ygpg/edit"
  },
  {
    docPV: 41,
    t0: 69,
    t1: 2886,
    t2: 3212,
    key: "https://www.demo.com/"
  },
  {
    docPV: 31,
    t0: 347,
    t1: 706,
    t2: 1439,
    key: "https://sfa.demo-inc.com/api/headlines"
  },
  {
    docPV: 31,
    t0: 190,
    t1: 605,
    t2: 864,
    key: "https://www.demo.com/api/kb"
  },
  {
    docPV: 29,
    t0: 121,
    t1: 365,
    t2: 782,
    key: "https://www.demo.com/api/profile"
  },
  {
    docPV: 28,
    t0: 176,
    t1: 1191,
    t2: 1488,
    key: "https://www.demo.com/api/t13c"
  },
  {
    docPV: 27,
    t0: 74,
    t1: 1184,
    t2: 2351,
    key: "https://sfa.demo-inc.com/api/members"
  },
  {
    docPV: 27,
    t0: 175,
    t1: 1134,
    t2: 2174,
    key: "https://sfa.demo-inc.com/api/t137bip"
  }
];

//瀑布图
const pageWater = {
  t0: 205,
  t1: 1670,
  t2: 2507,
  dns: 4,
  tcp: 33,
  ssl: 0,
  ttfb: 155,
  ctdl: 18,
  dprs: 1441,
  res: 836
};

//小卡片
const pageNetwork = {
  title: "网络类型",
  itemList: [
    {
      docPV: 9019,
      t2: 2277,
      key: "4g"
    },
    {
      docPV: 1369,
      t2: 3216,
      key: "wifi"
    },
    {
      docPV: 930,
      t2: 3087,
      key: "未知"
    }
  ]
};

const pageSystem = {
  title: "操作系统",
  itemList: [
    {
      docPV: 446,
      key: "mac os x"
    },
    {
      docPV: 320,
      key: "windows"
    },
    {
      docPV: 563,
      key: "android"
    }
  ]
};

const pageBrowser = {
  title: "浏览器类型",
  itemList: [
    {
      docPV: 612,
      key: "chrome"
    },
    {
      docPV: 845,
      key: "safari"
    },
    {
      docPV: 282,
      key: "wechat"
    },
    {
      docPV: 28,
      key: "uni-app appservice"
    },
    {
      docPV: 269,
      key: "firefox"
    },
    {
      docPV: 23,
      key: "edge"
    }
  ]
};


const pageData = {
  "pageCardList": pageCardList,
  "pageToday": pageToday,
  "pageWeek": pageWeek,
  "pageList": pageList,
  "pageWater": pageWater,
  "pageSystem": pageSystem,
  "pageNetwork": pageNetwork,
  "pageBrowser": pageBrowser
};
