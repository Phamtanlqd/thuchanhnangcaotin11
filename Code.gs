/**
 * BÀI 8 - Google Apps Script backend
 * Thiết lập:
 * 1. Tạo Google Sheet, đặt tên tab đầu tiên là Submissions.
 * 2. Extensions > Apps Script, dán toàn bộ mã này.
 * 3. Trong Project Settings > Script properties, đặt SHEET_ID = ID Google Sheet.
 * 4. Deploy > New deployment > Web app. Execute as: Me.
 *    Who has access: chọn phù hợp chính sách trường. Nếu endpoint công khai,
 *    KHÔNG lưu dữ liệu nhạy cảm và không dùng endpoint GET công khai cho dashboard riêng tư.
 * 5. Sao chép Web app URL vào assets/config.js.
 */
const SHEET_NAME = "Submissions";
const HEADERS = [
  "submittedAt","studentName","className","groupName",
  "emailSubject","emailGreeting","emailBody","emailClosing",
  "replyText","attachmentReflection","evidenceNote",
  "docLink","shareRole","shareExplain",
  "socialPost","socialHashtags","socialImage",
  "safetyChoices","safetyReason","aiPrompt","aiDraft","aiFinal","aiChanges"
];
function getSheet_(){
  const id=PropertiesService.getScriptProperties().getProperty("SHEET_ID");
  if(!id) throw new Error("Thiếu Script Property SHEET_ID");
  const ss=SpreadsheetApp.openById(id);
  let sh=ss.getSheetByName(SHEET_NAME);
  if(!sh) sh=ss.insertSheet(SHEET_NAME);
  if(sh.getLastRow()===0) sh.appendRow(HEADERS);
  return sh;
}
function doPost(e){
  try{
    const raw=e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    const data=JSON.parse(raw);
    const sh=getSheet_();
    const row=HEADERS.map(k=>sanitize_(data[k]));
    sh.appendRow(row);
    return json_({ok:true,message:"Submission recorded"});
  }catch(err){
    return json_({ok:false,error:String(err)});
  }
}
function doGet(){
  // CẢNH BÁO: doGet trả dữ liệu cho người có thể truy cập endpoint.
  // Dùng chỉ khi chính sách trường cho phép. Với dữ liệu cá nhân, hãy bỏ doGet
  // hoặc triển khai dashboard nội bộ có xác thực.
  try{
    const sh=getSheet_(), values=sh.getDataRange().getValues();
    if(values.length<2) return json_({records:[]});
    const headers=values.shift();
    const records=values.map(row=>Object.fromEntries(headers.map((h,i)=>[h,row[i] instanceof Date ? row[i].toISOString() : row[i]])));
    return json_({records:records});
  }catch(err){return json_({records:[],error:String(err)});}
}
function sanitize_(v){
  let s = v===undefined || v===null ? "" : String(v);
  // Prevent spreadsheet formula injection.
  if(/^[=+\-@]/.test(s)) s="'"+s;
  return s.slice(0,20000);
}
function json_(obj){
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
