function calcularVenda(venda) {
  const itens = venda.itens || [];

  const subtotal = itens.reduce((total, item) => {
    const valorItem = item.valorItem || 0;
    const descontoPercentual = item.descontoPercentual || 0;
    const descontoReal = item.descontoReal || 0;

    const descontoPorcentagem = (valorItem * descontoPercentual) / 100;
    const maiorDesconto = Math.max(descontoPorcentagem, descontoReal);

    const valorComDesconto = Math.max(valorItem - maiorDesconto, 0);
    return total + valorComDesconto;
  }, 0);

  let { descontoTotalPercentual = 0, descontoTotalReal = 0 } = venda;

  const descontoPercentualEmValor = (subtotal * descontoTotalPercentual) / 100;

  let descontoAplicado = 0;

  if (subtotal === 0) {
    descontoAplicado = 0;
    descontoTotalReal = 0;
  } else if (descontoTotalPercentual > 0 && descontoTotalReal > 0) {
    if (descontoPercentualEmValor >= descontoTotalReal) {
      descontoAplicado = descontoPercentualEmValor;
      descontoTotalReal = descontoAplicado;
    } else {
      descontoAplicado = descontoTotalReal;
      descontoTotalPercentual = (descontoTotalReal / subtotal) * 100;
    }
  } else if (descontoTotalPercentual > 0) {
    descontoAplicado = descontoPercentualEmValor;
    descontoTotalReal = descontoAplicado;
  } else if (descontoTotalReal > 0) {
    descontoAplicado = descontoTotalReal;
    descontoTotalPercentual = (descontoTotalReal / subtotal) * 100;
  }

  const totalFinal = Math.max(subtotal - descontoAplicado, 0);

  const arredondar = (valor) => Math.round(valor * 100) / 100;

  return {
    subtotal: arredondar(subtotal),
    descontoTotalPercentual: arredondar(descontoTotalPercentual),
    descontoTotalReal: arredondar(descontoTotalReal),
    totalFinal: arredondar(totalFinal),
  };
}

module.exports = calcularVenda;
