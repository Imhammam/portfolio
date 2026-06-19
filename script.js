// تأثير Scroll-Triggered Loading (Intersection Observer API)
// هذا الكود يجعل الأقسام تظهر تدريجياً ويحدث روابط الـ Navbar بكفاءة عالية.

// 1. تحديد العناصر التي سنراقبها (جميع الأقسام)
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('nav a');

// 2. إعدادات المراقب (تحديد الحواف ومتى يتم التفعيل)
const observerOptions = {
    root: null, // يستخدم الـ viewport كجذر
    rootMargin: '-20% 0px -40% 0px', // حواف مخصصة بدقة لتحديد القسم النشط الحالي أثناء التمرير
    threshold: 0 // تفعيل بمجرد دخول طرف القسم في النطاق
};

// 3. دالة المعالجة المشتركة (للأنيميشن وتحديث القائمة النشطة)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // أ) إضافة كلاس الظهور (Fade-in) للقسم عند الوصول إليه
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // ب) تحديث القائمة النشطة (Active Navbar Link) بناءً على القسم الظاهر حالياً
            const currentId = entry.target.getAttribute('id');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

// 4. تفعيل المراقب على جميع الأقسام المحددة
sections.forEach(section => {
    observer.observe(section);
});

// --- وظائف النافذة المنبثقة للشهادات (Modal Functions) ---

// دالة لفتح النافذة وعرض صورة الشهادة المحددة
function openModal(imageSrc) {
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("imgTarget");
    
    if (modal && modalImg) {
        modal.style.display = "flex";
        modalImg.src = imageSrc;
        // منع خلفية الموقع من التحرك أثناء فتح النافذة
        document.body.style.overflow = "hidden";
    }
}

// دالة لإغلاق النافذة عند الضغط
function closeModal() {
    const modal = document.getElementById("certModal");
    if (modal) {
        modal.style.display = "none";
        // إعادة التمرير الطبيعي للموقع بعد الإغلاق
        document.body.style.overflow = "auto";
    }
}

// --- وظائف حماية الكود ومنع أدوات المطورين ---

// 1. منع زر الماوس الأيمن (Context Menu) لمنع خيار Inspect
document.addEventListener('contextmenu', event => event.preventDefault());

// 2. منع اختصارات لوحة المفاتيح الخاصة بأدوات المطورين وعرض السورس
document.onkeydown = function (e) {
    // منع مفتاح F12
    if (e.keyCode === 123) {
        return false;
    }
    // منع Ctrl+Shift+I (فتح الـ Inspect)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) {
        return false;
    }
    // منع Ctrl+Shift+J (فتح الـ Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 'J'.charCodeAt(0)) {
        return false;
    }
    // منع Ctrl+Shift+C (تحديد عناصر الصفحة)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 'C'.charCodeAt(0)) {
        return false;
    }
    // منع Ctrl+U (عرض كود المصدر View Source)
    if (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) {
        return false;
    }
};