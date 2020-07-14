class NegociacoesView extends View { // extends = herança
    
    constructor(elemento) {
        super(elemento); // super = tem que chamar na classe pai
    } // não precisaria criar esse construtor, por padrão a classe filha herda da classe pai
    
    template(model) { // o método template de NegociacoesView sobrescreve o template da classe pai
        
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
        
            <tbody>
                ${model.negociacoes.map(n => `
                    
                    <tr>
                        <td>${DateHelper.dataParaTexto(n.data)}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.valor}</td>
                        <td>${n.volume}</td>
                    </tr>
                    
                `).join('')}                
            </tbody>
                  
            <tfoot>
                <td>Total</td>
                <td colspan="2"></td>
                <td>
                    ${model.negociacoes.reduce((total, n) => total + n.volume, 0.0)} 
                </td>
            </tfoot>
            
        </table>
        `;
    }
}

// função reduce = processa o array e retorna um unico resultado
// NegociacoesView trouxe a marcação da tabela para o js
// .join traz cada objeto separadamente para uma única compilação de objetos
