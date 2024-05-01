// interface api 꿀팁★
/*
    1) api값 chrome 콘솔 list ► 우측 마우스 -> store object as global variable -> temp1에 저장됨
    2) > Object.keys(temp1).join() -> 객체 keys 한줄에 출력 복사
    3) Ctrl(Command) + D : 같은 문자열 ','(comma)를 선택 후 엔터 후 ':'와 ';' 추가
    4) > Object.values(temp1).map(e => typeof e).join(); -> value의 형식 한줄에 출력 복사
    5) 위와 같은 방식으로 Comma 엔터후 잘라내기 Ctrl(Command) + x
    6) 이전 복사 해둔 keys값 전체 드래그 선택 -> Shift+Alt(Option)+i : 선택한 모든 문자열을 기준으로 우측 끝 위치
    6) 각 문자열에 커서가 생겼으면 ':'와 ';' 사이에 커서를 두고 Ctrl(Command) + v 복사

  */
export interface IAirData {
  imageUrl4: string;
  informCode: string;
  imageUrl5: string;
  imageUrl6: string;
  actionKnack: object;
  informCause: string;
  informOverall: string;
  informData: string;
  informGrade: string;
  dataTime: string;
  imageUrl3: string;
  imageUrl2: string;
  imageUrl1: string;
}

export interface IArpltnStatsSvc {
  daegu: string;
  chungnam: string;
  incheon: string;
  daejeon: string;
  gyeongbuk: string;
  sejong: string;
  gwangju: string;
  jeonbuk: string;
  gangwon: string;
  ulsan: string;
  jeonnam: string;
  seoul: string;
  busan: string;
  jeju: string;
  chungbuk: string;
  gyeongnam: string;
  dataTime: string;
  dataGubun: string;
  gyeonggi: string;
  itemCode: string;
}

export interface ICtprvnMesureSidoLIst {
  [key: string]: any;
  cityName: string;
  cityNameEng: string;
  coValue: string;
  dataGubun: string;
  dataTime: string;
  districtCode: string;
  districtNumSeq: string;
  itemCode: string;
  khaiValue: string;
  no2Value: string;
  numOfRows: string;
  o3Value: string;
  pageNo: string;
  pm10Value: string;
  pm25Value: string;
  resultCode: string;
  resultMsg: string;
  returnType: string;
  searchCondition: string;
  serviceKey: string;
  sidoName: string;
  so2Value: string;
  totalCount: string;
}

export interface IMsrstnAcctoRltmMesureDnsty {
  so2Grade: string;
  coFlag: object;
  khaiValue: string;
  so2Value: string;
  coValue: string;
  pm25Flag: object;
  pm10Flag: object;
  pm10Value: string;
  o3Grade: string;
  khaiGrade: string;
  pm25Value: string;
  no2Flag: object;
  no2Grade: string;
  o3Flag: object;
  pm25Grade: string;
  so2Flag: object;
  dataTime: string;
  coGrade: string;
  no2Value: string;
  pm10Grade: string;
  o3Value: string;
}