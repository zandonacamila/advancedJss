class HttpService {

    get(url) {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

                xhr.open('GET', url) // 'negociacoes/semana' = seria a url da api????

                xhr.onreadystatechange = () => {
            
                    if(xhr.readyState == 4) {

                        if(xhr.status == 200) {
                            
                            // JSON não é um objeto JS e precisa do .parse para ser manipulado                            
                            resolve(JSON.parse(xhr.responseText)) // é um texto, JSON.parse vai retornar em objeto                 
                        } else {
                            
                            console.log(xhr.responseText);
                            reject(xhr.responseText);
                            
                        }
                    }
                };

            xhr.send();
        });

    }
}