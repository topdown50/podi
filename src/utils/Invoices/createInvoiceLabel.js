import Swal from 'sweetalert2'

export function createInvoiceLabel(htmlText,windowName){
    let htmlStart = '<!doctype html><html lang="en"> <head> <!-- Required meta tags --> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <!-- Bootstrap CSS --> <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/> <title>Invoice Label</title> </head> <body>';

    let htmlEnd = '<!-- Bootstrap Bundle with Popper --> <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script> </body></html>';

    let html =  htmlStart + htmlText + htmlEnd

    let apiKey = {
        Authorization: '5a088e96-85b6-4137-9e61-a6405f9beb7d'
    }

    let optionList = {
        width: 8.5,
        height: 11,
        marginBottom: '.1in',
        marginLeft: '.1in',
        marginRight: '.1in',
        marginTop: '.1in',
    }
    
    let request = {
        html: html,
        options: optionList
    }

    Swal.fire({
        title: 'Please Wait generating PDF',
        allowOutsideClick: false
    })
      
    Swal.showLoading()

    fetch("https://v2.api2pdf.com/chrome/pdf/html",{
        method: "POST",
        body: JSON.stringify(request),
        headers: apiKey
    }).then(response => response.json())
    .then(data => {
        Swal.fire(
            'PDF Generated',
            'PDF generated successfully',
            'success'
        )
        window.open(data.FileUrl,windowName,'width=900,height=900')
    });
    
}