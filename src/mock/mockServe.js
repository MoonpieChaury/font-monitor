// 模拟虚拟资源
// 引入mockjs, 所有接口的响应定义
import Mock from "mockjs";

import { pageData } from "./pageInfoData";
import { apiErrData } from "./apiData";
import { jsData } from "@/mock/jsErrorData";
import { resourceData } from "@/mock/resourceData";
import { userData } from "@/mock/userAnalysData";


Mock.mock("/mock/pageInfoData/pageData", {
  code: 200,
  data: pageData
});

Mock.mock("/mock/apiData/apiData", {
  code: 200,
  data: apiErrData
});


Mock.mock("/mock/jsErrorData/jsData", {
  code: 200,
  data: jsData
});

Mock.mock("/mock/resourceData/resData", {
  code: 200,
  data: resourceData
});

Mock.mock("/mock/userAnalysData/userData", {
  code: 200,
  data: userData.userLog
});

Mock.mock("/mock/userAnalysData/userPath", {
  code: 200,
  data: userData.userPath
});
