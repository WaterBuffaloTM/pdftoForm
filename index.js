const { PDFDocument } = require('pdf-lib');
const { readFile, writeFile } = require('fs/promises');
const { consoleUrl } = require('firebase-tools/lib/utils');


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

    form.getTextField('Text Field 1').setText('John Smith');

    


    const pdfBytes = await pdfDoc.save();

    await writeFile(output, pdfBytes);
    console.log('PDF Created!');
  } catch (err) {
    console.log(err);
  }
}



createPdf('equine-accidentinjury-report-form.pdf', 'output.pdf');


