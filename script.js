// async function fetchData() {
//     try {
//         const response = await fetch('taekwondo.json');
//         if (!response.ok) {
//             throw new Error('Failed to fetch data');
//         }

//         const taekwondo = await response.json();
//         // Use the 'taekwondo' object here
//         console.log(taekwondo);
//         return taekwondo;
//     } catch (error) {
//         console.error('Error loading JSON file:', error);
//     }
// }

// // Call the async function
// fetchData().then(taekwondo => {
//     // taekwondo.techniques[1-5].techniques[LIST_NB_TECHNIQUES].name
//     // taekwondo.techniques[1-5].techniques[LIST_NB_TECHNIQUES].description

//     let content = document.getElementById('content');
//     let techniques = taekwondo.techniques;
//     let nb = Math.floor(Math.random() * techniques.length);
//     let technique = techniques[nb];
//     let nb_techniques = technique.techniques.length;
//     let nb2 = Math.floor(Math.random() * nb_techniques);
//     let technique2 = technique.techniques[nb2];
//     let tkdName = technique2.name;
//     let tkdDescription = technique2.description;

//     content.innerHTML = `<h1>${tkdName}</h1><hr><p>${tkdDescription}</p>`;
// });

// Charger les données JSON
async function fetchData() {
    try {
        const response = await fetch('taekwondo.json');
        if (!response.ok) throw new Error('Impossible de charger les données.');
        return await response.json();
    } catch (error) {
        console.error('Erreur :', error);
    }
}

// Mettre à jour le contenu affiché
async function updateContent() {
    const taekwondo = await fetchData();
    const selectedType = document.getElementById('techniqueType').value;
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();

    let filteredTechniques = taekwondo.techniques;

    // Filtrer par type
    if (selectedType) {
        filteredTechniques = filteredTechniques.filter(t => t.name === selectedType);
    }

    // Rechercher par nom
    let content = '';
    filteredTechniques.forEach(type => {
        type.techniques
            .filter(tech => tech.name.toLowerCase().includes(searchQuery))
            .forEach(tech => {
                content += `<h2>${tech.name}</h2><p>${tech.description}</p>`;
            });
    });

    document.getElementById('content').innerHTML = content || '<p>Aucune technique trouvée.</p>';
    updateCounter(filteredTechniques.reduce((sum, type) => sum + type.techniques.length, 0));
}

// Mettre à jour le compteur de techniques
function updateCounter(count) {
    document.getElementById('counter').textContent = `Techniques visibles : ${count}`;
}

// Afficher une technique aléatoire
document.getElementById('randomButton').addEventListener('click', () => {
    fetchData().then(taekwondo => {
        const techniques = taekwondo.techniques.flatMap(type => type.techniques);
        const randomTechnique = techniques[Math.floor(Math.random() * techniques.length)];
        document.getElementById('content').innerHTML = `
            <h1>${randomTechnique.name}</h1>
            <p>${randomTechnique.description}</p>
        `;
    });
});

// Appliquer les options de thème
chrome.storage.sync.get('theme', data => {
    if (data.theme === 'dark') {
        document.body.style.backgroundColor = '#333';
        document.body.style.color = '#fff';
    } else {
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#000';
    }
});

// Ajouter des événements pour les filtres et la recherche
document.getElementById('techniqueType').addEventListener('change', updateContent);
document.getElementById('searchInput').addEventListener('input', updateContent);

// Initialiser le contenu
updateContent();
