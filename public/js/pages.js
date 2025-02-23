function showAbout(event) {
    event.preventDefault(); // Prevent the default anchor behavior
    hideAllSections();
    document.getElementById('aboutVillage').style.display = 'block';
}
function showHistory(event) {
    event.preventDefault(); // Prevent the default anchor behavior
    hideAllSections();
    document.getElementById('villageHistory').style.display = 'block';
}
function showInfo(event) {
    event.preventDefault(); // Prevent the default anchor behavior
    hideAllSections();
    document.getElementById('villageInfo').style.display = 'block';
}

function showGallery(event) {
    event.preventDefault(); // Prevent the default anchor behavior
    hideAllSections();
    document.getElementById('villageGallery').style.display = 'block';
}

function hideAllSections() {
    document.getElementById('aboutVillage').style.display = 'none';
    document.getElementById('villageHistory').style.display = 'none';
    document.getElementById('villageInfo').style.display = 'none';
    document.getElementById('villageGallery').style.display = 'none';
}