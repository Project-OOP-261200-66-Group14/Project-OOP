document.getElementById("enter-image").addEventListener("click", function () {
  // อ่านข้อมูลจาก input fields
  var player = document.getElementById("time-to-plan").value;
  var currency = document.getElementById("currency").value;
  var row = document.getElementById("row").value;
  var interestRate = document.getElementById("interest-rate").value;
  var budget = document.getElementById("budget").value;
  var planningTime = document.getElementById("time-to-plan").value;

  // จัดเก็บข้อมูลลงใน Local Storage
  localStorage.setItem("player", player);
  localStorage.setItem("currency", currency);
  localStorage.setItem("row", row);
  localStorage.setItem("interestRate", interestRate);
  localStorage.setItem("budget", budget);
  localStorage.setItem("planningTime", planningTime);

  // ย้ายไปยังหน้า start
  window.location.href = "start.html"; // Adjust the path to your start page as necessary
});
