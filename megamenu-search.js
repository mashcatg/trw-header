
// Enhanced Menu JavaScript with Modern Animations and Contact Sidebar
class ModernMegaMenu {
constructor() {
this.header = document.getElementById("header");
this.megaMenuContainer = document.getElementById("megaMenuContainer");
this.practicesItem = document.getElementById("practicesItem");
this.capabilitiesItem = document.getElementById("capabilitiesItem");
this.insightsItem = document.getElementById("insightsItem");
this.aboutItem = document.getElementById("aboutItem");
this.practicesMenu = document.getElementById("practicesMenu");
this.capabilitiesMenu = document.getElementById("capabilitiesMenu");
this.insightsMenu = document.getElementById("insightsMenu");
this.aboutMenu = document.getElementById("aboutMenu");
this.mobileToggle = document.getElementById("mobileToggle");
this.mobileNav = document.getElementById("mobileNav");
this.contactToggle = document.getElementById("contactToggle");
this.contactSidebar = document.getElementById("contactSidebar");
this.sidebarOverlay = document.getElementById("sidebarOverlay");
this.sidebarClose = document.getElementById("sidebarClose");
this.contactIcon = document.getElementById("contactIcon");
this.searchButton = document.getElementById("searchButton");

this.currentActiveItem = null;
this.isMenuOpen = false;
this.isSidebarOpen = false;
this.isMobile = window.innerWidth <= 768;

this.init();
}

init() {
// Remove hover events
// this.practicesItem.addEventListener('mouseenter', () => this.showMenu('practices'));
// this.insightsItem.addEventListener('mouseenter', () => this.showMenu('insights'));
// this.aboutItem.addEventListener('mouseenter', () => this.showMenu('about'));

// Add click events
this.practicesItem.addEventListener("click", (e) => {
e.preventDefault();
this.toggleMenu("practices");
});

this.capabilitiesItem.addEventListener("click", (e) => {
e.preventDefault();
this.toggleMenu("capabilities");
});

this.insightsItem.addEventListener("click", (e) => {
e.preventDefault();
this.toggleMenu("insights");
});

this.aboutItem.addEventListener("click", (e) => {
e.preventDefault();
this.toggleMenu("about");
});

// Contact sidebar toggle event listeners
this.contactToggle.addEventListener("click", () =>
this.toggleContactSidebar()
);
this.sidebarClose.addEventListener("click", () =>
this.hideContactSidebar()
);
this.sidebarOverlay.addEventListener("click", () =>
this.hideContactSidebar()
);

// Search button event listener
this.searchButton.addEventListener("click", () =>
this.handleSearch()
);

// Add toggle menu method
// (Moved toggleMenu to class level, see below)

// Close menu when clicking outside
document.addEventListener("click", (e) => {
if (
!this.header.contains(e.target) &&
!this.contactSidebar.contains(e.target) &&
!this.contactToggle.contains(e.target)
) {
this.hideMenu();
}
});

// Close menu on escape key
document.addEventListener("keydown", (e) => {
if (e.key === "Escape") {
this.hideMenu();
this.hideContactSidebar();
}
});

// Mobile menu toggle
this.mobileToggle.addEventListener("click", () =>
this.toggleMobileMenu()
);

// Practices menu category switching
this.initPracticesMenu();

// Practices menu category switching
this.initCapabilitiesMenu();

// Window resize handler
window.addEventListener("resize", () => {
this.isMobile = window.innerWidth <= 768;
if (!this.isMobile) {
this.hideMobileMenu();
} else {
this.hideMenu();
}
});
}

// Contact sidebar toggle methods
toggleContactSidebar() {
if (this.isSidebarOpen) {
this.hideContactSidebar();
} else {
this.showContactSidebar();
}
}

showContactSidebar() {
this.isSidebarOpen = true;
this.contactSidebar.classList.add("active");
this.sidebarOverlay.classList.add("active");
this.contactToggle.classList.add("active");
this.contactIcon.textContent = "×";
document.body.style.overflow = "hidden";
}

hideContactSidebar() {
this.isSidebarOpen = false;
this.contactSidebar.classList.remove("active");
this.sidebarOverlay.classList.remove("active");
this.contactToggle.classList.remove("active");
this.contactIcon.textContent = "✉️";
document.body.style.overflow = "";
}

handleSearch() {
// Create and show search overlay
const searchOverlay = document.createElement("div");
searchOverlay.className = "search-overlay";
searchOverlay.innerHTML = `

<div class="search-modal">
<div class="search-header">
<h3>Search TRW Law Firm</h3>
<button class="search-close">×</button>
</div>
<div class="search-content">
<form class="search-form" action="https://tahmidurrahman.com/" method="get">
<input type="text" name="s" class="search-input-main" placeholder="Search for legal services, articles, or information..." autocomplete="off">
<button type="submit" class="search-submit">
<svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
<path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
</svg>
</button>
</form>
<div class="search-suggestions">
<h4>Popular Searches:</h4>
<div class="suggestion-tags">
<a href="https://tahmidurrahman.com/category/company-law/mergers-and-acquisitions/" class="suggestion-tag">Mergers & Acquisitions</a>
<a href="https://tahmidurrahman.com/category/foreign-investment/" class="suggestion-tag">Foreign Investment</a>
<a href="https://tahmidurrahman.com/category/banking-law/" class="suggestion-tag">Banking Law</a>
<a href="https://tahmidurrahman.com/category/immigration/" class="suggestion-tag">Immigration</a>
<a href="https://tahmidurrahman.com/category/commercial/" class="suggestion-tag">Commercial Law</a>
</div>
</div>
</div>
</div>
`;

document.body.appendChild(searchOverlay);

// Add styles for search overlay
if (!document.getElementById("searchStyles")) {
const searchStyles = document.createElement("style");
searchStyles.id = "searchStyles";
searchStyles.textContent = `
.search-overlay {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(15, 28, 68, 0.95);
backdrop-filter: blur(10px);
z-index: 10000;
display: flex;
align-items: center;
justify-content: center;
animation: fadeIn 0.3s ease;
}

.search-modal {
background: rgba(255, 255, 255, 0.1);
border: 1px solid rgba(255, 255, 255, 0.2);
border-radius: 20px;
padding: 40px;
max-width: 600px;
width: 90%;
backdrop-filter: blur(20px);
animation: slideUp 0.3s ease;
}

.search-header {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 30px;
}

.search-header h3 {
color: white;
margin: 0;
font-size: 24px;
}

.search-close {
background: none;
border: none;
color: white;
font-size: 30px;
cursor: pointer;
padding: 0;
width: 40px;
height: 40px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 50%;
transition: background 0.3s ease;
}

.search-close:hover {
background: rgba(255, 255, 255, 0.1);
}

.search-form {
display: flex;
gap: 10px;
margin-bottom: 30px;
}

.search-input-main {
flex: 1;
padding: 15px 20px;
border: 2px solid rgba(255, 255, 255, 0.2);
border-radius: 50px;
background: rgba(255, 255, 255, 0.1);
color: white;
font-size: 16px;
outline: none;
transition: all 0.3s ease;
}

.search-input-main::placeholder {
color: rgba(255, 255, 255, 0.7);
}

.search-input-main:focus {
border-color: #00cc88;
background: rgba(255, 255, 255, 0.15);
}

.search-submit {
padding: 15px 20px;
background: linear-gradient(135deg, #00cc88, #00a86b);
border: none;
border-radius: 50px;
color: white;
cursor: pointer;
transition: transform 0.3s ease;
}

.search-submit:hover {
transform: scale(1.05);
}

.search-suggestions h4 {
color: white;
margin: 0 0 15px 0;
font-size: 16px;
}

.suggestion-tags {
display: flex;
flex-wrap: wrap;
gap: 10px;
}

.suggestion-tag {
padding: 8px 16px;
background: rgba(255, 255, 255, 0.1);
border: 1px solid rgba(255, 255, 255, 0.2);
border-radius: 20px;
color: white;
text-decoration: none;
font-size: 14px;
transition: all 0.3s ease;
}

.suggestion-tag:hover {
background: rgba(0, 204, 136, 0.2);
border-color: #00cc88;
}

@keyframes fadeIn {
from { opacity: 0; }
to { opacity: 1; }
}

@keyframes slideUp {
from { transform: translateY(50px); opacity: 0; }
to { transform: translateY(0); opacity: 1; }
}
`;
document.head.appendChild(searchStyles);
}

// Focus on search input
setTimeout(() => {
const searchInput =
searchOverlay.querySelector(".search-input-main");
if (searchInput) {
searchInput.focus();
}
}, 100);

// Close search overlay
const closeSearch = () => {
searchOverlay.style.animation = "fadeOut 0.3s ease";
setTimeout(() => {
if (searchOverlay.parentNode) {
searchOverlay.parentNode.removeChild(searchOverlay);
}
}, 300);
};

searchOverlay
.querySelector(".search-close")
.addEventListener("click", closeSearch);
searchOverlay.addEventListener("click", (e) => {
if (e.target === searchOverlay) {
closeSearch();
}
});

// Handle escape key
const handleEscape = (e) => {
if (e.key === "Escape") {
closeSearch();
document.removeEventListener("keydown", handleEscape);
}
};
document.addEventListener("keydown", handleEscape);
}

showMenu(type) {
if (this.isMobile) return;

this.hideAllMenus();
this.isMenuOpen = true;

// Add active class to header
this.header.classList.add("mega-menu-open");

// Show mega menu container
this.megaMenuContainer.classList.add("active");

// Show specific menu
const menuMap = {
practices: { item: this.practicesItem, menu: this.practicesMenu },
capabilities: {
item: this.capabilitiesItem,
menu: this.capabilitiesMenu,
},
insights: { item: this.insightsItem, menu: this.insightsMenu },
about: { item: this.aboutItem, menu: this.aboutMenu },
};

const { item, menu } = menuMap[type];
item.classList.add("active");
menu.classList.add("active");

this.currentActiveItem = item;

// Add magnetic cursor effect
this.addMagneticEffect();
}

toggleMenu(type) {
if (
this.isMenuOpen &&
this.currentActiveItem === this[`${type}Item`]
) {
this.hideMenu();
} else {
this.showMenu(type);
}
}

hideMenu() {
if (!this.isMenuOpen) return;

this.isMenuOpen = false;

// Remove active classes
this.header.classList.remove("mega-menu-open");
this.megaMenuContainer.classList.remove("active");

// Hide all menus
this.hideAllMenus();

this.currentActiveItem = null;

// Remove magnetic effect
this.removeMagneticEffect();
}

hideAllMenus() {
[
this.practicesItem,
this.insightsItem,
this.aboutItem,
this.capabilitiesItem,
].forEach((item) => {
item.classList.remove("active");
});

[
this.practicesMenu,
this.insightsMenu,
this.aboutMenu,
this.capabilitiesMenu,
].forEach((menu) => {
menu.classList.remove("active");
});
}

toggleMobileMenu() {
this.mobileToggle.classList.toggle("active");
this.mobileNav.classList.toggle("active");
this.header.classList.toggle("mega-menu-open");
}

hideMobileMenu() {
this.mobileToggle.classList.remove("active");
this.mobileNav.classList.remove("active");
this.header.classList.remove("mega-menu-open");
}

initPracticesMenu() {
// Category switching (Handles top level: Corporate, Finance, ADR etc.)
const categoryItems = document.querySelectorAll(
".mega-menu-categories .category-item"
); // More specific selector
const categoryGroups = document.querySelectorAll(
".left-column [data-category-group]"
); // Selects the left-column groups like adr-categories

categoryItems.forEach((item) => {
item.addEventListener("click", () => {
const category = item.dataset.category; // e.g., "adr"

// Update active category item
categoryItems.forEach((cat) => cat.classList.remove("active"));
item.classList.add("active");

// Show corresponding category group (left column)
categoryGroups.forEach((group) => {
group.style.display =
group.dataset.categoryGroup === category ? "block" : "none";
});

// Reset subcategory selection to show the first item in the right column
this.resetSubcategories(category);
});
});

// Subcategory switching (Handles left column clicks like Arbitration, Mediation)
const mainCategories = document.querySelectorAll(
".left-column .main-category"
); // Selects ALL main-category divs within left column
const subcategoryGroups = document.querySelectorAll(
".right-column [data-subcategory-group]"
); // CORRECTED SELECTOR: Target only right-column groups

mainCategories.forEach((item) => {
item.addEventListener("click", () => {
const subcategory = item.dataset.subcategory; // e.g., "adr-arbitration"

// Update active subcategory within the same parent (left column group)
const parent = item.closest("[data-category-group]"); // Use closest for robustness
if (parent) {
parent
.querySelectorAll(".main-category")
.forEach((cat) => cat.classList.remove("active"));
item.classList.add("active");
}
// else { console.error("Could not find parent category group for", item); } // Optional logging

// Show corresponding subcategory group (right column service list)
// Hide ALL right column groups first
subcategoryGroups.forEach((group) => {
group.classList.remove("active");
group.style.display = "none";
});

// Show only the corresponding subcategory group
const targetGroup = document.querySelector(
`.right-column [data-subcategory-group="${subcategory}"]`
);
if (targetGroup) {
targetGroup.classList.add("active");
targetGroup.style.display = "block";
}
});
});
}

initCapabilitiesMenu() {
// Category switching (Handles top level: Corporate, Finance, ADR etc.)
const categoryItems = document.querySelectorAll(
".mega-menu-categories .category-item"
); // More specific selector
const categoryGroups = document.querySelectorAll(
".left-column [data-category-group]"
); // Selects the left-column groups like adr-categories

categoryItems.forEach((item) => {
item.addEventListener("click", () => {
const category = item.dataset.category; // e.g., "adr"

// Update active category item
categoryItems.forEach((cat) => cat.classList.remove("active"));
item.classList.add("active");

// Show corresponding category group (left column)
categoryGroups.forEach((group) => {
group.style.display =
group.dataset.categoryGroup === category ? "block" : "none";
});

// Reset subcategory selection to show the first item in the right column
this.resetSubcategories(category);
});
});

// Subcategory switching (Handles left column clicks like Arbitration, Mediation)
const mainCategories = document.querySelectorAll(
".left-column .main-category"
); // Selects ALL main-category divs within left column
const subcategoryGroups = document.querySelectorAll(
".right-column [data-subcategory-group]"
); // CORRECTED SELECTOR: Target only right-column groups

mainCategories.forEach((item) => {
item.addEventListener("click", () => {
const subcategory = item.dataset.subcategory; // e.g., "adr-arbitration"

// Update active subcategory within the same parent (left column group)
const parent = item.closest("[data-category-group]"); // Use closest for robustness
if (parent) {
parent
.querySelectorAll(".main-category")
.forEach((cat) => cat.classList.remove("active"));
item.classList.add("active");
}
// else { console.error("Could not find parent category group for", item); } // Optional logging

// Show corresponding subcategory group (right column service list)
subcategoryGroups.forEach((group) => {
// This now correctly targets only right-column groups
if (group.dataset.subcategoryGroup === subcategory) {
group.classList.add("active");
} else {
// Hide other groups
group.classList.remove("active");
}
});
});
});
}

resetSubcategories(category) {
// Find the specific left-column group (e.g., the one with data-category-group="adr")
const categoryGroup = document.querySelector(
`.left-column [data-category-group="${category}"]`
);
if (categoryGroup) {
const firstSubcategory =
categoryGroup.querySelector(".main-category");
if (firstSubcategory) {
// Reset active state for all subcategories in this group
categoryGroup
.querySelectorAll(".main-category")
.forEach((cat) => cat.classList.remove("active"));
firstSubcategory.classList.add("active"); // Make the first one active

// Show the corresponding first subcategory's service list (right column)
const subcategory = firstSubcategory.dataset.subcategory; // e.g., "adr-arbitration"

// Hide ALL right column groups first
document
.querySelectorAll(".right-column [data-subcategory-group]")
.forEach((group) => {
group.classList.remove("active");
group.style.display = "none";
});

// Show only the matching subcategory group
const targetGroup = document.querySelector(
`.right-column [data-subcategory-group="${subcategory}"]`
);
if (targetGroup) {
targetGroup.classList.add("active");
targetGroup.style.display = "block";
}
}
}
// else { console.error(`Could not find category group for: ${category} in resetSubcategories`); } // Optional logging
}

addMagneticEffect() {
const navLinks = document.querySelectorAll(
".nav-link, .submenu-link, .menu-section-link"
);

navLinks.forEach((link) => {
link.addEventListener("mousemove", this.magneticMove);
link.addEventListener("mouseleave", this.magneticReset);
});
}

removeMagneticEffect() {
const navLinks = document.querySelectorAll(
".nav-link, .submenu-link, .menu-section-link"
);

navLinks.forEach((link) => {
link.removeEventListener("mousemove", this.magneticMove);
link.removeEventListener("mouseleave", this.magneticReset);
});
}

magneticMove(e) {
const rect = this.getBoundingClientRect();
const x = e.clientX - rect.left - rect.width / 2;
const y = e.clientY - rect.top - rect.height / 2;

this.style.transform = `translate(${x * 0.1}px, ${
y * 0.1
}px) scale(1.02)`;
}

magneticReset() {
this.style.transform = "translate(0px, 0px) scale(1)";
}
}

