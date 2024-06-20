// الوظيفة لفتح وإغلاق القائمة الجانبية
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
}

// عرض التفاصيل الإضافية للعقار
function showAdditionalDetails(id) {
  const additionalDetailsRow = document.getElementById(`additional-details-${id}`);
  additionalDetailsRow.classList.toggle('hidden');
  
}

// عرض النموذج عند النقر على زر "متابعة"
function showRequestForm(event) {
  const form = document.getElementById('request-form');
  form.style.display = 'block';
  // منع السلوك الافتراضي للنموذج (إعادة تحميل الصفحة)
  event.preventDefault();
}


// إرسال الطلب
function submitRequest(event) {
    event.preventDefault(); // منع السلوك الافتراضي للنموذج (إعادة تحميل الصفحة)
    
    const fullname = document.getElementById('fullname').value.trim();
    const nationalId = document.getElementById('national-id').value.trim();
    const birthdate = document.getElementById('birthdate').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const email = document.getElementById('email').value.trim();
    const propertySelected = document.querySelector('input[name="property"]:checked');
    const resultMessage = document.getElementById('result-message');



    if (fullname === "" || nationalId === "" || birthdate === "" || mobile === "" || email === "") {
        resultMessage.textContent = 'يرجى ملء جميع الحقول.';
        return;
    }

    const arabicRegex = /^[\u0621-\u064A\s]+$/; // تحقق من الحروف العربية فقط
    const nationalIdRegex = /^(01|02|03|04|05|06|07|08|09|10|11|12|13|14)[0-9]{9}$/; // يبدأ بـ 01 أو 02 أو 03 أو 04 أو 05 أو 06 ويكون بطول 11 رقم
    const mobileRegex = /^09[0-9]{8}$/; // يبدأ بـ 09 ويكون بطول 10 رقم
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // صيغة بريد إلكتروني صحيحة

    if (!arabicRegex.test(fullname)) {
        resultMessage.textContent = 'يرجى إدخال الاسم بالحروف العربية فقط.';
        return;
    }

    if (!nationalIdRegex.test(nationalId)) {
        resultMessage.textContent = 'يرجى إدخال الرقم الوطني بشكل صحيح.';
        return;
    }

    if (!mobileRegex.test(mobile)) {
        resultMessage.textContent = 'يرجى إدخال رقم الموبايل بشكل صحيح.';
        return;
    }

    if (!emailRegex.test(email)) {
        resultMessage.textContent = 'يرجى إدخال بريد إلكتروني صحيح.';
        return;
    }

    resultMessage.textContent = 'تم ارسال الطلب بنجاح.';
}





// الوظيفة لاستيراد البيانات من ملف JSON
function importDataFromJSON() {
  fetch('data/Properties.json')
      .then(response => response.json())
      .then(data => {
          // قم بإنشاء الصفوف والخلايا وأضف البيانات
          const table = document.getElementById('properties-table');
          data.forEach(property => {
              const row = table.insertRow();
              
              // إضافة خلية للاختيار
              const selectCell = row.insertCell();
              const selectCheckbox = document.createElement('input');
              selectCheckbox.type = 'checkbox';
              selectCheckbox.addEventListener('change', function() {

              });
              selectCell.appendChild(selectCheckbox);
              selectCheckbox.id = `select-checkbox-${property.id}`; // تعيين معرف فريد لكل خانة اختيار

              // إضافة خلية لإظهار التفاصيل
              const detailsCell = row.insertCell();
              const detailsLink = document.createElement('a');
              detailsLink.textContent = 'تفاصيل';
              detailsLink.href = '#';
              detailsLink.addEventListener('click', () => showAdditionalDetails(property.id));
              detailsCell.appendChild(detailsLink);

              // إضافة خلية للإيجار الشهري
              const rentCell = row.insertCell();
              rentCell.textContent = property.monthlyRent;

              // إضافة خلية للتفاصيل
              const detailsTextCell = row.insertCell();
              detailsTextCell.textContent = property.details;

              // إضافة خلية للمدينة
              const cityCell = row.insertCell();
              cityCell.textContent = property.city;

              // إنشاء صف إضافي لعرض التفاصيل الإضافية
              const additionalDetailsRow = table.insertRow();
              additionalDetailsRow.id = `additional-details-${property.id}`;
              additionalDetailsRow.classList.add('hidden'); // تكون مخفية في البداية    
              const additionalDetailsCell = additionalDetailsRow.insertCell();
              additionalDetailsCell.setAttribute('colspan', '5'); // لتغطية العمود الكامل
              additionalDetailsCell.textContent = property.additionalDetails;
          });
      })
      .catch(error => console.error('حدث خطأ أثناء تحميل الملف:', error));
}

// استدعاء وظيفة استيراد البيانات عند تحميل الصفحة
window.onload = importDataFromJSON;
