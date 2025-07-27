// Dark/Light Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved user preference or use system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Hamburger menu toggle
const menuToggle = document.getElementById('menuToggle');
const mainMenu = document.getElementById('mainMenu');
menuToggle.addEventListener('click', () => {
    mainMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// تشغيل صوت عند النقر على أي أيقونة
function playClickSound() {
    const clickSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3');
    clickSound.play();
}

// إضافة صوت النقر لكل العناصر القابلة للنقر
document.addEventListener('DOMContentLoaded', function() {
    const clickableElements = document.querySelectorAll('a, button, .service-card, .team-member, .gallery-item, .color-option');
    
    clickableElements.forEach(element => {
        element.addEventListener('click', function() {
            playClickSound();
        });
    });
});

// عرض شعار الموقع عند التحميل
window.addEventListener('load', function() {
    const splash = document.createElement('div');
    splash.style.position = 'fixed';
    splash.style.top = '0';
    splash.style.left = '0';
    splash.style.width = '100%';
    splash.style.height = '100%';
    splash.style.backgroundColor = 'var(--primary-color)';
    splash.style.display = 'flex';
    splash.style.flexDirection = 'column';
    splash.style.justifyContent = 'center';
    splash.style.alignItems = 'center';
    splash.style.zIndex = '9999';
    splash.style.transition = 'opacity 1s ease-out';
    
    const logo = document.createElement('div');
    logo.innerHTML = `
        <div style="font-size: 3rem; color: white; font-weight: bold; margin-bottom: 1rem;">
            <i class="fas fa-ruler-combined"></i>
        </div>
        <div style="font-size: 2rem; color: white; text-align: center;">
            الاتحاد للتصميمات<br>والاستشارات الهندسية
        </div>
    `;
    
    splash.appendChild(logo);
    document.body.appendChild(splash);
    
    // إخفاء الشعار بعد 3 ثواني
    setTimeout(function() {
        splash.style.opacity = '0';
        setTimeout(function() {
            splash.remove();
        }, 1000);
    }, 3000);
});



// إضافة أيقونة واتساب ثابتة
function addWhatsAppIcon() {
    const whatsappIcon = document.createElement('div');
    whatsappIcon.id = 'whatsapp-icon';
    whatsappIcon.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappIcon.style.position = 'fixed';
    whatsappIcon.style.bottom = '30px';
    whatsappIcon.style.left = '30px';
    whatsappIcon.style.width = '60px';
    whatsappIcon.style.height = '60px';
    whatsappIcon.style.backgroundColor = '#25D366';
    whatsappIcon.style.color = 'white';
    whatsappIcon.style.borderRadius = '50%';
    whatsappIcon.style.display = 'flex';
    whatsappIcon.style.justifyContent = 'center';
    whatsappIcon.style.alignItems = 'center';
    whatsappIcon.style.fontSize = '1.5rem';
    whatsappIcon.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.3)';
    whatsappIcon.style.cursor = 'pointer';
    whatsappIcon.style.zIndex = '9999';
    whatsappIcon.style.transition = 'all 0.3s';
    
    whatsappIcon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)';
    });
    
    whatsappIcon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.3)';
    });
    
    // فتح واتساب عند النقر
    whatsappIcon.addEventListener('click', function() {
        const phoneNumber = '201273562300'; // رقم مصري مع رمز البلد +20
        const message = 'مرحباً، أريد استشارة هندسية';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
    
    document.body.appendChild(whatsappIcon);
    
    return whatsappIcon;
}

// تهيئة النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إضافة أيقونة واتساب
    addWhatsAppIcon();
    
    // إضافة معالج النموذج
    setupContactForm();
});

// إعداد نموذج الاتصال
function setupContactForm() {
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع بيانات النموذج
            const formData = new FormData(this);
            const name = formData.get('name') || this.querySelector('#name').value;
            const email = formData.get('email') || this.querySelector('#email').value;
            const phone = formData.get('phone') || this.querySelector('#phone').value;
            const message = formData.get('message') || this.querySelector('#message').value;
            
            // إنشاء رسالة واتساب
            const whatsappMessage = createWhatsAppMessage(name, email, phone, message);
            
            // فتح واتساب مع الرسالة
            const phoneNumber = '201273562300'; // رقم مصري مع رمز البلد +20
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
            
            // إظهار رسالة تأكيد
            showSuccessMessage();
            
            // مسح النموذج
            this.reset();
        });
    }
}

// إنشاء رسالة واتساب منسقة
function createWhatsAppMessage(name, email, phone, message) {
    return `مرحباً، لدي طلب استشارة هندسية

*معلومات العميل:*
الاسم: ${name}
البريد الإلكتروني: ${email}
رقم الهاتف: ${phone}

*الرسالة:*
${message}

---
تم إرسال هذا الطلب من موقع الاتحاد للتصميمات والاستشارات الهندسية`;
}

// إظهار رسالة نجاح
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: bold;
        animation: slideIn 0.5s ease-out;
    `;
    successDiv.textContent = 'تم إرسال طلبك بنجاح! سيتم فتح واتساب الآن.';
    
    // إضافة CSS للرسوم المتحركة
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(successDiv);
    
    // إزالة الرسالة بعد 5 ثواني
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.5s ease-in';
        setTimeout(() => {
            successDiv.remove();
        }, 500);
    }, 5000);
} 