// Initialize the menu when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
new ModernMegaMenu();
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
anchor.addEventListener("click", function (e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute("href"));
if (target) {
target.scrollIntoView({
behavior: "smooth",
block: "start",
});
}
});
});

// Contact toggle scroll behavior
let lastScrollTop = 0;
const contactToggle = document.getElementById('contactToggle');

window.addEventListener('scroll', function() {
const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

// Hide toggle when scrolling down past 300px
if (scrollTop > 300 && scrollTop > lastScrollTop) {
contactToggle.classList.add('hidden');
}
// Show toggle when scrolling up or at top
else if (scrollTop < lastScrollTop || scrollTop <= 100) {
contactToggle.classList.remove('hidden');
}

lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);


(function(){
const root = document.getElementById('capabilitiesMenu');
if(!root) return;
const topTabs = root.querySelectorAll('.mega-menu-categories .category-item');
const groups = root.querySelectorAll('[data-category-group]');
const leftWraps = root.querySelectorAll('.left-column [data-category-group]');
const rightCol = root.querySelector('.right-column');

function showTop(key){
// top tab active state
topTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-category')===key));
// show matching left group; hide others
let shown = null;
groups.forEach(g => {
const match = g.getAttribute('data-category-group') === key;
g.style.display = match ? '' : 'none';
if(match) shown = g;
});
if(shown){
// choose active left item or the first
const current = shown.querySelector('.main-category.active') || shown.querySelector('.main-category');
if(current){
shown.querySelectorAll('.main-category').forEach(mc=>mc.classList.remove('active'));
current.classList.add('active');
showRight(current.getAttribute('data-subcategory'));
}
}
}

function showRight(subKey){
if(!rightCol) return;
const sections = rightCol.querySelectorAll('[data-subcategory-group]');
sections.forEach(sec => {
const on = sec.getAttribute('data-subcategory-group') === subKey;
sec.style.display = on ? '' : 'none';
});
}

// Wire top tabs
topTabs.forEach(t => t.addEventListener('click', () => showTop(t.getAttribute('data-category'))));

// Wire left column clicks (delegate per left group)
leftWraps.forEach(g => {
g.addEventListener('click', function(e){
const el = e.target.closest('.main-category');
if(!el) return;
this.querySelectorAll('.main-category').forEach(mc=>mc.classList.remove('active'));
el.classList.add('active');
showRight(el.getAttribute('data-subcategory'));
});
});

// Init on Expertise (default), which now has Equity as first
document.addEventListener('DOMContentLoaded', function(){
showTop('expertise');
});
})();
