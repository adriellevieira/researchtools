// Initialize variables
let researches = [];

// DOM Elements
const researchForm = document.getElementById('researchForm');
const researchTableBody = document.getElementById('researchTableBody');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Tab switching
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        switchTab(tabName);
    });
});

function switchTab(tabName) {
    // Remove active class from all buttons and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked button and corresponding content
    document.querySelector(`button[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// Form submission
researchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const research = {
        name: document.getElementById('researchName').value,
        planning: parseFloat(document.getElementById('planningDays').value),
        execution: parseFloat(document.getElementById('executionDays').value),
        analysis: parseFloat(document.getElementById('analysisDays').value),
        documentation: parseFloat(document.getElementById('documentationDays').value),
        timestamp: new Date()
    };
    
    try {
        // Save to Firebase
        const docRef = await db.collection('researches').add(research);
        research.id = docRef.id;
        
        // Add to local array
        researches.push(research);
        
        // Update UI
        updateMetrics();
        renderTable();
        
        // Clear form
        researchForm.reset();
        
        alert('Pesquisa adicionada com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar pesquisa:', error);
        alert('Erro ao adicionar pesquisa. Verifique a conexão com Firebase.');
    }
}
);

// Load data from Firebase on page load
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const snapshot = await db.collection('researches').orderBy('timestamp', 'desc').get();
        researches = [];
        snapshot.forEach(doc => {
            researches.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        updateMetrics();
        renderTable();
    } catch (error) {
        console.error('Erro ao carregar pesquisas:', error);
    }
});

function updateMetrics() {
    if (researches.length === 0) {
        document.getElementById('totalResearch').textContent = '0';
        document.getElementById('totalResearchCount').textContent = '0 pesquisas registradas';
        document.getElementById('avgDuration').textContent = '0';
        return;
    }
    
    // Update total research count
    document.getElementById('totalResearch').textContent = researches.length;
    document.getElementById('totalResearchCount').textContent = `${researches.length} pesquisas registradas`;
    
    // Calculate averages
    let totalPlanning = 0;
    let totalExecution = 0;
    let totalAnalysis = 0;
    let totalDocumentation = 0;
    
    researches.forEach(research => {
        totalPlanning += research.planning;
        totalExecution += research.execution;
        totalAnalysis += research.analysis;
        totalDocumentation += research.documentation;
    });
    
    const count = researches.length;
    const avgPlanning = (totalPlanning / count).toFixed(1);
    const avgExecution = (totalExecution / count).toFixed(1);
    const avgAnalysis = (totalAnalysis / count).toFixed(1);
    const avgDocumentation = (totalDocumentation / count).toFixed(1);
    
    const totalAvg = (parseFloat(avgPlanning) + parseFloat(avgExecution) + parseFloat(avgAnalysis) + parseFloat(avgDocumentation)).toFixed(1);
    
    // Calculate percentages
    const totalDays = parseFloat(totalAvg);
    const planPercent = ((parseFloat(avgPlanning) / totalDays) * 100).toFixed(0);
    const execPercent = ((parseFloat(avgExecution) / totalDays) * 100).toFixed(0);
    const analysisPercent = ((parseFloat(avgAnalysis) / totalDays) * 100).toFixed(0);
    const docPercent = ((parseFloat(avgDocumentation) / totalDays) * 100).toFixed(0);
    
    // Update UI
    document.getElementById('avgDuration').textContent = totalAvg;
    
    // Planning
    document.getElementById('planDays').textContent = `${avgPlanning} d`;
    document.getElementById('planPercent').textContent = `${planPercent}%`;
    document.getElementById('planProgress').style.width = `${planPercent}%`;
    document.getElementById('planTotal').textContent = `${avgPlanning} dias`;
    
    // Execution
    document.getElementById('execDays').textContent = `${avgExecution} d`;
    document.getElementById('execPercent').textContent = `${execPercent}%`;
    document.getElementById('execProgress').style.width = `${execPercent}%`;
    document.getElementById('execTotal').textContent = `${avgExecution} dias`;
    
    // Analysis
    document.getElementById('analysisDays').textContent = `${avgAnalysis} d`;
    document.getElementById('analysisPercent').textContent = `${analysisPercent}%`;
    document.getElementById('analysisProgress').style.width = `${analysisPercent}%`;
    document.getElementById('analysisTotal').textContent = `${avgAnalysis} dias`;
    
    // Documentation
    document.getElementById('docDays').textContent = `${avgDocumentation} d`;
    document.getElementById('docPercent').textContent = `${docPercent}%`;
    document.getElementById('docProgress').style.width = `${docPercent}%`;
    document.getElementById('docTotal').textContent = `${avgDocumentation} dias`;
}

function renderTable() {
    if (researches.length === 0) {
        researchTableBody.innerHTML = '<tr><td colspan="7" class="empty-message">Nenhuma pesquisa registrada ainda</td></tr>';
        return;
    }
    
    researchTableBody.innerHTML = '';
    
    researches.forEach(research => {
        const total = research.planning + research.execution + research.analysis + research.documentation;
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${research.name}</td>
            <td>${research.planning}</td>
            <td>${research.execution}</td>
            <td>${research.analysis}</td>
            <td>${research.documentation}</td>
            <td style="color: #4338ca; font-weight: 600;">${total}</td>
            <td>
                <button class="btn-delete" onclick="deleteResearch('${research.id}')">✕</button>
            </td>
        `;
        
        researchTableBody.appendChild(row);
    });
}

async function deleteResearch(id) {
    if (confirm('Tem certeza que deseja deletar esta pesquisa?')) {
        try {
            await db.collection('researches').doc(id).delete();
            researches = researches.filter(r => r.id !== id);
            updateMetrics();
            renderTable();
            alert('Pesquisa deletada com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar pesquisa:', error);
            alert('Erro ao deletar pesquisa.');
        }
    }
}