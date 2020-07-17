class NegociacaoService {

    obterNegociacoesDaSemana(cb) {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'negociacoes/semana') // 'negociacoes/semana' = seria a url da api????

        xhr.onreadystatechange = () => {
    
            if(xhr.readyState == 4) {

                if(xhr.status == 200) {

                // JSON não é um objeto JS e precisa do .parse para ser manipulado
                    cb(null, JSON.parse(xhr.responseText) // é um texto, JSON.parse vai retornar em objeto
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))); // cada objeto é convertido em uma instância de negociação, no final é gerado umm novo array
                    
                    //.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)); // esse array é percorrido e adicionado na minha lista de negociacoes 
                    // this._mensagem.texto = 'Negociações importadas com sucesso.';
                } else {
                    
                    console.log(xhr.responseText);
                    cb('Não foi possível obter as negociações :(', null);
                    //this._mensagem.texto = 'Não foi possível obter resposta do servidor.';
                }
            }
        };
        xhr.send();
    }
}

        /* status de requisição:
            0: requisição não iniciada

            1: conexão com o servidor estabelecida

            2: requisição recebida
            
            3: processando requisição
            
            4:requisição concluída e resposta pronta */