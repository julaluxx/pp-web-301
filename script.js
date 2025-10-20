// ฟิลเตอร์
const form = document.getElementById("filterForm");
const checkboxes = form.querySelectorAll("input[type=checkbox]");
const cards = document.querySelectorAll(".card");

form.addEventListener("change", () => {
    const selected = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    cards.forEach(card => {
        const tags = card.dataset.tags.split(" ");
        const match = selected.length === 0 || selected.some(s => tags.includes(s));
        card.style.display = match ? "flex" : "none";
    });
});

form.addEventListener("reset", () => {
    setTimeout(() => {
        cards.forEach(card => card.style.display = "flex");
    }, 0);
});

// ค้นหา
const searchIndex = [
    // From news_page.html
    {
        title: "ถนนทรุดหน้าโรงบาล ใกล้สวนนัน",
        description: "ฝนตกต่อเนื่องทำให้ถนนหน้าโรงพยาบาลทรุดตัว เจ้าหน้าที่ลงพื้นที่ตรวจสอบและซ่อมแซมแล้ว",
        page: "/pages/news_page.html",
        anchor: "modal1"
    },
    {
        title: "เปิดยื่นคำร้องขอทุนการศึกษาแล้ว!",
        description: "นักศึกษาที่มีผลการเรียนดีแต่ขาดแคลนทุนทรัพย์สามารถยื่นคำร้องขอทุนได้ตั้งแต่วันนี้ถึง 31 มีนาคม 2569",
        page: "/pages/news_page.html",
        anchor: "modal3"
    },
    {
        title: "ขอแสดงความเสียใจกับนักศึกษาที่ประสบอุทกภัย",
        description: "สถาบันขอส่งกำลังใจให้นักศึกษาที่ได้รับผลกระทบจากอุทกภัย พร้อมเปิดช่องทางช่วยเหลือฉุกเฉิน",
        page: "/pages/news_page.html",
        anchor: "modal4"
    },

    // From guide_page.html
    {
        title: "คู่มือนักศึกษา ปี 2568",
        description: "เริ่มต้นชีวิตนักศึกษาอย่างมั่นใจด้วยคู่มือฉบับสมบูรณ์! ยินดีต้อนรับสู่มหาวิทยาลัยสวนนัน! คู่มือนี้จะช่วยให้คุณเริ่มต้นชีวิตนักศึกษาได้อย่างราบรื่น ครอบคลุมตั้งแต่ขั้นตอนสำคัญไปจนถึงกิจกรรมเสริมสร้างประสบการณ์",
        page: "/pages/guide_page.html",
        anchor: "modal1"
    },
    {
        title: "ทำความรู้จักกับระบบหอพักและสิ่งอำนวยความสะดวกต่าง ๆ",
        description: "เพื่อความสะดวกในการพักอาศัย นักศึกษาควรทราบระบบหอพักและสิ่งอำนวยความสะดวกต่าง ๆ วิธีการจองหอพักและเลือกประเภทห้อง ข้อปฏิบัติและกฎระเบียบของหอพัก ระบบซักผ้า ห้องครัว และพื้นที่ส่วนกลาง วิธีติดต่อเจ้าหน้าที่และขอความช่วยเหลือ",
        page: "/pages/guide_page.html",
        anchor: "modal4"
    },
    {
        title: "เข้าร่วมกิจกรรมชมรมและสโมสรนักศึกษาเพื่อสร้างเครือข่าย",
        description: "เพิ่มเพื่อนและประสบการณ์ด้วยกิจกรรมเสริม การเข้าร่วมชมรมและกิจกรรมต่าง ๆ จะช่วยให้คุณสร้างเครือข่าย และเรียนรู้ทักษะใหม่ ๆ เลือกชมรมหรือสโมสรที่สนใจ เช่น ดนตรี กีฬา ศิลปะ หรือวิชาการ เข้าร่วมกิจกรรมปฐมนิเทศและเวิร์กช็อปต่าง ๆ สร้างเพื่อนใหม่และแลกเปลี่ยนประสบการณ์ เรียนรู้ทักษะการทำงานเป็นทีมและการจัดการเวลา",
        page: "/pages/guide_page.html",
        anchor: "modal5"
    },

    // From download_page.html
    {
        title: "แบบฟอร์มยื่นคำร้อง",
        description: "อยากส่งสาส์นถึงมหาลัยเหรอ? มาเลย!",
        page: "/pages/download_page.html",
        anchor: "download-form_request"
    },
    {
        title: "คู่มือ กยศ.",
        description: "คู่มือการยื่นกู้เงินจากกองทุนเพื่อการศึกษา",
        page: "/pages/download_page.html",
        anchor: "download-gysc_guide"
    },
    {
        title: "แบบฟอร์มยกเลิกวิชาเรียน",
        description: "ถอนรายวิชาไม่ทันเหรอ? ยกเลิกไปเลยสิ",
        page: "/pages/download_page.html",
        anchor: "download-course_drop_form"
    },
    {
        title: "คู่มือการขอสำเร็จการศึกษา",
        description: "จะจบแล้ว แต่ต้องยื่นเรื่องก่อนนะ",
        page: "/pages/download_page.html",
        anchor: "download-graduation_guide"
    },

    // From about_page.html
    {
        title: "วังชมพู",
        description: "เว็บไซต์วังชมพูจัดทำขึ้นเพื่อเป็นเว็บบอร์ดข่าวสารสำหรับนักศึกษา ศิษย์เก่า และบุคลากรของ มหาวิทยาลัยราชภัฏสวนสุนันทา โดยมีวัตถุประสงค์ดังนี้: 1. เป็นแหล่งรวบรวมและเผยแพร่ข้อมูลเกี่ยวกับมหาวิทยาลัยราชภัฏสวนสุนันทา",
        page: "/pages/about_page.html",
        anchor: "about-pp"
    },
    {
        title: "มหาวิทยาลัยราชภัฏสวนสุนันทา",
        description: "มหาวิทยาลัยราชภัฏสวนสุนันทา (Suan Sunandha Rajabhat University; SSRU) ตั้งอยู่ในเขตดุสิต กรุงเทพมหานคร ก่อตั้งเมื่อปี พ.ศ. 2480 ในชื่อโรงเรียนสวนสุนันทาวิทยาลัย และได้รับการยกฐานะเป็นมหาวิทยาลัยในปี พ.ศ. 2547 ตามพระราชบัญญัติมหาวิทยาลัยราชภัฏ พ.ศ. 2547 คำขวัญของมหาวิทยาลัยคือ “ผู้นำการสร้างมืออาชีพ” มุ่งเน้นการผลิตบัณฑิตที่มีคุณภาพ ด้วยองค์ความรู้ที่เป็นเลิศ และส่งเสริมการเรียนรู้ในระดับสูงเพื่อรับผิดชอบต่ออนาคตของสังคมและโลก ปัจจุบันเปิดสอนหลักสูตรปริญญาตรี โท และเอก ในหลากหลายคณะ เช่น คณะครุศาสตร์ คณะมนุษยศาสตร์และสังคมศาสตร์ และคณะวิทยาศาสตร์และเทคโนโลยี",
        page: "/pages/about_page.html",
        anchor: "about-university"
    },
    {
        title: "วังสวนสุนันทา",
        description: "วังสวนสุนันทาเป็นส่วนหนึ่งของพระราชวังดุสิต สร้างขึ้นในสมัยพระบาทสมเด็จพระจุลจอมเกล้าเจ้าอยู่หัว (รัชกาลที่ 5) เพื่อเป็นสถานที่พักผ่อนพระอิริยาบถ ชื่อ “สวนสุนันทา” มาจากพระนามของ สมเด็จพระนางเจ้าสุนันทากุมารีรัตน์ และ “สุนันทาอุทยาน” ซึ่งหมายถึงสวนของพระอินทร์ในสวรรค์ชั้นดาวดึงส์ ในสมัยรัชกาลที่ 6 มีการก่อสร้างพระตำหนักและตึกเพิ่มเติม หลังการเปลี่ยนแปลงการปกครอง พ.ศ. 2475 พื้นที่นี้ถูกทอดทิ้ง จนในสมัยรัชกาลที่ 8 ได้มอบให้กระทรวงศึกษาธิการจัดตั้งสถานศึกษา ซึ่งเป็นจุดเริ่มต้นของมหาวิทยาลัยราชภัฏสวนสุนันทาในปัจจุบัน",
        page: "/pages/about_page.html",
        anchor: "about-palace"
    },

    // From index.html
    {
        title: "กิจกรรมต้อนรับนักศึกษาใหม่",
        description: "กิจกรรมต้อนรับนักศึกษาใหม่",
        page: "/index.html",
        anchor: "my_modal_1"
    },
    {
        title: "โครงการอบรมเชิงปฏิบัติการ",
        description: "โครงการอบรมเชิงปฏิบัติการ “การพัฒนาทักษะอาชีพในยุคดิจิทัล”",
        page: "/index.html",
        anchor: "my_modal_2"
    },
    {
        title: "นักศึกษาไปดูงานต่างประเทศ",
        description: "นักศึกษาไปดูงานต่างประเทศ โครงการ “ไปดูงานต่างประเทศ” เปิดโอกาสให้นักศึกษาเรียนรู้จากของจริง",
        page: "/index.html",
        anchor: "my_modal_3"
    },

    // From contact_page.html
    {
        title: "กองพัฒนานักศึกษา",
        description: "ติดต่อกองพัฒนานักศึกษา",
        page: "/pages/contact_page.html",
        anchor: "contact-student_dev"
    },
    {
        title: "ฝ่ายทะเบียนและประเมินผล",
        description: "ติดต่อฝ่ายทะเบียนและประเมินผล",
        page: "/pages/contact_page.html",
        anchor: "contact-registry"
    },
    {
        title: "ฝ่ายผลิตอาหารและเครื่องดื่ม",
        description: "ติดต่อฝ่ายผลิตอาหารและเครื่องดื่ม",
        page: "/pages/contact_page.html",
        anchor: "contact-food_beverage"
    },
    {
        title: "ฝ่ายกิจการนักศึกษา",
        description: "ติดต่อฝ่ายกิจการนักศึกษา",
        page: "/pages/contact_page.html",
        anchor: "contact-student_affairs"
    }
];

