const { PDFDocument } = require("pdf-lib");
const { readFile, writeFile } = require('fs/promises');



async function anexo2D (input, output) {
    try {
        const pdfDoc = await PDFDocument.load(await readFile(input));
        

        const fieldNames = pdfDoc
        .getForm()
        .getFields()
        .map((f) => f.getName());
        console.log('1',{ fieldNames });

    
       
        const form = pdfDoc.getForm();

        


        form.getTextField('nomeembarcacao').setText('carriola');
        
        
       // if (naturezaIncricaoField.constructor.name === 'PDFCheckBox') {
         //   if (1===1){
           //     naturezaIncricaoField.check();}
        //}

        
        //console.log(nomeEmbarcacao)
        form.flatten();
        const pdfBytes = await pdfDoc.save();

        await writeFile(output, pdfBytes);
        console.log('PDF Criado!');
    } catch (err) {
        console.log(err);
    }
}

anexo2D ('Anexo2E-N211.pdf', 'output.pdf');