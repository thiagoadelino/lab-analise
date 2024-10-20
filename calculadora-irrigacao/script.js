document.getElementById("calcForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obter os valores do formulário
    const et0 = parseFloat(document.getElementById("et0").value);
    const kc = parseFloat(document.getElementById("kc").value);
    const plantArea = parseFloat(document.getElementById("plantArea").value);
    const efficiency = parseFloat(document.getElementById("efficiency").value);

    // Calcular a evapotranspiração da cultura (ETc)
    const etc = et0 * kc;

    // Calcular a quantidade de água necessária considerando a eficiência do sistema
    const irrigationAmount = etc / efficiency;

    // Calcular a quantidade de água em litros por planta (1 mm de água equivale a 1 litro por m²)
    const waterPerPlant = irrigationAmount * plantArea;

    // Exibir o resultado
    document.getElementById("result").textContent = `Quantidade de água por planta: ${waterPerPlant.toFixed(2)} litros/dia`;
});