// Function to perform the search and display results in a modal
function performSearch(query) {
    const lowerQuery = query.toLowerCase();
    const results = searchIndex.filter(item =>
        item.title.toLowerCase().includes(lowerQuery) || item.description.toLowerCase().includes(lowerQuery)
    );

    // Create or reuse search modal
    let modal = document.getElementById('searchModal');
    if (!modal) {
        modal = document.createElement('dialog');
        modal.id = 'searchModal';
        modal.className = 'modal modal-middle';
        document.body.appendChild(modal);
    }

    // Build modal content
    let content = `
    <div class="modal-box">
      <h3 class="font-bold text-lg">ผลการค้นหาสำหรับ "${query}"</h3>
      <p class="py-4">พบ ${results.length} รายการ</p>
  `;
    if (results.length === 0) {
        content += '<p>ไม่พบผลลัพธ์ที่ตรงกัน</p>';
    } else {
        content += '<ul class="menu bg-base-200 w-full rounded-box">';
        results.forEach(result => {
            const link = result.anchor ? `${result.page}#${result.anchor}` : result.page;
            content += `
        <li>
          <a href="${link}">
            <div>
              <h4 class="font-bold">${result.title}</h4>
              <p>${result.description.substring(0, 100)}...</p>
            </div>
          </a>
        </li>
      `;
        });
        content += '</ul>';
    }
    content += `
      <div class="modal-action">
        <button class="btn" onclick="document.getElementById('searchModal').close()">ปิด</button>
      </div>
    </div>
  `;

    modal.innerHTML = content;
    modal.showModal();
}

// Event listener for page load and hash-based modal opening
document.addEventListener('DOMContentLoaded', () => {
    // Auto-open modal if hash is present in URL
    if (location.hash) {
        const modalId = location.hash.substring(1);
        const modal = document.getElementById(modalId);
        if (modal && modal.tagName === 'DIALOG') {
            modal.showModal();
        } else if (modal) {
            // Scroll to section if not a modal
            modal.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Search functionality
    const searchBtn = document.querySelector('.btn.btn-secondary'); // Search button
    const searchInput = document.querySelector('.input'); // Search input

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query);
            }
        });

        // Optional: Search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(searchInput.value.trim());
            }
        });
    }
});