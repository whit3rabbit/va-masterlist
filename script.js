let data = [];

// Load JSON data
fetch('va_masterlist.json')  // Replace with the path to your JSON file
    .then(response => response.json())
    .then(json => data = json);

// Suggest function for autosuggest
function suggest() {
    const query = document.getElementById('searchBox').value.toLowerCase();
    const suggestions = query ? data.filter(item => item.title.toLowerCase().includes(query)) : [];
    displaySuggestions(suggestions);
}

// Display suggestions
function displaySuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';
    suggestions.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.title;
        li.onclick = () => displayContent(item);
        suggestionsContainer.appendChild(li);
    });
    suggestionsContainer.style.display = suggestions.length ? 'block' : 'none';
}

// Display content in HTML format
function displayContent(item) {
    const converter = new showdown.Converter({tables: true, simplifiedAutoLink: true});
    const htmlContent = converter.makeHtml(item.content); // Convert Markdown to HTML
    const contentDisplay = document.getElementById('contentDisplay');
    contentDisplay.innerHTML = htmlContent;  // Display the converted HTML
}

// Hide suggestions list when clicking outside
document.addEventListener('click', function (event) {
    if (event.target.id !== 'searchBox') {
        document.getElementById('suggestions').style.display = 'none';
    }
});
