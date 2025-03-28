// Custom cursor
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 50);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Typewriter effect
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Skills animation
const skillBars = document.querySelectorAll('.skill-progress');
const animateSkills = () => {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

// Trigger skills animation when section is in view
const skillsSection = document.querySelector('.skills-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    observer.observe(skillsSection);
}

const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

// Hover effect for cards
document.querySelectorAll('.skills-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});


document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the form element
    const form = document.getElementById("contactForm");
    const submitButton = document.getElementById("submitbtn");
    const successMessage = document.createElement("span"); // Create success message element

    // Check if all fields are valid using HTML validation constraints
    if (!form.checkValidity()) {
        form.reportValidity(); // Show validation messages if fields are invalid
        return;
    }

    // Disable all input fields and button
    document.querySelectorAll("#contactForm input, #contactForm textarea").forEach(field => {
        field.disabled = true;
    });
    submitButton.disabled = true;

    // Change button text to "Loading..." with a spinner
    submitButton.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Sending...`;

    // Get form values
    const postData = {
        name: document.querySelector("input[name='name']").value,
        email: document.querySelector("input[name='email']").value,
        subject: document.querySelector("input[name='subject']").value,
        message: document.querySelector("textarea[name='message']").value
    };

    fetch("https://formsubmit.co/ajax/oussama.saddi@gmail.com", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);

        // Restore button text and enable inputs
        submitButton.innerHTML = "Send Message";
        document.querySelectorAll("#contactForm input, #contactForm textarea").forEach(field => {
            field.disabled = false;
        });
        submitButton.disabled = false;

        // Show success message next to the button
        successMessage.textContent = "Message sent successfully!";
        successMessage.style.color = "green";
        successMessage.style.marginLeft = "10px";

        // Remove any existing success message before appending
        const existingMessage = document.getElementById("success-message");
        if (existingMessage) existingMessage.remove();
        
        successMessage.id = "success-message"; // Assign ID to manage updates
        submitButton.parentNode.appendChild(successMessage); // Append next to the button

        // Optionally, reset form fields
        form.reset();
    })
    .catch(error => {
        console.error("Error posting data:", error);

        // Restore button text and enable inputs in case of failure
        submitButton.innerHTML = "Send Message";
        document.querySelectorAll("#contactForm input, #contactForm textarea").forEach(field => {
            field.disabled = false;
        });
        submitButton.disabled = false;

        // Show error message
        successMessage.textContent = "Failed to send message.";
        successMessage.style.color = "red";
        successMessage.style.marginLeft = "10px";
        
        const existingMessage = document.getElementById("success-message");
        if (existingMessage) existingMessage.remove();

        successMessage.id = "success-message";
        submitButton.parentNode.appendChild(successMessage);
    });
});


//see more project 
function bledishopDescription(event) {
    event.preventDefault(); // Prevent the default anchor click behavior

    const description = document.getElementById('bledishop-description');
    const seeMoreLink = document.getElementById('see-more');
    
    if (seeMoreLink.innerText === "See More") {
        description.innerHTML = "Developed Bledishop, a platform enabling store owners to create accounts, post products, and manage their online store. Users get a personalized profile to showcase products, along with a dashboard to handle orders, statistics, and product management. The platform provides tools for managing the store efficiently, empowering owners to grow their businesses. <a href='#' id='see-more' onclick='bledishopDescription(event)'>See Less</a>";
    } else {
        description.innerHTML = "Developed Bledishop, a platform enabling store owners to create accounts, post products, and manage their online store... <a href='#' id='see-more' onclick='bledishopDescription(event)'>See More</a>";
    }
}

function backofficeDescription(event) {
    event.preventDefault(); // Prevent the default anchor click behavior

    const description = document.getElementById('backoffice-description');
    const seeMoreLink = document.getElementById('see-more1');
    
    if (seeMoreLink.innerText === "See More") {
        description.innerHTML = "Developed a Electronic Money Back Office platform to manage key financial components such as TPE (Electronic Payment Terminals), ACS (Access Control Systems), DAB (Automated Teller Machines), and file compensation processes. The platform focuses on reporting with Talend for data integration and Qlik for generating actionable insights. A CI/CD pipeline was implemented for smooth deployment, ensuring efficient system updates. The platform enables efficient management of financial data and file processing, offering users enhanced reporting capabilities to inform decision-making. <a href='#' id='see-more1' onclick='backofficeDescription(event)'>See Less</a>";
    } else {
        description.innerHTML = "Developed a Electronic Money Back Office platform to manage key financial components such as TPE (Electronic Payment T... <a href='#' id='see-more1' onclick='backofficeDescription(event)'>See More</a>";
    }
}
function ExtractionDescription(event) {
    event.preventDefault(); // Prevent the default anchor click behavior

    const description = document.getElementById('Extraction-description');
    const seeMoreLink = document.getElementById('see-more2');
    
    if (seeMoreLink.innerText === "See More") {
        description.innerHTML = "Developed a web application designed to help users extract permanent data from various sources, including files, text, and emails, specifically targeting job offers. The platform utilizes a spaCy model for data extraction, enabling the automated identification of key job-related information such as job titles, company names, locations, and required skills. After extracting the relevant data, the application saves it for further use, allowing users to efficiently manage and process job offers. This system simplifies the task of gathering and organizing job data from multiple formats, streamlining the job search process for users. <a href='#' id='see-more2' onclick='ExtractionDescription(event)'>See Less</a>";
    } else {
        description.innerHTML = "Developed a web application designed to help users extract permanent data from various sources, including files, text ,and emails... <a href='#' id='see-more2' onclick='ExtractionDescription(event)'>See More</a>";
    }
}
function nisiDescription(event) {
    event.preventDefault(); // Prevent the default anchor click behavior

    const description = document.getElementById('nisi-description');
    const seeMoreLink = document.getElementById('see-more3');
    
    if (seeMoreLink.innerText === "See More") {
        description.innerHTML = "Nisi-Terra is an academic project that harnesses deep learning to automate waste classification. This intelligent recycling system utilizes a Convolutional Neural Network (CNN) model to accurately identify and classify plastic bottles and cans. The backend, built with Django, provides a RESTful API for seamless communication between the machine and a web-based interface. TensorFlow and YOLO are employed for object detection and classification, ensuring real-time and efficient waste sorting. The project highlights the potential of AI-driven solutions in promoting environmental sustainability. <a href='#' id='see-more3' onclick='nisiDescription(event)'>See Less</a>";
    } else {
        description.innerHTML = "Nisi-Terra is an academic project that harnesses deep learning to automate waste classification.This intelligent... <a href='#' id='see-more3' onclick='nisiDescription(event)'>See More</a>";
    }
}
function proxiDescription(event) {
    event.preventDefault(); // Prevent the default anchor click behavior

    const description = document.getElementById('proxi-description');
    const seeMoreLink = document.getElementById('see-more4');
    
    if (seeMoreLink.innerText === "See More") {
        description.innerHTML = "Proxi-Delivery is a full-stack web application designed to simplify the delivery process by connecting users with couriers. The platform enables users to post delivery requests for parcels, which couriers can accept to handle the shipment. To enhance coordination, the system facilitates direct communication between users and delivery personnel. Using the MapBox API, it optimizes route planning for efficient deliveries. The backend, built with Spring Boot and MySQL, ensures secure and scalable order management, while the Angular-based frontend delivers an intuitive user experience. The project was developed following Agile Scrum methodologies, with API documentation managed via Swagger and version control handled through GitHub. <a href='#' id='see-more4' onclick='proxiDescription(event)'>See Less</a>";
    } else {
        description.innerHTML = "Proxi-Delivery is a full-stack web application designed to simplify the delivery process by connecting users with...<a href='#' id='see-more4' onclick='proxiDescription(event)'>See More</a>";
    }
}
function ckdDescription(event) {
    event.preventDefault(); // Prevent the default anchor click behavior

    const description = document.getElementById('ckd-description');
    const seeMoreLink = document.getElementById('see-more5');
    
    if (seeMoreLink.innerText === "See More") {
        description.innerHTML = "CKD is an academic machine learning project focused on early detection of Chronic Kidney Disease (CKD) using predictive modeling techniques. The system leverages classification algorithms to analyze patient data and identify potential CKD cases with high accuracy. Built with Python, the project applies various machine learning models to enhance diagnostic efficiency and support early intervention. <a href='#' id='see-more5' onclick='ckdDescription(event)'>See Less</a>";
    } else {
        description.innerHTML = "CKD is an academic machine learning project focused on early detection of Chronic Kidney Disease (CKD) using...<a href='#' id='see-more5' onclick='ckdDescription(event)'>See More</a>";
    }
}
function mbodyDescription(event) {
    event.preventDefault(); // Prevent the default anchor click behavior

    const description = document.getElementById('mbody-description');
    const seeMoreLink = document.getElementById('see-more6');
    
    if (seeMoreLink.innerText === "See More") {
        description.innerHTML = "Mbody-UP is an academic project designed to streamline gym management across multiple platforms: web, desktop, and mobile. The system facilitates member registration, course subscription management, and  providing a seamless experience for both gym administrators and members. This project showcases expertise in full-stack development and cross-platform integration, ensuring a unified and efficient gym management solution. <a href='#' id='see-more6' onclick='mbodyDescription(event)'>See Less</a>";
    } else {
        description.innerHTML = "Mbody-UP is an academic project designed to streamline gym management across multiple platforms: web, desktop,and...<a href='#' id='see-more6' onclick='mbodyDescription(event)'>See More</a>";
    }
}
function happyDescription(event) {
    event.preventDefault(); // Prevent the default anchor click behavior

    const description = document.getElementById('happy-description');
    const seeMoreLink = document.getElementById('see-more7');
    
    if (seeMoreLink.innerText === "See More") {
        description.innerHTML = "Happy-Life is a final study project developed during my internship, aimed at simplifying event management through a mobile application. The platform allows event organizers to efficiently manage their events, monitor ticket sales in real-time, and handle complaints from attendees. The application is built using React Native for cross-platform mobile development and integrates Firebase for real-time data synchronization. The backend is powered by Node.js, Express.js, and MongoDB, with WebSocket ensuring real-time complaint management. <a href='#' id='see-more7' onclick='happyDescription(event)'>See Less</a>";
    } else {
        description.innerHTML = "Happy-Life is a final study project developed during my internship, aimed at simplifying event management through...<a href='#' id='see-more7' onclick='happyDescription(event)'>See More</a>";
    }
}
