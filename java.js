// Your Currents API Key
const apiKey = 'GsAQL5CAIB4A3BQw4MwqAc1O8LgEuOygLKOnr_tepz06BYel';
const apiUrl = `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}`;
let currentIndex = 0;
let articles = [];

// Fetch news articles
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        articles = data.news;
        if (articles.length > 0) {
            showArticle(currentIndex);
            startAutoScroll();
        } else {
            document.getElementById('news-content').innerHTML = '<p>No news articles found.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching news:', error);
        document.getElementById('news-content').innerHTML = '<p>Error loading news.</p>';
    });

// Function to display a news article
function showArticle(index) {
    const article = articles[index];
    document.getElementById('news-content').innerHTML = `
        <h2 class="news-title">${article.title || 'No title available'}</h2>
        <p class="news-description">${article.description || 'No description available'}</p>
        <a href="${article.url}" class="news-link" target="_blank">Read more</a>
    `;
    updateIndicator();
}

// Function to update the indicator
function updateIndicator() {
    document.getElementById('news-indicator').textContent = `Article ${currentIndex + 1} of ${articles.length}`;
}

// Start auto-scroll through articles every 5 seconds
function startAutoScroll() {
    setInterval(() => {
        currentIndex = (currentIndex + 1) % articles.length;
        showArticle(currentIndex);
    }, 5000); // Change article every 5 seconds
}
