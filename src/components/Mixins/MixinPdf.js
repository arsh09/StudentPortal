const {
    PDFDocument,
    StandardFonts,
    rgb,
    // layoutMultilineText,
} = require("pdf-lib");

import MixinSql from "./MixinSql";

export default {
    mixins : [MixinSql],

    methods : {
        handle_create_pdf: async function(survey_data)
        {
            let pdf_document = await PDFDocument.create();
            let pdf_document_font = await pdf_document.embedFont(StandardFonts.TimesRoman);
            
            let pdf_document_page = await pdf_document.addPage();
            let { width, height } = pdf_document_page.getSize();
            
            pdf_document_page.drawText(`Student Information Form`,
            { 
                x : width/2 - 60, y : height - 40 , 
                size : 14, font : pdf_document_font, color : rgb(0,0,0),
                maxWidth : width - 70, lineHeight : 12
            });

            pdf_document_page.drawLine({
                start : { x : 20, y : height - 50 },
                end : { x : width - 20, y : height - 50 },
                thickness : 1, 
                color : rgb(0,0,0),
                opacity : 1,
            });

            Object.entries( this.csv_to_db_keys ).forEach( ([key, value], index) =>{
                pdf_document_page.drawText(`${key}: ${survey_data[value] ?? ''}`,
                { 
                    x : 30, y : height - 90 - 14 * index, 
                    size : 10, font : pdf_document_font, color : rgb(0,0,0),
                    maxWidth : width - 70, lineHeight : 12
                });
            })


            if ( survey_data.student_image ) {
                // paste image 
                const image_data = survey_data.student_image[0].content
                const image_bytes = await fetch(image_data).then(res => res.arrayBuffer());
                const png_image =  image_data.includes("data:image/png") ? 
                    await pdf_document.embedPng(image_bytes):
                    await pdf_document.embedJpg(image_bytes) ; 
 
                const { width: originalWidth, height: originalHeight } = png_image;

                // Define the new dimensions for the image
                const new_image_width = 150;  // New width in points
                const new_image_height = (originalHeight / originalWidth) * new_image_width; // Maintain aspect ratio

                // Draw the image on the page
                pdf_document_page.drawImage(png_image, {
                    x: width - new_image_width - 30,
                    y: height - new_image_height - 90,
                    width: new_image_width,
                    height: new_image_height,
                });
            }

            let pdf_document_file_bytes = await pdf_document.save()
            const filename = `Student - ${survey_data.gnr_number}.pdf`
            this.handle_save_pdf(pdf_document_file_bytes, filename)
        }, 

        handle_save_pdf: function(bytes, filename)
        {
            const blob = new Blob([bytes], { type: 'text/pdf;charset=utf-8;' });
            const link = document.createElement("a");
            if (link.download !== undefined) {  
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                
                // Append the link to the DOM
                document.body.appendChild(link);
                
                // Trigger the download
                link.click();
                
                // Remove the link from the DOM
                document.body.removeChild(link);
            }
        }   
        
    },
}