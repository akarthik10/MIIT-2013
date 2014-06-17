var SS_ID = "0AqTfmI2fgbDydElQejBUSTItUnRxb2o2LTR3dFo2cHc";

function doGet(request) {
  Logger.log(request);
  initSheet();
  if(request.parameters.action=="register"){
  if(checkPhone(request.parameters.phone))
     return respond("PHONE_PRESENT");
  if(checkEmail(request.parameters.email))
     return respond("EMAIL_PRESENT");
      insertData(request);
     return respond("OK_REGISTERED");
     }
     else if(request.parameters.action=="contact"){
     var b = request;
       MailApp.sendEmail(getAdmins(),"MI-IT - 2013 : Contact Us Notification","",{ htmlBody:'<h3 style="background:#601407; color: #FFFFFF; padding: 15px; font-size: 25px; font-family: \'Trebuchet MS\', Helvetica, sans-serif;">MI-IT 2013: Contact Us - Response</h3><p style="color:#601407; font-size: 20px; font-family: \'Trebuchet MS\', Helvetica, sans-serif;">Hello, <br /> A user tried to contact the MI-IT 2013 team from the "Contact Us" form of the website. The name of the user is <br />'+b.parameters.name+' ('+b.parameters.email+').<br /> Below is the message they have sent: <br /><p style="font-size: 18px;">'+b.parameters.message+'</p></p><p style="color:#4B8DF9; font-size:10px;">You have received this email because you are one of the administrators of the MI-IT 2013 website. A Copy of this email has been sent to all administrators. Any one of them can reply to the user.</p> ' });
       return respond("OK_CONTACT");
     }
}


function respond(str){

return ContentService.createTextOutput(
    'process' + '(' + JSON.stringify(str) + ')')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);

}


function initSheet(){
var sheetinit = SpreadsheetApp.openById(SS_ID);

if(!sheetinit.getSheetByName("Participants"))
    sheetinit.getSheets()[0].setName("Participants");
    
if(!sheetinit.getSheetByName("Administrators")){
    sheetinit.insertSheet("Administrators",1);
    }
       
  sheetinit.setActiveSheet(sheetinit.getSheetByName("Participants"));  
 }
 
 
 function checkPhone(phone) {
  var sheet = SpreadsheetApp.openById(SS_ID).getSheetByName("Participants");
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();

  for (var i = 0; i <= numRows - 1; i++) {
    if(values[i][6] == phone) return true;
  }
  
  return false;
}


 function checkEmail(email) {
  var sheet = SpreadsheetApp.openById(SS_ID).getSheetByName("Participants");
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();

  for (var i = 0; i <= numRows - 1; i++) {
    if(values[i][7] == email ) return true;
  }
  
  return false;
}

function getAdmins(){
var sheet = SpreadsheetApp.openById(SS_ID).getSheetByName("Administrators");
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  var eList="";
  for (var i = 0; i <= numRows - 1; i++) {
    eList+=values[i][0]+",";
  }
  return eList;
  }


function insertData(b){

var sheetinit = SpreadsheetApp.openById(SS_ID);
var sheet = sheetinit.getSheetByName("Participants");
var row   = sheet.getLastRow() + 1;
  sheet.appendRow([row, b.parameters.name,b.parameters.designation,b.parameters.department,b.parameters.institution,b.parameters.address,b.parameters.phone, b.parameters.email, b.parameters.ddamount, b.parameters.ddno, b.parameters.dddate, b.parameters.ddbank]);
  var regdetail = '<p style="color:#601407; font-size: 20px; font-family: \'Trebuchet MS\', Helvetica, sans-serif;"> Your registration details :<br />Registration No. : MIIT-'+row+'<br />Name : '+b.parameters.name+' <br /> Designation : '+b.parameters.designation+' <br />Department : '+b.parameters.department+' <br /> Institution : '+b.parameters.institution+'<br /> Address : '+b.parameters.address+'<br /> Phone : '+b.parameters.phone+'<br /> DD Amount : Rs. '+b.parameters.ddamount+'<br /> DD No. : '+b.parameters.ddno+' <br /> DD Date : '+b.parameters.dddate+ '<br /> DD Bank : '+b.parameters.ddbank+' <br /></p>';
  var eventDetails = '<p style="color:#601407; font-size: 20px; font-family: \'Trebuchet MS\', Helvetica, sans-serif;">Event details:<br /> Date: 28th August to 30th August, 2013<br /> Venue: Seminar Hall, Bangalore Institute of Technology, K.R. Road, V.V. Puram, Bangalore - 560004</p>';
  MailApp.sendEmail(b.parameters.email,"Machine Intelligence and Imaging Technologies Workshop Registration successful","",{ htmlBody:'<h3 style="background:#601407; color: #FFFFFF; padding: 15px; font-size: 25px; font-family: \'Trebuchet MS\', Helvetica, sans-serif;">MI-IT 2013 Registration Successful</h3><p style="color:#601407; font-size: 20px; font-family: \'Trebuchet MS\', Helvetica, sans-serif;">Hello '+b.parameters.name+', <br /> You have been successfully registered for the three day workshop on <b>Machine Intelligence and Imaging Technologies - 2013.</p>'+regdetail+eventDetails+'<p style="color:#601407; font-size: 20px; font-family: \'Trebuchet MS\', Helvetica, sans-serif;">Thank you for your interest.<br />Regards, <br />MI-IT 2013 Team</p><p style="color:#4B8DF9; font-size:10px;">This E-mail was automatically generated and sent to you because you registered for MI-IT 2013.</p> ' });
  
  }