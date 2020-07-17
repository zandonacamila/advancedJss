class MensagemView extends View {
    
    constructor(elemento) {
       super(elemento); // não precisaria criar esse construtor, por padrão a classe filha herda da classe pai
    }
    
   template(model) {

      return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : '<p></p>'; 
       // operador ternário ('..?..:..'), ou 'if ternário'. Verifica se o 'model.texto' é verdadeiro, ou seja, 
       // retorna algo diferente de undefined ou null ou vazio. Se for verdadeiro, retorna 'model.texto', senão, 
       // retorna parágrafo vazio ('<p></p>')
    
      /*setTimeout(function() { 
        document.querySelector('#mensagemView') = '<p></p>'
    },3000);*/       
   }
}