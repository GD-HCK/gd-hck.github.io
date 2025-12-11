// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');

    // Toggle sidebar on menu button click
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
        
        // Add animation to hamburger icon
        this.classList.toggle('active');
    });

    // Handle menu item clicks
    menuItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the section to show
            const sectionId = this.getAttribute('data-section');
            
            // Remove active class from all menu items
            menuItems.forEach(function(menuItem) {
                menuItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all content sections
            contentSections.forEach(function(section) {
                section.classList.remove('active');
            });
            
            // Show the selected section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // On mobile, close the sidebar after selecting an item
            if (window.innerWidth <= 768) {
                sidebar.classList.add('collapsed');
                mainContent.classList.add('expanded');
            }
            
            // Update URL hash
            window.location.hash = sectionId;
        });
    });

    // Handle direct URL navigation (e.g., accessing #links directly)
    function handleHashChange() {
        const hash = window.location.hash.substring(1); // Remove the '#'
        
        if (hash) {
            // Find the menu item with matching data-section
            const targetMenuItem = document.querySelector(`[data-section="${hash}"]`);
            
            if (targetMenuItem) {
                // Trigger click on the menu item
                targetMenuItem.click();
            }
        }
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Check hash on page load
    if (window.location.hash) {
        handleHashChange();
    }

    // Handle responsive behavior
    function handleResize() {
        if (window.innerWidth > 768) {
            // On larger screens, ensure sidebar is visible
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
        } else {
            // On smaller screens, start with sidebar collapsed
            if (!sidebar.classList.contains('collapsed')) {
                sidebar.classList.add('collapsed');
                mainContent.classList.add('expanded');
            }
        }
    }

    // Initial check
    handleResize();

    // Listen for window resize
    window.addEventListener('resize', handleResize);

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideSidebar && !isClickOnToggle && !sidebar.classList.contains('collapsed')) {
                sidebar.classList.add('collapsed');
                mainContent.classList.add('expanded');
            }
        }
    });
});
