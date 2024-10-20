// Mostra/esconde campos com base no modelo selecionado
document.getElementById("model").addEventListener("change", function() {
    const model = this.value;
    if (model === "linear") {
        document.getElementById("linear-inputs").classList.remove("hidden");
        document.getElementById("quadratic-inputs").classList.add("hidden");
    } else if (model === "quadratic") {
        document.getElementById("linear-inputs").classList.add("hidden");
        document.getElementById("quadratic-inputs").classList.remove("hidden");
    }
});

// Função para calcular e exibir os resultados
function calculate() {
    const start = parseFloat(document.getElementById("start").value);
    const end = parseFloat(document.getElementById("end").value);
    const step = parseFloat(document.getElementById("step").value);
    const model = document.getElementById("model").value;

    let xValues = [];
    let yValues = [];

    // Gerar valores de x com base no intervalo fornecido
    for (let x = start; x <= end; x += step) {
        xValues.push(x);
    }

    // Calcular valores de y para o modelo linear
    if (model === "linear") {
        const a = parseFloat(document.getElementById("a-linear").value);
        const b = parseFloat(document.getElementById("b-linear").value);
        yValues = xValues.map(x => a * x + b);
    }

    // Calcular valores de y para o modelo quadrático
    else if (model === "quadratic") {
        const a = parseFloat(document.getElementById("a-quadratic").value);
        const b = parseFloat(document.getElementById("b-quadratic").value);
        const c = parseFloat(document.getElementById("c-quadratic").value);
        yValues = xValues.map(x => a * x * x + b * x + c);
    }

    // Exibir os resultados na tabela
    const resultBody = document.getElementById("result-body");
    resultBody.innerHTML = ""; // Limpar resultados anteriores
    xValues.forEach((x, index) => {
        const row = `<tr><td>${x.toFixed(5)}</td><td>${yValues[index].toFixed(5)}</td></tr>`;
        resultBody.innerHTML += row;
    });

    document.getElementById("result-container").classList.remove("hidden");
}

// Função para baixar os resultados em CSV
function downloadCSV() {
    const rows = [["x", "y"]];
    const xValues = [...document.querySelectorAll("#result-body td:nth-child(1)")];
    const yValues = [...document.querySelectorAll("#result-body td:nth-child(2)")];

    xValues.forEach((xElement, index) => {
        const x = xElement.textContent;
        const y = yValues[index].textContent;
        rows.push([x, y]);
    });

    let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "resultados.csv");
    document.body.appendChild(link); // Requerido para o Firefox
    link.click();
    document.body.removeChild(link); // Remove o link após o download
}

// Função para baixar a tabela como PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Resultados da Tabela", 14, 16);

    const rows = [];
    const xValues = [...document.querySelectorAll("#result-body td:nth-child(1)")];
    const yValues = [...document.querySelectorAll("#result-body td:nth-child(2)")];

    xValues.forEach((xElement, index) => {
        const x = xElement.textContent;
        const y = yValues[index].textContent;
        rows.push([x, y]);
    });

    // Gera a tabela no PDF
    doc.autoTable({
        head: [['x', 'y']],
        body: rows,
        startY: 20
    });

    doc.save("resultados.pdf");
}

