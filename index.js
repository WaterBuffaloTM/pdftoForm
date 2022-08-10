const { PDFDocument } = require('pdf-lib');
const { readFile, writeFile } = require('fs/promises');
const express = require('express');
const app = express();

app.use(express.urlencoded());

app.get('/',function(request, response, next){

    response.send();
    


});


// const { consoleUrl } = require('firebase-tools/lib/utils');


async function createPdf(input, output) {
  try {
    const pdfDoc = await PDFDocument.load(await readFile(input));




// modify document, fill out the form 

    const fieldNames = pdfDoc
    .getForm()
    .getFields()
    .map((f) => f.getName());
    console.log({fieldNames});

    const form = pdfDoc.getForm();


    // form.getTextField('Text Field 1').setText('John Smith');

    const competitionName = document.getElementById(competitionName).value;

    console.log(competitionName);
    
    const possibleFields = Array.from({length: 161}, (_ , i) => i);

    possibleFields.forEach((possibleField) => {
        try {
            form
            .getTextField(`Text Field ${possibleField}`)
            .setText(possibleField.toString());
    } catch(error) {

        }
   });


   form.getCheckBox('Check Box 2').check();



    const pdfBytes = await pdfDoc.save();

    await writeFile(output, pdfBytes);
    console.log('PDF Created!');
  } catch (err) {
    console.log(err);
  }
}

createPdf('equine-accidentinjury-report-form.pdf', 'output.pdf');


