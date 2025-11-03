
function doPost(e) {
  try {
    // Make sure to use the correct sheet name
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); 

    // If the sheet doesn't exist, create it with headers
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Sheet1");
      sheet.appendRow(["Timestamp", "Name", "Email", "Subject", "Message", "Specialization"]);
    }
    
    // e.parameter contains the form data
    var data = e.parameter;
    
    var timestamp = new Date();
    
    // Append a new row with the form data
    sheet.appendRow([
      timestamp,
      data.name,
      data.email,
      data.subject,
      data.message,
      data.speciality
    ]);
    
    // Return a success response
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return an error response
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
